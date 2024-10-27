document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.getElementById('content-area');

    let intervalID; // To keep ID of the updateDeviceStatus interval

    // CPU Usage chart data 
    let cpuUsageData = [];
    let cpuusagelabels = [];
    let cpuUsageChart;

    document.getElementById('configLink').addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(intervalID);
        loadConfigPage();
    });

    document.getElementById('statusLink').addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(intervalID);
        loadStatusPage();
    });
    
    document.getElementById('calcLink').addEventListener('click', function (event) {
        event.preventDefault();
        clearInterval(intervalID);
        loadCalculationPage();
    });

    loadConfigPage();
    function loadConfigPage() {
        contentArea.innerHTML = `
            <h2>Device Configuration</h2>
            <form id="configForm" class="mt-4">
                <div class="form-group">
                    <label for="deviceName">Device Name:</label>
                    <input type="text" id="deviceName" name="deviceName" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="ipAddress">IP Address:</label>
                    <input type="text" id="ipAddress" name="ipAddress" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="netmask">Netmask:</label>
                    <input type="text" id="netmask" name="netmask" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="network">Network:</label>
                    <input type="text" id="network" name="network" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="broadcast">Broadcast:</label>
                    <input type="text" id="broadcast" name="broadcast" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="gateway">Gateway:</label>
                    <input type="text" id="gateway" name="gateway" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="port">Port:</label>
                    <input type="number" id="port" name="port" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="status">Status:</label>
                    <select id="status" name="status" class="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Save Configuration</button>
                <button id="restartButton" type="button" class="btn btn-primary mt-4">Restart Device</button>
            </form>
            <div id="message" class="message mt-3"></div>
        `;
    
        // Fetch the initial configuration and populate fields
        fetch('/api/config')
            .then(response => response.json())
            .then(data => {
                document.getElementById('deviceName').value = data.deviceName;
                document.getElementById('ipAddress').value = data.ipAddress;
                document.getElementById('netmask').value = data.netmask;
                document.getElementById('network').value = data.network;
                document.getElementById('broadcast').value = data.broadcast;
                document.getElementById('gateway').value = data.gateway;
                document.getElementById('port').value = data.port;
                document.getElementById('status').value = data.status;
            })
            .catch(error => console.error('Error fetching configuration:', error));
    
        // Submit form handler
        document.getElementById('configForm').addEventListener('submit', function (event) {
            event.preventDefault();
    
            const configData = {
                deviceName: document.getElementById('deviceName').value,
                ipAddress: document.getElementById('ipAddress').value,
                netmask: document.getElementById('netmask').value,
                network: document.getElementById('network').value,
                broadcast: document.getElementById('broadcast').value,
                gateway: document.getElementById('gateway').value,
                port: document.getElementById('port').value,
                status: document.getElementById('status').value
            };
    
            fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(configData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('message').textContent = data.message;
                setTimeout(() => { document.getElementById('message').textContent = ''; }, 3000);
            })
            .catch(error => console.error('Error updating configuration:', error));
        });
    
        // Restart button click handler with confirmation
        document.getElementById('restartButton').addEventListener('click', function () {
            if (confirm('Are you sure you want to restart the device?')) {
                fetch('/api/restart', { method: 'POST' })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('message').textContent = 'Device restarting...';
                        setTimeout(() => { document.getElementById('message').textContent = ''; }, 3000);
                    })
                    .catch(error => console.error('Error restarting device:', error));
            }
        });
    }
    
    function loadCalculationPage() {
        contentArea.innerHTML = `
            <h2>Calculation Page</h2>
            <form id="calcForm" class="mt-4">
                <div class="form-group">
                    <label for="value1">Value 1:</label>
                    <input type="number" class="form-control" id="value1" name="value1">
                </div>
                <div class="form-group mt-3">
                    <label for="value2">Value 2:</label>
                    <input type="number" class="form-control" id="value2" name="value2">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Calculate</button>
            </form>
            <div id="calcResult" class="message mt-3"></div>
        `;

        document.getElementById('calcForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const value1 = parseFloat(document.getElementById('value1').value);
            const value2 = parseFloat(document.getElementById('value2').value);

            fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value1, value2 })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('calcResult').textContent = `Result: ${data.result}`;
            })
            .catch(error => console.error('Error performing calculation:', error));
        });
    }
    
    function loadStatusPage() {
        contentArea.innerHTML = `
            <h2>Device Status</h2>
            <div id="networkInfo" class="info-box">
                <div class="network-title">Network Information</div>
                <pre id="networkData">Loading network data...</pre>
            </div>
            <div id="statsInfo" class="info-box">
                <div class="network-title">Statistics</div>
                <pre id="statsData">Loading statistics...</pre>
                <div class="chart-container">
                    <canvas id="cpuUsageChart"></canvas>
                </div>
            </div>
        `;

        const ctx = document.getElementById('cpuUsageChart').getContext('2d');
    
        cpuUsageChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: cpuusagelabels,
                datasets: [{
                    label: 'CPU Usage (%)',
                    data: cpuUsageData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        function updateDeviceStatus() {
            fetch('/api/device-status')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('networkData').textContent = 
                        `IP Address: ${data.ipAddress}`;
                    document.getElementById('statsData').textContent = 
                        `Uptime: ${data.uptime} minutes\nMemory Usage: ${data.memoryUsage}\nDisk Usage: ${data.diskFreeSpace} (${data.diskUsagePercentage}%)\nCPU Usage: ${data.cpuUsage}%`;

                    const cpuUsage = data.cpuUsage;
                    cpuUsageData.push(cpuUsage);
                    cpuusagelabels.push(new Date().toLocaleTimeString());

                    if (cpuUsageData.length > 50) {
                        cpuUsageData.shift();
                        cpuusagelabels.shift();
                    }

                    cpuUsageChart.update();
                })
                .catch(error => console.error('Error fetching device status:', error));
        }

        updateDeviceStatus();
        intervalID = setInterval(updateDeviceStatus, 1000);
    }
});
