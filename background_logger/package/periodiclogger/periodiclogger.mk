PERIODICLOGGER_VERSION = 1.0
PERIODICLOGGER_SITE = $(BR2_EXTERNAL_BACKGROUND_LOGGER_PATH)/package/periodiclogger/src
PERIODICLOGGER_SITE_METHOD = local

define PERIODICLOGGER_BUILD_CMDS
	$(MAKE) CC="$(TARGET_CC)" LD="$(TARGET_LD)" -C $(@D)
endef

define PERIODICLOGGER_INSTALL_TARGET_CMDS
	$(INSTALL) -D -m 0755 $(@D)/periodiclogger $(TARGET_DIR)/usr/bin
endef

define PERIODICLOGGER_INSTALL_INIT_SYSV
	$(INSTALL) -D -m 0755 $(BR2_EXTERNAL_BACKGROUND_LOGGER_PATH)/package/periodiclogger/S99periodiclogger $(TARGET_DIR)/etc/init.d/S99periodiclogger
endef


$(eval $(generic-package))
