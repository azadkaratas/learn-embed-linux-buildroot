.PHONY: all clean

BUILDROOT_DIR = $(shell pwd)/buildroot

all:
	$(MAKE) -C $(BUILDROOT_DIR)

headless_wifi_setup_rpi0w:
	$(MAKE) -C $(BUILDROOT_DIR) custom_raspberrypi0w_defconfig
	$(MAKE) -C $(BUILDROOT_DIR) BR2_EXTERNAL=../headless_wifi_setup

menuconfig:
	$(MAKE) -C $(BUILDROOT_DIR) menuconfig	
clean:
	$(MAKE) -C $(BUILDROOT_DIR) clean	