#include <stdio.h>
#include <stdlib.h>
#include <dbus/dbus.h>

void send_message(char* message) {
    DBusMessage* msg;
    DBusMessageIter args;
    DBusConnection* conn;
    DBusError err;
    DBusPendingCall* pending;

    dbus_error_init(&err);

    // Connect to DBUS over system session
    conn = dbus_bus_get(DBUS_BUS_SYSTEM, &err);
    if (dbus_error_is_set(&err)) {
        fprintf(stderr, "Connection Error (%s)\n", err.message);
        dbus_error_free(&err);
    }
    if (conn == NULL) {
        exit(1);
    }

    msg = dbus_message_new_method_call("test.server",
                                       "/test/server",
                                       "test.method.Type",
                                       "Method");

    if (msg == NULL) {
        fprintf(stderr, "Message Null\n");
        exit(1);
    }

    dbus_message_iter_init_append(msg, &args);
    if (!dbus_message_iter_append_basic(&args, DBUS_TYPE_STRING, &message)) {
        fprintf(stderr, "Out Of Memory!\n");
        exit(1);
    }

    if (!dbus_connection_send_with_reply(conn, msg, &pending, -1)) {
        fprintf(stderr, "Out Of Memory!\n");
        exit(1);
    }

    if (pending == NULL) {
        fprintf(stderr, "Pending Call Null\n");
        exit(1);
    }

    dbus_connection_flush(conn);

    printf("Message Sent: %s\n", message);

    dbus_message_unref(msg);
}

int main(int argc, char** argv) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <message>\n", argv[0]);
        return 1;
    }

    send_message(argv[1]);
    return 0;
}
