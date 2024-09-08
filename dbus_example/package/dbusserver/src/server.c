#include <stdio.h>
#include <stdlib.h>
#include <syslog.h>
#include <dbus/dbus.h>

void receive_message() {
    DBusMessage* msg;
    DBusMessageIter args;
    DBusConnection* conn;
    DBusError err;
    int ret;
    char* message;

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

    ret = dbus_bus_request_name(conn, "test.server", DBUS_NAME_FLAG_REPLACE_EXISTING , &err);
    if (dbus_error_is_set(&err)) {
        fprintf(stderr, "Name Error (%s)\n", err.message);
        dbus_error_free(&err);
    }
    if (ret != DBUS_REQUEST_NAME_REPLY_PRIMARY_OWNER) {
        exit(1);
    }

    while (1) {
        dbus_connection_read_write(conn, 0);
        msg = dbus_connection_pop_message(conn);

        if (msg == NULL) {
            continue;
        }

        if (dbus_message_is_method_call(msg, "test.method.Type", "Method")) {
            if (!dbus_message_iter_init(msg, &args)) {
                fprintf(stderr, "Message has no arguments!\n");
            } else if (DBUS_TYPE_STRING != dbus_message_iter_get_arg_type(&args)) {
                fprintf(stderr, "Argument is not string!\n");
            } else {
                dbus_message_iter_get_basic(&args, &message);
                printf("Received message: %s\n", message);
                syslog (LOG_INFO, "Received message: %s", message);
            }
        }

        dbus_message_unref(msg);
    }
}

int main() {
    printf("Server listening...\n");
    receive_message();
    return 0;
}
