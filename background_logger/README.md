# Background Logger

This project aims to teach how to create a basic process that runs after boot. To do this, S99periodiclogger file has been added and this file is being copied under /etc/init.d/ folder. After boot, init.d daemon starts the processes located in that folder in an alphabetical order. To run this daemon latest, it is named S99**. The code itself is easy and just logs the counter to the /var/log/messages file.

### How to Run:
* The periodiclogger application will start automatically. You can check by writing ps to the terminal.
* We need to start client application manually. The application is under /usr/bin/ folder. To check the incoming messages at the server side, we can see the log results which dbusserver prints them in /var/log/messages log. Or we can start a new dbusserver and dbusclient processes in two different terminals and observe the prints there.

```
ps                          - To see if the periodiclogger application runs or not
tail -f /var/log/messages   - To check the logs
```

### SSH Connection:
Once the board is powered up and connected to the network, you can use SSH to log in remotely:
```
ssh root@192.168.222.222
password: root
```

### Supported boards:
- [x] Raspberry Pi Zero W
- [ ] Raspberry Pi 3B+
