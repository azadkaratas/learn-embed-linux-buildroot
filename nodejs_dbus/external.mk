BR2_ROOTFS_POST_BUILD_SCRIPT += $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/board/$(BOARD_NAME)/post-build.sh

include $(sort $(wildcard $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/package/*/*.mk))