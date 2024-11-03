# WiFi Access Point

In this example, our device will become a WiFi access point and we will reach out to device configuration web page with a static IP address. Again, Nginx and NodeJs will be used for web page.

In dhcpd.conf file, it configures the ISC DHCP server to provide IP addresses dynamically within the range 192.168.2.10 to 192.168.2.50 on the 192.168.2.0/24 subnet, with specified default settings for lease times, DNS servers, and a gateway router.

In hostapd.conf file, there are configurations of the access point settings.

After connecting to the device wifi access point, 192.168.2.1 address will give us our configuration web page built by Nginx and NodeJs.

### Supported boards:
- [x] Raspberry Pi Zero W
- [x] Raspberry Pi 3B+
