# DBUS Example

In this example, we will create two processes for communicating each other over **system bus** with DBUS. As "root" user, to be able to send data over system bus, we need to add a new DBUS policy. Policy file can be found in [new_dbus_policy.conf](/dbus_example/new_dbus_policy.conf). Copying process is being done in post build script.  

* The first process is dbusserver which is being started right after the boot and starts to listen session bus. When message received, it both prints and logs.
* The second process, client process, should be run manually and sends the message to server over the created DBUS session.

### How to Run:
* The server process will start automatically and listens the system bus. Check the /tmp folder and /tmp/common-dbus-session-addr.txt file.
* We need to start client application manually. The application is under /usr/bin/ folder. To check the incoming messages at the server side, we can see the log results which dbusserver prints them in /var/log/messages log. Or we can start a new dbusserver and dbusclient processes in two different terminals and observe the prints there.

```
/usr/bin/dbusclient Hello server!
cat /var/log/messages
```

### How to Configure DBUS for Session Bus:
Session bus does not need a policy to be able to run this example. But we need to create a session first and run our applications. To do this, we need to change our server.c and client.c code.

```
    conn = dbus_bus_get(DBUS_BUS_SYSTEM, &err);  // Change this
    conn = dbus_bus_get(DBUS_BUS_SESSION, &err); // to this
```

* The server process will not start automatically since it won't find a session bus. The daemon can be configured to create the dbus session at the start and save the dbus session id to /tmp/common-dbus-session-addr.txt. But for the simplicity, we will create the session run-time manually. Below command will start a session and save it to /tmp/common-dbus-session-addr.txt. After this, we can run our server application.

```
dbus-daemon --session --fork --print-address 1 > /tmp/common-dbus-session-addr
export DBUS_SESSION_BUS_ADDRESS=$(cat /tmp/common-dbus-session-addr)
/usr/bin/dbusserver
```

* We need to start client application manually with another terminal. The application is under /usr/bin/ folder. Before starting the client, we should set DBUS_SESSION_BUS_ADDRESS variable to be able to communicate with the server process. This bus address value must be the same with the server side. Otherwise communication will not be possible.

```
export DBUS_SESSION_BUS_ADDRESS=$(cat /tmp/common-dbus-session-addr)
/usr/bin/dbusclient Hello server!
```

To check the incoming messages at the server side, we can see the log results which dbusserver prints them in /var/log/messages log. Or we can observe the prints in terminals.

### SSH Connection:
Once the board is powered up and connected to the network, you can use SSH to log in remotely:
```
ssh root@192.168.222.222
password: root
```

### Supported boards:
- [x] Raspberry Pi Zero W
- [ ] Raspberry Pi 3B+
