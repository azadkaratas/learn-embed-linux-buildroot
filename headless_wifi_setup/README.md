# Headless WiFi Setup

This project focuses on setting up a Raspberry Pi (or other similar embedded boards) in a "headless" configuration, meaning it can be operated without a monitor or keyboard attached. The main goal of the project is to establish a wireless network connection (WiFi) with a static IP address and enable secure remote access via SSH.

The project utilizes Buildroot to create a custom Linux image that is preconfigured to connect to a WiFi network using the credentials provided by the user. A static IP address is assigned to the board, making it easy to locate on a local network, which is especially useful in headless setups. Additionally, SSH is enabled by default, allowing the user to remotely connect to and manage the board from another device.

In this simple and first project, buildroot is configured to work with static address WiFi mode and SSH support. Necessary files need to be changed are under board/ folder. Copying these files to the related places is written in post-build.sh file.

The files that need to be modified for this setup are stored in the `board/` folder. After making the necessary changes, these files will be copied to the appropriate locations during the build process via the `post-build.sh` script.

Set your WiFi credentials in wpa_supplicant.conf.
### Configuration Files:
The files that need to be modified for this setup are stored in the `board/` folder. After making the necessary changes, these files will be copied to the appropriate locations during the build process via the `post-build.sh` script.

1. **`interfaces`**: This file configures the network interface, specifically assigning a static IP address to the board’s wireless interface (typically `wlan0`). Ensure that the static IP address does not conflict with other devices on your network and that it falls within the correct range for your local subnet.

2. **`wpa_supplicant.conf`**: This file holds the WiFi credentials for your wireless network, including the SSID and password. It ensures the board can automatically connect to the designated WiFi network upon boot.

3. **`post-build.sh`**: This script handles the copying of the modified configuration files to their appropriate locations within the buildroot filesystem. It also ensures that the necessary services, like SSH, are enabled during boot.

### SSH Connection:
Once the board is powered up and connected to the network, you can use SSH to log in remotely:
```
ssh root@192.168.222.222    or whatever is set in wpa_supplicant.conf file
password: root
```

### Supported boards:
- [x] Raspberry Pi Zero W
- [x] Raspberry Pi 3B+
