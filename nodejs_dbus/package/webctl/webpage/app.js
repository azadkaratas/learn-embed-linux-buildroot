const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
var DBus = require('dbus');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));
// API endpoint to get current configuration
app.get('/api/config', (req, res) => {
    fs.readFile('/usr/html/config.json', 'utf8', (configErr, configData) => {
        if (configErr) {
            console.error("Error reading config file!", configErr);
            return res.status(500).json({ message: 'Error reading config file' });
        }

        // Read /etc/network/interfaces for network configuration
        fs.readFile('/etc/network/interfaces', 'utf8', (networkErr, networkData) => {
            if (networkErr) {
                console.error("Error reading interfaces file!", networkErr);
                return res.status(500).json({ message: 'Error reading interfaces file' });
            }

            // Parse IP address from network interfaces data
            const ipMatch = networkData.match(/address\s+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
            const netmaskMatch = networkData.match(/netmask\s+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
            const networkMatch = networkData.match(/network\s+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
            const broadcastMatch = networkData.match(/broadcast\s+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);
            const gatewayMatch = networkData.match(/gateway\s+([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/);

            const ipAddress = ipMatch ? ipMatch[1] : '';
            const netmask = netmaskMatch ? netmaskMatch[1] : '';
            const network = networkMatch ? networkMatch[1] : '';
            const broadcast = broadcastMatch ? broadcastMatch[1] : '';
            const gateway = gatewayMatch ? gatewayMatch[1] : '';

            // Combine config and network data into a single JSON response
            const config = JSON.parse(configData);
            res.json({
                deviceName: config.deviceName,
                port: config.port,
                status: config.status,
                ipAddress: ipAddress,
                netmask: netmask,
                network: network,
                broadcast: broadcast,
                gateway: gateway
            });
        });
    });
});

app.post('/api/config', (req, res) => {
    const { deviceName, ipAddress, port, status, netmask, network, broadcast, gateway } = req.body;

    // Define paths
    const configPath = '/usr/html/config.json';
    const networkInterfacesPath = '/etc/network/interfaces';

    exec(`ifconfig wlan0 ${ipAddress}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error changing IP address: ${error.message}`);
            return res.status(500).json({ message: 'Error changing IP address' });
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return res.status(500).json({ message: 'Command error', details: stderr });
        }

        // Prepare config.json data
        const newConfig = {
            deviceName: deviceName,
            port: port,
            status: status
        };

        // Write to config.json
        fs.writeFile(configPath, JSON.stringify(newConfig, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error writing config.json:", err);
                return res.status(500).json({ message: 'Error writing config file' });
            }

            // Prepare network interface configuration
            const networkConfig = `
auto lo
iface lo inet loopback
auto wlan0
iface wlan0 inet static
    address ${ipAddress}
    netmask ${netmask}
    network ${network}
    broadcast ${broadcast}
    gateway ${gateway}
    pre-up wpa_supplicant -B -Dnl80211 -iwlan0 -c/etc/wpa_supplicant.conf
    post-down killall -q wpa_supplicant
    wait-delay 15
iface default inet static
            `;

            // Write to /etc/network/interfaces
            fs.writeFile(networkInterfacesPath, networkConfig, 'utf8', (err) => {
                if (err) {
                    console.error("Error writing network interfaces file:", err);
                    return res.status(500).json({ message: 'Error updating network interfaces file' });
                }
                console.log("Configuration and network interfaces updated successfully.");
                res.json({ message: 'Configuration updated successfully' });
            });
        });
    });
});


var bus = DBus.getBus('system');
const serviceName = "com.embedlinux.messenger";
const objectPath = "/com/embedlinux/messenger";
const interfaceName = "com.embedlinux.web";

app.post('/api/calculate', (req, res) => {
    const value1 = req.body.value1;
    const value2 = req.body.value2;

    bus.getInterface(serviceName, objectPath, interfaceName, (err, iface) => {
        if (err) {
            return res.status(500).send({ error: "Error getting interface:", err });
        }
    
        if (!iface.add_numbers) {
            return res.status(500).send({ error: "Method add_numbers not found on interface:", err });
        }
    
        iface.add_numbers(value1, value2, (err, result) => {
        if (err) {
          return res.status(500).send({ error: "Error calling method:", err });
        }
    
        console.log("Result from server:", result);
        res.send({ result });
        });
    });
});

app.post('/api/restart', (req, res) => {
    exec('reboot -f', (error, stdout, stderr) => {
        if (error) {
            console.log(`Error restarting device: ${error.message}`);
            return res.json({ message: 'Error restarting device' });
        }
        if (stderr) {
            console.log(`Command stderr: ${stderr}`);
            return res.json({ message: 'Command error' });
        }
    });
});

app.get('/api/device-status', (req, res) => {
    exec("ifconfig wlan0 | grep 'inet ' | awk '{print $2}'", (error, stdout) => {
        if (error) {
            console.log(`Error fetching network info: ${error.message}`);
            return res.json({ message: 'Error fetching network info' });
        }

        const ipAddress = stdout.trim().replace('addr:', '');

        exec("awk '{print $1}' /proc/uptime", (error, stdout) => {
            if (error) {
                console.error(`Error fetching uptime: ${error.message}`);
                return res.json({ message: 'Error fetching uptime' });
            }

            const uptime = `${Math.floor(parseInt(stdout.trim()) / 60)}`;

            exec("top -bn1 | grep 'CPU:' | awk '{print $2}' | head -n 1 | sed 's/%//'", (error, stdout) => {
                const cpuUsage = stdout.trim();

                exec("free -m | grep Mem | awk '{print ($3/$2) * 100.0}'", (error, stdout) => {
                    const memoryUsage = `${parseFloat(stdout.trim()).toFixed(2)}%`;

                    exec('df -h / | tail -n 1', (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error fetching disk usage: ${error.message}`);
                            return res.status(500).json({ message: 'Error fetching disk usage' });
                        }
                        if (stderr) {
                            console.error(`Command stderr: ${stderr}`);
                            return res.status(500).json({ message: 'Command error', details: stderr });
                        }

                        const outputLines = stdout.trim().split(/\s+/);
                        const diskUsagePercentage = outputLines[4].replace('%', '');
                        const diskFreeSpace = outputLines[2];
                        
                        res.json({
                            ipAddress,
                            uptime,
                            cpuUsage,
                            memoryUsage,
                            diskUsagePercentage,
                            diskFreeSpace
                        });
                    });
                });
            });
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
