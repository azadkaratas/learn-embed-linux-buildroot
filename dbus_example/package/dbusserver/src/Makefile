CC = gcc

.PHONY: clean

CFLAGS = $(DBUSSERVER_CFLAGS)
LDFLAGS = $(DBUSSERVER_LDFLAGS)

SRCS = server.c
OBJS = $(SRCS:.c=.o)

dbusserver: $(OBJS)
	$(CC) -o $@ $(OBJS) $(LDFLAGS)

%.o: %.c
	$(CC) -c $< -o $@ $(CFLAGS)

clean:
	rm dbusserver