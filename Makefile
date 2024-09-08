.PHONY: all clean

BUILDROOT_DIR = $(shell pwd)/buildroot

# Project 1
headless_wifi_setup_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../headless_wifi_setup

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

menuconfig:
	$(MAKE) -C $(BUILDROOT_DIR) menuconfig

list-defconfigs:
	$(MAKE) -C $(BUILDROOT_DIR) list-defconfigs

clean:
	$(MAKE) -C $(BUILDROOT_DIR) clean	