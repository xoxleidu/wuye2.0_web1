/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.88.125
 Source Server Type    : MySQL
 Source Server Version : 50642
 Source Host           : 192.168.88.125:3306
 Source Schema         : dbtenement

 Target Server Type    : MySQL
 Target Server Version : 50642
 File Encoding         : 65001

 Date: 03/01/2019 13:38:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ammeter
-- ----------------------------
DROP TABLE IF EXISTS `ammeter`;
CREATE TABLE `ammeter`  (
  `ammeterId` int(11) NOT NULL,
  `ammeterName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电表名称',
  `estateType` tinyint(4) NOT NULL COMMENT '物产类型   1房产  2地下室  3车库  4其他物产',
  `estateId` int(11) NOT NULL COMMENT '物产ID',
  `lineLossId` smallint(6) NOT NULL COMMENT '路耗ID',
  `feeRuleId` int(11) NOT NULL COMMENT '收费规则ID',
  `severalfold` smallint(6) NOT NULL COMMENT '倍数',
  `enable` tinyint(4) NOT NULL COMMENT '是否使用',
  `note` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `severalfoldArithmetic` smallint(6) NOT NULL COMMENT '倍数算法',
  PRIMARY KEY (`ammeter_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '电表\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for ammeter_ladder
-- ----------------------------
DROP TABLE IF EXISTS `ammeter_ladder`;
CREATE TABLE `ammeter_ladder`  (
  `ammeter_ladder_id` int(11) NOT NULL,
  `ammeter_id` int(11) NOT NULL COMMENT '电表Id',
  `beginTime` int(11) NOT NULL COMMENT '开始时间',
  `end_time` int(11) NOT NULL,
  `fee_rule_id` int(11) NOT NULL COMMENT '收费规则id',
  `degree` decimal(7, 1) NOT NULL COMMENT '阶梯度数',
  `money` decimal(7, 1) NOT NULL COMMENT '费用',
  `real_payment` decimal(7, 1) DEFAULT NULL COMMENT '实缴费用',
  `discount` decimal(7, 1) DEFAULT NULL COMMENT '优惠费用',
  `discount_note` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '优惠说明',
  `jiesuan_date` int(11) NOT NULL COMMENT '收费状态   1未收费   2未产生费用  3已收费 4自动缴费(不产生票据)',
  `bill_log_id` int(11) DEFAULT NULL,
  `ladder_no` tinyint(4) NOT NULL,
  `estate_id` int(11) NOT NULL COMMENT '物产ID',
  `enable` tinyint(4) NOT NULL COMMENT '是否作废：1正常 2 作废',
  `tax` decimal(7, 1) DEFAULT NULL COMMENT '税',
  `create_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`ammeter_ladder_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for ammeter_record
-- ----------------------------
DROP TABLE IF EXISTS `ammeter_record`;
CREATE TABLE `ammeter_record`  (
  `ammeterRecordId` int(11) NOT NULL,
  `userId` int(11) NOT NULL COMMENT '操作人ID',
  `ammeterId` int(11) NOT NULL COMMENT '电表ID',
  `yearMonth` int(11) NOT NULL COMMENT '日期(年/月)',
  `minNumber` int(11) NOT NULL COMMENT '起始表底',
  `maxNumber` int(11) NOT NULL COMMENT '结束表底',
  `line_loss` decimal(7, 1) NOT NULL COMMENT '路耗',
  `line_loss_id` smallint(6) NOT NULL COMMENT '路耗ID',
  `loss_all` decimal(7, 1) NOT NULL COMMENT '总耗',
  `fee_rule_id` int(11) NOT NULL COMMENT '收费规则ID',
  `money` decimal(7, 1) NOT NULL COMMENT '费用',
  `real_payment` decimal(7, 1) DEFAULT NULL COMMENT '实缴费用',
  `discount` decimal(7, 1) DEFAULT NULL COMMENT '优惠费用',
  `discount_note` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '优惠说明',
  `state` tinyint(4) NOT NULL COMMENT '收费状态   1未收费   2未产生费用  3已收费 4自动缴费(不产生票据)',
  `bill_log_id` int(11) DEFAULT NULL COMMENT '票据id 默认是0',
  `changeSurface` tinyint(4) NOT NULL COMMENT '电表是否换表，1=正常，2=换表',
  `settlement_ladder` tinyint(4) DEFAULT NULL COMMENT '是否结算阶梯费用：1 已经是 0未结算',
  `comminity_id` smallint(6) NOT NULL COMMENT '小区ID',
  `estate_type` tinyint(4) NOT NULL COMMENT '物产类型',
  `estate_id` int(11) NOT NULL COMMENT '物产ID',
  `enable` tinyint(4) NOT NULL COMMENT '是否作废：1正常 2 作废',
  `tax` decimal(7, 1) DEFAULT NULL COMMENT '税',
  `create_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`ammeter_record_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '抄表记录' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for bus_mgt_building
-- ----------------------------
DROP TABLE IF EXISTS `bus_mgt_building`;
CREATE TABLE `bus_mgt_building`  (
  `building_id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `community_id` int(11) UNSIGNED DEFAULT NULL COMMENT '小区ID',
  `building_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '楼号名称',
  PRIMARY KEY (`building_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for bus_mgt_community
-- ----------------------------
DROP TABLE IF EXISTS `bus_mgt_community`;
CREATE TABLE `bus_mgt_community`  (
  `community_id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `office_id` int(11) UNSIGNED DEFAULT NULL COMMENT '物业办公室ID',
  `community_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '小区名称',
  PRIMARY KEY (`community_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '小区表，每个小区属于一个物业办公室(bus_mgt_office)' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for bus_mgt_estate
-- ----------------------------
DROP TABLE IF EXISTS `bus_mgt_estate`;
CREATE TABLE `bus_mgt_estate`  (
  `estateId` int(11) DEFAULT NULL COMMENT '物产ID',
  `communityId` smallint(6) NOT NULL COMMENT '小区ID',
  `buildingId` smallint(6) NOT NULL COMMENT '楼号ID',
  `estateType` tinyint(4) DEFAULT NULL COMMENT '物产类型(1房产 2商铺 3地下室 4地上车位 5地下车位 6车库 7其他物产)',
  `estateName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '物产名称',
  `houseCode` int(11) NOT NULL COMMENT '住房号码',
  `unit` tinyint(4) NOT NULL COMMENT '单元号',
  `houseNumber` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '门牌号',
  ` houseTypeId` int(11) DEFAULT NULL COMMENT '户型图ID',
  `license` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '车牌号',
  `acreage` decimal(7, 2) NOT NULL COMMENT '面积',
  `owner` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '业主',
  `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '业主电话',
  `idcard` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '身份证号',
  `status` smallint(4) NOT NULL COMMENT '状态(1空闲  2出租中 3 已售)',
  `remark` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `checkInTime` int(11) DEFAULT NULL COMMENT '入住时间(出租时间)',
  `moveOutTime` int(11) DEFAULT NULL COMMENT '到期时间',
  `getKeyTime` int(11) DEFAULT NULL COMMENT '领钥匙时间',
  `hl` tinyint(4) DEFAULT NULL COMMENT '红蓝票(1红 2蓝)'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '物产表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for bus_mgt_office
-- ----------------------------
DROP TABLE IF EXISTS `bus_mgt_office`;
CREATE TABLE `bus_mgt_office`  (
  `office_id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) UNSIGNED DEFAULT NULL COMMENT '父ID',
  `office_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '小区或办公室名称',
  `gmt_create` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `gmt_modified` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`office_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '物业办公室结构表，尚新物业->南城区->欧陆片区->碧水办公室' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for demo
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo`  (
  `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` char(48) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `emall` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系电话',
  `description` varchar(128) CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL COMMENT '描述',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态 0锁定 1有效',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_username`(`username`) USING BTREE COMMENT '用户名唯一约束'
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fee_item
-- ----------------------------
DROP TABLE IF EXISTS `fee_item`;
CREATE TABLE `fee_item`  (
  `fee_item_id` char(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fee_item_name` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收费项名称',
  `fee_item_type` tinyint(4) NOT NULL COMMENT '费用类型：10普通收费 15出租 20新收违约金   30收押金    40扣费违约金  50独立退费  60押金退费',
  `hl` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`fee_item_id`) USING BTREE,
  UNIQUE INDEX `IX_fee_item`(`fee_item_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收费项' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fee_rule
-- ----------------------------
DROP TABLE IF EXISTS `fee_rule`;
CREATE TABLE `fee_rule`  (
  `fee_rule_id` int(11) NOT NULL,
  `communityId` smallint(6) NOT NULL COMMENT '小区ID',
  `fee_item_id` char(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收费项ID',
  `fee_rule_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收费规则名称',
  `price` decimal(10, 3) NOT NULL COMMENT '价格',
  `fee_mode` tinyint(4) NOT NULL COMMENT '物产类型：房产，地下室，车位，其他物产，电表\r\n房产：\r\n1自定义金额\r\n2固定金额    （周期）\r\n3面积*单价   （周期）\r\n4数量*单价\r\n5自定义金额(出租)\r\n6自定义金额(充值)\r\n7自定义金额(度数充值)\r\n8固定金额(出租)\r\n\r\n地下室：\r\n21自定义金额\r\n22固定金额   （周期）\r\n23面积*单价  （周期）\r\n24数量*单价\r\n25自定义金额(度数充值)\r\n\r\n车位：\r\n41自定义金额\r\n42固定金额   （周期）\r\n43面积*单价  （周期）\r\n44数量*单价\r\n45自定义金额(短租)\r\n46自定义金额(长租)\r\n47固定金额（短租）\r\n48固定金额(长租)\r\n49自定义金额(度数充值)\r\n\r\n电表：\r\n61用电量*单价\r\n\r\n其他物产：\r\n81自定义金额\r\n82固定金额    （周期）\r\n83面积*单价   （周期）\r\n84数量*单价\r\n85自定义金额(余额充值)\r\n86自定义金额(度数充值)\r\n87自定义金额(出租)\r\n88固定金额(出租)\r\n\r\n外来者：\r\n101自定义金额\r\n102固定金额 \r\n103数量*单价',
  `cycle` tinyint(4) NOT NULL COMMENT '周期说明：1不是周期  2按天   3按月   4按季度    5按年',
  `enable` tinyint(4) NOT NULL COMMENT '1启用,2禁用 ',
  `note` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `auto_record` tinyint(4) NOT NULL COMMENT '是否生成预缴记录：1生成  2不生成',
  PRIMARY KEY (`fee_rule_id`) USING BTREE,
  UNIQUE INDEX `IX_fee_rule`(`community_id`, `fee_rule_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收费规则' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fee_rule_relation
-- ----------------------------
DROP TABLE IF EXISTS `fee_rule_relation`;
CREATE TABLE `fee_rule_relation`  (
  `goods_type` tinyint(4) NOT NULL COMMENT '物产类型   1房产  2地下室  3车库  4其他物产',
  `goods_id` int(11) NOT NULL COMMENT '物产ID',
  `fee_item_id` char(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收费项ID',
  `fee_rule_id` int(11) NOT NULL COMMENT '收费规则ID',
  PRIMARY KEY (`goods_type`, `goods_id`, `fee_item_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '物产收费规则关系表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for fee_rule_update
-- ----------------------------
DROP TABLE IF EXISTS `fee_rule_update`;
CREATE TABLE `fee_rule_update`  (
  `id` int(11) NOT NULL,
  `fee_rule_id_old` int(11) NOT NULL,
  `fee_rule_id_new` int(11) NOT NULL,
  `start_date` int(11) NOT NULL COMMENT '生效日期',
  `isdone` tinyint(4) NOT NULL COMMENT '是否替换完成：0未完成，1完成',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收费规则替换记录' ROW_FORMAT = Compact;

CREATE TABLE `pay` (
  `payId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `payName` varchar(50) DEFAULT NULL COMMENT '支出名称',
  `payTypeId` int(11) unsigned NOT NULL COMMENT '支出类型ID',
  `communityId` int(11) unsigned DEFAULT NULL COMMENT '小区ID',
  `userId` int(11) unsigned DEFAULT NULL COMMENT '用户ID',
  `money` decimal(7,1) NOT NULL COMMENT '总费用',
  `payment` tinyint(4) DEFAULT NULL COMMENT '支出方式(1现金 2电子支付)',
  `payTime` int(11) unsigned NOT NULL COMMENT '支出时间',
  `voucherNum` int(11) unsigned DEFAULT NULL COMMENT '收据单号',
  `state` int(11) unsigned DEFAULT NULL COMMENT '状态：1正常，2作废',
  `note` varchar(50) DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT NULL,
  `operator` int(11) DEFAULT NULL COMMENT '操作人员ID',
  `hl` int(11) NOT NULL,
  PRIMARY KEY (`pay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='支出记录\r\n';
-- ----------------------------
-- Table structure for line_loss
-- ----------------------------
DROP TABLE IF EXISTS `line_loss`;
CREATE TABLE `line_loss`  (
  `line_loss_id` smallint(6) NOT NULL,
  `communityId` smallint(6) NOT NULL,
  `line_loss_name` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `formula` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公式：实耗度*1.5',
  `enable` tinyint(4) NOT NULL COMMENT '1启用  2禁用',
  PRIMARY KEY (`line_loss_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '路耗' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_exception_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_exception_log`;
CREATE TABLE `sys_mgt_exception_log`  (
  `exceptionlog_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作用户',
  `operation` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作内容',
  `method` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作方法',
  `request_ip` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作者IP',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `exceptionCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `exceptionDetail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`exceptionlog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '异常日志\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_log`;
CREATE TABLE `sys_mgt_log`  (
  `log_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作用户',
  `operation` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作内容',
  `request_ip` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作者IP',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `type` tinyint(4) DEFAULT NULL COMMENT '操作类型()',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '操作日志\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_permission`;
CREATE TABLE `sys_mgt_permission`  (
  `permission_id` bigint(10) NOT NULL AUTO_INCREMENT COMMENT '菜单/按钮ID',
  `parent_id` int(5) NOT NULL COMMENT '上级菜单ID',
  `menu_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单/按钮名称',
  `URL` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单URL',
  `type` int(1) NOT NULL COMMENT '类型 0菜单 1按钮',
  `order_num` int(20) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`permission_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '权限\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_role`;
CREATE TABLE `sys_mgt_role`  (
  `role_id` bigint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态 0正常 1禁用',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `modified_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色\r\n' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_role_permission`;
CREATE TABLE `sys_mgt_role_permission`  (
  `role_id` int(20) NOT NULL COMMENT '角色ID',
  `permission_id` int(20) NOT NULL COMMENT '菜单/按钮ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色权限关联' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_mgt_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_mgt_user`;
CREATE TABLE `sys_mgt_user`  (
  `userId` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `roleId` int(11) DEFAULT NULL COMMENT '角色ID',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `idcard` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '身份证号',
  `mobile` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系电话',
  `office_id` int(10) DEFAULT NULL COMMENT '物业办公室ID',
  `description` varchar(128) CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL COMMENT '描述',
  `last_login_time` int(10) DEFAULT NULL COMMENT '最近访问时间',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态 0锁定 1有效',
  `create_time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `unique_username`(`username`) USING BTREE COMMENT '用户名唯一约束'
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户\r\n' ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
