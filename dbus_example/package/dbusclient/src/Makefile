CC = gcc

.PHONY: clean

CFLAGS = $(DBUSCLIENT_CFLAGS)
LDFLAGS = $(DBUSCLIENT_LDFLAGS)

SRCS = client.c
OBJS = $(SRCS:.c=.o)

dbusclient: $(OBJS)
	$(CC) -o $@ $(OBJS) $(LDFLAGS)

%.o: %.c
	$(CC) -c $< -o $@ $(CFLAGS)

clean:
	rm dbusclient