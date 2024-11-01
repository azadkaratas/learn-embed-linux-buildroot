.PHONY: all clean

BUILDROOT_DIR = $(shell pwd)/buildroot

# Project 1
headless_wifi_setup_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../headless_wifi_setup BOARD_NAME=raspberrypi0w

headless_wifi_setup_rpi3-64:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi3b_64_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../headless_wifi_setup BOARD_NAME=raspberrypi3-64

# Project 2
background_logger_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../background_logger

# Project 3
dbus_example_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../dbus_example

# Project 4
webserver_nginx_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../webserver_nginx

# Project 5
nginx_nodejs_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../nginx_nodejs

# Project 6
nodejs_dbus_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../nodejs_dbus

menuconfig:
	$(MAKE) -C $(BUILDROOT_DIR) menuconfig

list-defconfigs:
	$(MAKE) -C $(BUILDROOT_DIR) list-defconfigs

clean:
	$(MAKE) -C $(BUILDROOT_DIR) clean	