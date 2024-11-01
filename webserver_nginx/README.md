# Web Server Example with Nginx Library

In this example, a simple web server is created using Nginx with Buildroot. Nginx process is being starts automatically (check output/target/etc/init.d/S50nginx file). Our webpage content is under webserver_nginx/webpage folder. This folder is being copied under /usr/html/ folder where nginx uses for web server during post build. Once Nginx is started, the server becomes accessible via the device's IP address.

### How to Run:
* Simply open a web browser with the device's IP address.
* You can stop and start nginx manually:

```
killall nginx
nginx
```

### SSH Connection:
Once the board is powered up and connected to the network, you can use SSH to log in remotely:
```
ssh root@192.168.222.222
password: root
```

### Supported boards:
- [x] Raspberry Pi Zero W
- [x] Raspberry Pi 3B+
