#include <stdio.h>
#include <syslog.h>
#include <unistd.h>

int main()
{
    int counter = 0;
    while(1){    
        syslog (LOG_WARNING, "Sleeping. Counter value: %d", counter++);
        sleep(1);
    }
    return 0;
}