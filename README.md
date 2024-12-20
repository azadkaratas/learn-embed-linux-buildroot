# Learning Embedded Linux with Buildroot
This repository serves as a learning platform for understanding and experimenting with embedded Linux using Buildroot. The primary focus of this repository is to explore the process of building embedded Linux systems from scratch through simple yet practical examples. It includes sample projects configured for Raspberry Pi Zero W and Raspberry Pi 3B+ boards. However, the structure of the projects allows for easy modification and adaptation to other embedded boards, offering flexibility for diverse development needs.

Buildroot is an excellent tool for generating minimal and optimized Linux distributions for embedded systems. Through the projects in this repository, I aim to demonstrate how Buildroot can be configured for specific hardware, including board-specific settings, kernel configurations, package integration, and custom scripts, all while exploring the intricacies of the embedded Linux ecosystem.

Detailed project explanations can be found under related project folder.

### How to Build Projects:
Simply execute below commands according to your board:
```
cd buildroot                                         --- Change directory to buildroot
make BR2_EXTERNAL=../headless_wifi_setup menuconfig  --- Select the desired project, enter menuconfig and quit to press ESC
cd ..                                                --- Change directory to top dir
make headless_wifi_setup_rpi0w                       --- Build the project
```

## Projects
### [Headless WiFi Setup](/headless_wifi_setup/README.md)

In this simple and first project, buildroot is configured to work with static address WiFi mode and SSH support. Necessary files needs to be changed are under board/ folder. Copying these files to the related places is written in post build script.

With interfaces file, we set our device a static IP. Make sure address is unique in your network domain and other parameters are correct. Do not forget to set your WiFi credentials in wpa_supplicant.conf.

### [Background Logger](/background_logger/README.md)

In this example, a simple daemon is being started automatically after the boot and runs in the background. It only logs the counter value periodically and sleeps 1 second.

With this, we will learn how to add our own process and how we make it start automatically. Again, package has been added as external out-of-tree structure. WiFi and SSH settings are the same as previous example and still exists in this example as well. Post build process has one more operation in this example which is copying the S99periodiclogger file under /etc/init.d/ folder.

### [DBUS Example](/dbus_example/README.md)

In this example, two simple processes are being communicating over system bus with DBUS. This example shows how to use system bus by adding new policy and shows what changes are required to communicate over session bus. Server side waits for a message from client and when received a message it both prints and logs. 

### [Web Server Example with Nginx](/webserver_nginx/README.md)

In this example, a simple web server is created using Nginx with Buildroot. First, the Buildroot configuration is opened, the Nginx package is selected, and the system is built with Nginx. Next, the Nginx configuration file (nginx.conf) is edited, a /www directory is created for the web content, and the content is placed there. Once Nginx is started, the server becomes accessible via the device's IP address.

### [Nginx Web Server with NodeJs](/nginx_nodejs/README.md)

In this example, NodeJs support has been added to nginx web server. The script S99nodejs is starting the NodeJs. Nginx has been configured to serve as reverse proxy and will forward the HTTP requests to NodeJs.  You will see a basic device management page and for further projects, we will be using this web template.

### [Web Server with NodeJs and DBUS support](/nodejs_dbus/README.md)

In this example, we will connect web interface with a C program and communicate over system DBUS. A simple calculation tab has been added to the web GUI. In this tab, two values are sent over DBUS to the messenger process, where they are summed, and the result is returned. WebCtl then displays the result.

### [Headless WiFi and Ethernet Setup](/headless_wifi_eth_setup/README.md)

This project focuses on setting up a Raspberry Pi (or other similar embedded boards) in a "headless" configuration, meaning it can be operated without a monitor or keyboard attached. The main goal of the project is to establish a wireless network (WiFi) and Ethernet connections with static IP addresses and enable secure remote access via SSH.

### [WiFi Access Point](/access_point/README.md)

In this example, our device will become a WiFi access point and we will reach out to device configuration web page with a static IP address. Again, Nginx and NodeJs will be used for web page. DHCP is used for IP assignment to the connected devices.

---
All suggestions, bug reports and contributions are welcomed.
