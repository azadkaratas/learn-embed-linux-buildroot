WEBCTL_VERSION = 1.0
WEBCTL_SITE = $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/package/webctl
#WEBCTL_INSTALL_STAGING = YES
WEBCTL_SITE_METHOD = local
WEBCTL_DEPENDENCIES = dbus nodejs nginx

define WEBCTL_INSTALL_INIT_SYSV
	$(INSTALL) -D -m 0755 $(BR2_EXTERNAL_NODEJS_DBUS_PATH)/package/webctl/S99webctl \
		$(TARGET_DIR)/etc/init.d/S99webctl
endef
$(eval $(generic-package))