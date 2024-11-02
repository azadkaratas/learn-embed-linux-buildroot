# Headless WiFi and Ethernet Setup

This project focuses on setting up a Raspberry Pi (or other similar embedded boards) in a "headless" configuration, meaning it can be operated without a monitor or keyboard attached. The main goal of the project is to establish a wireless network (WiFi) and Ethernet connections with static IP addresses and enable secure remote access via SSH.

Set your WiFi credentials in wpa_supplicant.conf.
### Configuration Files:
The files that need to be modified for this setup are stored in the `board/` folder. After making the necessary changes, these files will be copied to the appropriate locations during the build process via the `post-build.sh` script.

1. **`interfaces`**: This file configures the network interface, specifically assigning a static IP address to the board’s wireless and ethernet interfaces. Ensure that the static IP address does not conflict with other devices on your network and that it falls within the correct range for your local subnet.

2. **`wpa_supplicant.conf`**: This file holds the WiFi credentials for your wireless network, including the SSID and password. It ensures the board can automatically connect to the designated WiFi network upon boot.

3. **`post-build.sh`**: This script handles the copying of the modified configuration files to their appropriate locations within the buildroot filesystem. It also ensures that the necessary services, like SSH, are enabled during boot.

Since your computer will now have 2 different way of accessing Rpi device, we need to set a route.
```
sudo route add -net 192.168.5.0 netmask 255.255.255.0 gw 192.168.178.200
```

If your PC has only ethernet connection, then ping operation will simply work without any routing.

Don't forget to assign IP address to your ethernet NIC:
```
sudo ip addr add 192.168.5.55/24 dev enp46s0
```

### SSH Connection:
Once the board is powered up and connected to the network, you can use SSH to log in remotely:
```
ssh root@192.168.222.222    or whatever is set in wpa_supplicant.conf file
password: root
```

### Supported boards:
- [ ] Raspberry Pi Zero W
- [x] Raspberry Pi 3B+
