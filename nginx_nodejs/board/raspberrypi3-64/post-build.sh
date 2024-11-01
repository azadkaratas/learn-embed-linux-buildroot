#!/bin/sh

cp package/busybox/S10mdev ${TARGET_DIR}/etc/init.d/S10mdev
chmod 755 ${TARGET_DIR}/etc/init.d/S10mdev
cp package/busybox/mdev.conf ${TARGET_DIR}/etc/mdev.conf
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/board/raspberrypi3-64/interfaces ${TARGET_DIR}/etc/network/interfaces
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/board/raspberrypi3-64/wpa_supplicant.conf ${TARGET_DIR}/etc/wpa_supplicant.conf
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/board/raspberrypi3-64/cmdline.txt ${TARGET_DIR}/../images/rpi-firmware/cmdline.txt
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/board/raspberrypi3-64/config_3_64bit.txt ${TARGET_DIR}/../images/rpi-firmware/config.txt 
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/board/raspberrypi3-64/sshd_config ${TARGET_DIR}/etc/ssh/sshd_config

cp -a ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/webpage/* ${TARGET_DIR}/usr/html/
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/nginx.conf ${TARGET_DIR}/etc/nginx/nginx.conf
cp ${BR2_EXTERNAL_NGINX_NODEJS_PATH}/S99nodejs ${TARGET_DIR}/etc/init.d/S99nodejs