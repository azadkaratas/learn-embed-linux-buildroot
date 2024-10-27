#include <stdio.h>
#include <stdlib.h>
#include <dbus/dbus.h>

const char *const SERVICE_BUS_NAME = "com.embedlinux.messenger";
const char *const OBJECT_PATH_NAME = "/com/embedlinux/messenger";
const char *const INTERFACE_NAME = "com.embedlinux.web";

const char *const METHOD_NAME = "add_numbers";
const char *const INTROSPECT_XML = 
    "<node>"
    "  <interface name='com.embedlinux.web'>"
    "    <method name='add_numbers'>"
    "      <arg type='i' name='num1' direction='in'/>"
    "      <arg type='i' name='num2' direction='in'/>"
    "      <arg type='i' name='result' direction='out'/>"
    "    </method>"
    "  </interface>"
    "</node>";


int main (int argc, char **argv)
{
    DBusConnection *conn;
    DBusMessage *reply;
    DBusMessage *message;
    DBusError err;
    DBusMessageIter args;

    dbus_error_init (&err);

    conn = dbus_bus_get (DBUS_BUS_SYSTEM, &err);
    if (dbus_error_is_set(&err)) {
        fprintf(stderr, "Connection Error (%s)\n", err.message);
        dbus_error_free(&err);
    }
    if (conn == NULL) {
        exit(1);
    }

    int ret = dbus_bus_request_name (conn, SERVICE_BUS_NAME, DBUS_NAME_FLAG_DO_NOT_QUEUE, &err);
    if (dbus_error_is_set(&err)) {
        fprintf(stderr, "Name Error (%s)\n", err.message);
        dbus_error_free(&err);
    }
    if (ret != DBUS_REQUEST_NAME_REPLY_PRIMARY_OWNER) {
        exit(1);
    }

    // Handle request from clients
    while (1) {
        // Block for msg from client
        if (!dbus_connection_read_write_dispatch (conn, -1)) {
            fprintf (stderr, "Not connected now.\n");
            exit (1);
        }

        if ((message = dbus_connection_pop_message (conn)) == NULL) {
            fprintf (stderr, "Did not get message\n");
            continue;
        } 
        
        // Check for introspection requests
        if (dbus_message_is_method_call(message, "org.freedesktop.DBus.Introspectable", "Introspect")) {            
            if ((reply = dbus_message_new_method_return(message)) == NULL) {
                fprintf (stderr, "Error in dbus_message_new_method_return\n");
                exit (1);
            }

            dbus_message_iter_init_append(reply, &args);
            if (!dbus_message_iter_append_basic(&args, DBUS_TYPE_STRING, &INTROSPECT_XML)) {
                fprintf (stderr, "Error in dbus_message_iter_append_basic\n");
                exit (1);
            }

            if (!dbus_connection_send(conn, reply, NULL)) {
                fprintf (stderr, "Error in dbus_connection_send\n");
                exit (1);
            }

            dbus_connection_flush(conn);
            dbus_message_unref(reply);
            continue; // No need to process further for introspect requests
        }

        // Check for method call to add_numbers
        if (dbus_message_is_method_call (message, INTERFACE_NAME, METHOD_NAME)) {
            
            int value1, value2, result;
            if (!dbus_message_iter_init(message, &args)) {
                printf("Message has no arguments!\n");
            }
            else {
                dbus_message_iter_get_basic(&args, &value1);
                dbus_message_iter_next(&args);
                dbus_message_iter_get_basic(&args, &value2);
                //syslog (LOG_INFO, "Received message: %s", message2);
            }

            result = value1 + value2;
            printf("RESULT: %d\n", result);

            // Send the result back
            reply = dbus_message_new_method_return(message);
            dbus_message_iter_init_append(reply, &args);
            dbus_message_iter_append_basic(&args, DBUS_TYPE_INT32, &result);

            if (!dbus_connection_send(conn, reply, NULL)) {
                printf("Error at dbus_connection_send\n");
                //syslog (LOG_INFO, "Error at dbus_connection_send\n");
                exit(1);
            }

            dbus_message_unref (reply);
        }
    }

    return 0;
}
