#!/bin/sh

cp package/busybox/S10mdev ${TARGET_DIR}/etc/init.d/S10mdev
chmod 755 ${TARGET_DIR}/etc/init.d/S10mdev
cp package/busybox/mdev.conf ${TARGET_DIR}/etc/mdev.conf
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/interfaces ${TARGET_DIR}/etc/network/interfaces
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/hostapd.conf ${TARGET_DIR}/etc/hostapd.conf
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/dhcpd.conf ${TARGET_DIR}/etc/dhcp/dhcpd.conf
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/cmdline.txt ${TARGET_DIR}/../images/rpi-firmware/cmdline.txt
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/config_0w.txt ${TARGET_DIR}/../images/rpi-firmware/config.txt 
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/board/raspberrypi0w/sshd_config ${TARGET_DIR}/etc/ssh/sshd_config

cp -a ${BR2_EXTERNAL_ACCESS_POINT_PATH}/package/webctl/webpage/* ${TARGET_DIR}/usr/html/
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/package/webctl/nginx.conf ${TARGET_DIR}/etc/nginx/nginx.conf
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/package/webctl/S99webctl ${TARGET_DIR}/etc/init.d/S99webctl
cp ${BR2_EXTERNAL_ACCESS_POINT_PATH}/S90hostapd ${TARGET_DIR}/etc/init.d/S90hostapd
