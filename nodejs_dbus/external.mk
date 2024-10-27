BR2_ROOTFS_POST_BUILD_SCRIPT += $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/board/raspberrypi0w/post-build.sh

include $(sort $(wildcard $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/package/*/*.mk))