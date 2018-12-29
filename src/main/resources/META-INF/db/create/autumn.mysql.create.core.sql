DROP TABLE IF EXISTS PF_APP_ADMIN;

DROP TABLE IF EXISTS PF_APP_BASE;

DROP TABLE IF EXISTS PF_APP_DOMAIN;

DROP TABLE IF EXISTS PF_APP_PROFILE;

DROP TABLE IF EXISTS PF_APP_RSA_KEY_PAIR;

DROP TABLE IF EXISTS PF_ENTITY;

DROP TABLE IF EXISTS PF_ENTITY_PROPERTY;

DROP TABLE IF EXISTS PF_LOG_LOGIN;

DROP TABLE IF EXISTS PF_LOG_VISIT;

DROP TABLE IF EXISTS PF_MENU;

DROP TABLE IF EXISTS PF_MENU_I18N;

DROP TABLE IF EXISTS PF_MENU_SHORT;

DROP TABLE IF EXISTS PF_PARAM_DEF;

DROP TABLE IF EXISTS PF_PARAM_LIST_ENUM;

DROP TABLE IF EXISTS PF_PARAM_REGION_ENUM;

DROP TABLE IF EXISTS PF_PARAM_SINGLE;

DROP TABLE IF EXISTS PF_PARAM_TREE_ENUM;

DROP TABLE IF EXISTS PF_PERM;

DROP TABLE IF EXISTS PF_ROLE;

DROP TABLE IF EXISTS PF_ROLE_PERM;

DROP TABLE IF EXISTS PF_USER;

DROP TABLE IF EXISTS PF_USER_PASSWORD;

DROP TABLE IF EXISTS PF_USER_PROFILE;

DROP TABLE IF EXISTS PF_USER_ROLE;

DROP TABLE IF EXISTS PF_USER_STATE;

/*==============================================================*/
/* Table: PF_APP_ADMIN                                          */
/*==============================================================*/
CREATE TABLE PF_APP_ADMIN
(
  APP_ID  VARCHAR(64) NOT NULL COMMENT '应用ID',
  USER_ID VARCHAR(64) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (APP_ID, USER_ID)
);

ALTER TABLE PF_APP_ADMIN
  COMMENT '应用管理员表';

/*==============================================================*/
/* Table: PF_APP_BASE                                           */
/*==============================================================*/
CREATE TABLE PF_APP_BASE
(
  APP_ID    VARCHAR(64)  NOT NULL COMMENT '应用ID',
  APP_CODE  VARCHAR(64)  NOT NULL COMMENT '应用代码',
  APP_NAME  VARCHAR(200) NOT NULL COMMENT '应用名称',
  APP_TYPE  VARCHAR(64)  NOT NULL COMMENT '应用类型',
  DOMAIN_ID VARCHAR(64)  NOT NULL COMMENT '领域ID',
  SEQNO     INTEGER COMMENT '序号',
  DES       VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (APP_ID)
);

ALTER TABLE PF_APP_BASE
  COMMENT '应用基本信息表';

/*==============================================================*/
/* Table: PF_APP_DOMAIN                                         */
/*==============================================================*/
CREATE TABLE PF_APP_DOMAIN
(
  DOMAIN_ID   VARCHAR(64)  NOT NULL COMMENT '领域ID',
  DOMAIN_CODE VARCHAR(64)  NOT NULL COMMENT '领域代码',
  DOMAIN_NAME VARCHAR(200) NOT NULL COMMENT '领域名称',
  SEQNO       INTEGER COMMENT '序号',
  DES         VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (DOMAIN_ID)
);

ALTER TABLE PF_APP_DOMAIN
  COMMENT '应用领域表';

/*==============================================================*/
/* Table: PF_APP_PROFILE                                        */
/*==============================================================*/
CREATE TABLE PF_APP_PROFILE
(
  APP_ID      VARCHAR(64) NOT NULL COMMENT '应用ID',
  PARAM_CODE  VARCHAR(64) NOT NULL COMMENT '参数代码',
  PARAM_VALUE VARCHAR(200) COMMENT '参数值',
  PRIMARY KEY (APP_ID, PARAM_CODE)
);

ALTER TABLE PF_APP_PROFILE
  COMMENT '应用参数设置表';

/*==============================================================*/
/* Table: PF_APP_RSA_KEY_PAIR                                   */
/*==============================================================*/
CREATE TABLE PF_APP_RSA_KEY_PAIR
(
  APP_ID      VARCHAR(64)   NOT NULL COMMENT '应用ID',
  PUBLIC_KEY  VARCHAR(1024) NOT NULL COMMENT '公钥',
  PRIVATE_KEY VARCHAR(1024) NOT NULL COMMENT '私钥',
  PRIMARY KEY (APP_ID)
);

ALTER TABLE PF_APP_RSA_KEY_PAIR
  COMMENT 'RSA秘钥表';

/*==============================================================*/
/* Table: PF_ENTITY                                             */
/*==============================================================*/
CREATE TABLE PF_ENTITY
(
  ENTITY_ID    VARCHAR(64) NOT NULL COMMENT '实体ID',
  ENTITY_NAME  VARCHAR(200) COMMENT '实体名称',
  ENTITY_GROUP VARCHAR(64) COMMENT '实体组别',
  APP_ID       VARCHAR(64) COMMENT '应用ID，为null表示所有应用共用，否则为特定应用使用',
  SEQNO        INTEGER COMMENT '序号',
  DES          VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (ENTITY_ID)
);

ALTER TABLE PF_ENTITY
  COMMENT '实体表';

/*==============================================================*/
/* Table: PF_ENTITY_PROPERTY                                    */
/*==============================================================*/
CREATE TABLE PF_ENTITY_PROPERTY
(
  ENTITY_ID      VARCHAR(64) NOT NULL COMMENT '实体ID',
  PROPERTY_CODE  VARCHAR(64) NOT NULL COMMENT '属性代码',
  PROPERTY_VALUE VARCHAR(200) COMMENT '属性值',
  PRIMARY KEY (ENTITY_ID, PROPERTY_CODE)
);

ALTER TABLE PF_ENTITY_PROPERTY
  COMMENT '实体属性表';

/*==============================================================*/
/* Table: PF_LOG_LOGIN                                          */
/*==============================================================*/
CREATE TABLE PF_LOG_LOGIN
(
  SESSION_ID     VARCHAR(64) NOT NULL COMMENT '登录会话ID',
  USER_ID        VARCHAR(64) COMMENT '用户ID',
  LOGIN_DATE     VARCHAR(64) COMMENT '登录日期',
  LOGIN_TIME     VARCHAR(64) COMMENT '登录时间',
  LOGOUT_DATE    VARCHAR(64) COMMENT '登出日期',
  LOGOUT_TIME    VARCHAR(64) COMMENT '登出时间',
  CLIENT_DEVICE  VARCHAR(64) COMMENT '客户端设备',
  CLIENT_IP      VARCHAR(64) COMMENT '客户端IP',
  CLIENT_BROWSER VARCHAR(64) COMMENT '客户端浏览器',
  CLIENT_OS      VARCHAR(64) COMMENT '客户端操作系统',
  SERVER_IP      VARCHAR(64) COMMENT '服务器IP',
  PRIMARY KEY (SESSION_ID)
);

ALTER TABLE PF_LOG_LOGIN
  COMMENT '登录日志表';

/*==============================================================*/
/* Table: PF_LOG_VISIT                                          */
/*==============================================================*/
CREATE TABLE PF_LOG_VISIT
(
  REQUEST_ID     VARCHAR(64) NOT NULL COMMENT '请求ID',
  SESSION_ID     VARCHAR(64) COMMENT '会话ID',
  USER_ID        VARCHAR(64) COMMENT '用户ID',
  START_DATE     VARCHAR(64) COMMENT '开始日期',
  START_TIME     VARCHAR(64) COMMENT '开始时间',
  END_DATE       VARCHAR(64) COMMENT '结束日期',
  END_TIME       VARCHAR(64) COMMENT '结束时间',
  PERM_ID        VARCHAR(64) COMMENT '权限ID',
  METHOD         VARCHAR(64) COMMENT 'HTTP方法',
  REQUEST_URL    VARCHAR(200) COMMENT '请求URL',
  SERVICE_FLAG   VARCHAR(64) COMMENT '服务标志',
  CLIENT_DEVICE  VARCHAR(64) COMMENT '客户端设备',
  CLIENT_IP      VARCHAR(64) COMMENT '客户端IP',
  CLIENT_BROWSER VARCHAR(64) COMMENT '客户端浏览器',
  CLIENT_OS      VARCHAR(64) COMMENT '客户端操作系统',
  SERVER_IP      VARCHAR(64) COMMENT '服务器IP',
  PRIMARY KEY (REQUEST_ID)
);

ALTER TABLE PF_LOG_VISIT
  COMMENT '访问日志表';

/*==============================================================*/
/* Table: PF_MENU                                               */
/*==============================================================*/
CREATE TABLE PF_MENU
(
  MENU_ID        VARCHAR(64) NOT NULL COMMENT '菜单ID',
  PARENT_MENU_ID VARCHAR(64) COMMENT '父菜单ID',
  MENU_NAME      VARCHAR(200) COMMENT '菜单名称',
  MENU_FLAG      VARCHAR(64) COMMENT '菜单标志 10 普通菜单 20 有单独tab但不显示为菜单30 独立维护的功能点 40依赖其它节点权限的功能点',
  ICON           VARCHAR(200) COMMENT '菜单图标',
  METHOD         VARCHAR(64) COMMENT 'HTTP方法',
  URL            VARCHAR(200) COMMENT '菜单链接',
  SHOW_AREA      VARCHAR(64) COMMENT '显示区域',
  SHOW_PAGE_NAME VARCHAR(64) COMMENT '显示页名称',
  APP_ID         VARCHAR(64) COMMENT '应用ID',
  SEQNO          INTEGER COMMENT '序号',
  DES            VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (MENU_ID)
);

ALTER TABLE PF_MENU
  COMMENT '菜单表';

/*==============================================================*/
/* Table: PF_MENU_I18N                                          */
/*==============================================================*/
CREATE TABLE PF_MENU_I18N
(
  MENU_ID   VARCHAR(64) NOT NULL COMMENT '菜单ID',
  LOCALE    VARCHAR(64) NOT NULL COMMENT '本地化标识',
  MENU_NAME VARCHAR(200) COMMENT '菜单名称',
  MEMO      VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (MENU_ID, LOCALE)
);

ALTER TABLE PF_MENU_I18N
  COMMENT '菜单国际化表';

/*==============================================================*/
/* Table: PF_MENU_SHORT                                         */
/*==============================================================*/
CREATE TABLE PF_MENU_SHORT
(
  KEY_ID          VARCHAR(64) NOT NULL COMMENT '代理主键',
  PARENT_ID       VARCHAR(64) COMMENT '父ID',
  USER_ID         VARCHAR(64) COMMENT '用户ID',
  MENU_ID         VARCHAR(64) COMMENT '菜单ID',
  SHORT_MENU_NAME VARCHAR(200) COMMENT '快捷菜单名称',
  ICON            VARCHAR(200) COMMENT '快捷菜单图标',
  SEQNO           INTEGER COMMENT '序号',
  DES             VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (KEY_ID)
);

ALTER TABLE PF_MENU_SHORT
  COMMENT '快捷菜单表';

/*==============================================================*/
/* Table: PF_PARAM_DEF                                          */
/*==============================================================*/
CREATE TABLE PF_PARAM_DEF
(
  PARAM_CODE  VARCHAR(64)  NOT NULL COMMENT '参数代码',
  PARAM_NAME  VARCHAR(200) NOT NULL COMMENT '参数名称',
  PARAM_GROUP VARCHAR(64)  NOT NULL COMMENT '参数组别',
  PARAM_TYPE  VARCHAR(64)  NOT NULL COMMENT '参数类型 SINGLE单值参数、LIST列表型枚举参数、REGION区间型枚举参数、TREE树型枚举参数',
  EDITABLE    VARCHAR(64) COMMENT '是否可编辑',
  VERSION     INTEGER COMMENT '参数版本',
  USE_FLAG    VARCHAR(64) COMMENT '使用标志 0 历史 1 当前',
  SEQNO       INTEGER COMMENT '序号',
  DES         VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (PARAM_CODE)
);

ALTER TABLE PF_PARAM_DEF
  COMMENT '参数定义表';

/*==============================================================*/
/* Table: PF_PARAM_LIST_ENUM                                    */
/*==============================================================*/
CREATE TABLE PF_PARAM_LIST_ENUM
(
  PARAM_CODE VARCHAR(64) NOT NULL COMMENT '参数代码',
  ITEM_CODE  VARCHAR(64) NOT NULL COMMENT '项代码',
  ITEM_TEXT  VARCHAR(200) COMMENT '项文本',
  ITEM_PARAM VARCHAR(200) COMMENT '项参数',
  SEQNO      INTEGER COMMENT '序号',
  DES        VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

ALTER TABLE PF_PARAM_LIST_ENUM
  COMMENT '列表型枚举参数定义表';

/*==============================================================*/
/* Table: PF_PARAM_REGION_ENUM                                  */
/*==============================================================*/
CREATE TABLE PF_PARAM_REGION_ENUM
(
  PARAM_CODE  VARCHAR(64) NOT NULL COMMENT '参数代码',
  ITEM_CODE   VARCHAR(64) NOT NULL COMMENT '项代码',
  ITEM_TEXT   VARCHAR(200) COMMENT '项文本',
  ITEM_PARAM  VARCHAR(200) COMMENT '项参数',
  LEFT_SIGN   VARCHAR(64) COMMENT '左区间标志',
  LEFT_VALUE  DECIMAL COMMENT '左区间值',
  RIGHT_SIGN  VARCHAR(64) COMMENT '右区间标志',
  RIGHT_VALUE DECIMAL COMMENT '右区间值',
  SEQNO       INTEGER COMMENT '序号',
  DES         VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

ALTER TABLE PF_PARAM_REGION_ENUM
  COMMENT '区间型枚举参数定义表';

/*==============================================================*/
/* Table: PF_PARAM_SINGLE                                       */
/*==============================================================*/
CREATE TABLE PF_PARAM_SINGLE
(
  PARAM_CODE       VARCHAR(64)  NOT NULL COMMENT '参数代码',
  STORE_TYPE       VARCHAR(64)  NOT NULL COMMENT '存储类型',
  DATA_TYPE        VARCHAR(64)  NOT NULL COMMENT '数据类型',
  DEFAULT_VALUE    VARCHAR(200) NOT NULL COMMENT '默认值',
  VALUE_RULE       VARCHAR(64) COMMENT '取值规则',
  VALUE_RULE_PARAM VARCHAR(200) COMMENT '取值规则参数',
  ALLOW_EMPTY      VARCHAR(64) COMMENT '是否允许为空',
  MIN_LENGTH       INTEGER COMMENT '最小长度',
  MAX_LENGTH       INTEGER COMMENT '最大长度',
  PRIMARY KEY (PARAM_CODE)
);

ALTER TABLE PF_PARAM_SINGLE
  COMMENT '单值参数定义表';

/*==============================================================*/
/* Table: PF_PARAM_TREE_ENUM                                    */
/*==============================================================*/
CREATE TABLE PF_PARAM_TREE_ENUM
(
  PARAM_CODE       VARCHAR(64) NOT NULL COMMENT '参数代码',
  ITEM_CODE        VARCHAR(64) NOT NULL COMMENT '项代码',
  ITEM_TEXT        VARCHAR(200) COMMENT '项文本',
  PARENT_ITEM_CODE VARCHAR(64) COMMENT '父项代码',
  ITEM_ICON        VARCHAR(200) COMMENT '图标',
  ITEM_URL         VARCHAR(200) COMMENT 'URL',
  ITEM_PARAM       VARCHAR(200) COMMENT '项参数',
  SEQNO            INTEGER COMMENT '序号',
  DES              VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

ALTER TABLE PF_PARAM_TREE_ENUM
  COMMENT '树型枚举参数定义表';

/*==============================================================*/
/* Table: PF_PERM                                               */
/*==============================================================*/
CREATE TABLE PF_PERM
(
  PERM_ID       VARCHAR(64) NOT NULL COMMENT '权限ID',
  BUSINESS_KEY  VARCHAR(64) COMMENT '业务键值',
  PERM_TYPE     VARCHAR(64) COMMENT '权限类型 MENU表示菜单',
  PERM_TYPE_KEY VARCHAR(64) COMMENT '权限类型键值，如菜单ID',
  AUTHZ_LEVEL   INTEGER COMMENT '授权级别 0 游客级别 1 会话级别 2 授权级别',
  APP_ID        VARCHAR(64) COMMENT '应用ID',
  PRIMARY KEY (PERM_ID)
);

ALTER TABLE PF_PERM
  COMMENT '权限表';

/*==============================================================*/
/* Table: PF_ROLE                                               */
/*==============================================================*/
CREATE TABLE PF_ROLE
(
  ROLE_ID   VARCHAR(64) NOT NULL COMMENT '角色代码',
  ROLE_NAME VARCHAR(200) COMMENT '角色名称',
  APP_ID    VARCHAR(64) COMMENT '应用ID',
  DES       VARCHAR(200) COMMENT '备注',
  PRIMARY KEY (ROLE_ID)
);

ALTER TABLE PF_ROLE
  COMMENT '角色表';

/*==============================================================*/
/* Table: PF_ROLE_PERM                                          */
/*==============================================================*/
CREATE TABLE PF_ROLE_PERM
(
  ROLE_ID    VARCHAR(64) NOT NULL COMMENT '角色代码',
  PERM_ID    VARCHAR(64) NOT NULL COMMENT '权限ID',
  DATA_LEVEL INTEGER COMMENT '数据级别',
  PRIMARY KEY (ROLE_ID, PERM_ID)
);

ALTER TABLE PF_ROLE_PERM
  COMMENT '角色权限表';

/*==============================================================*/
/* Table: PF_USER                                               */
/*==============================================================*/
CREATE TABLE PF_USER
(
  USER_ID       VARCHAR(64) NOT NULL COMMENT '用户ID',
  USER_NAME     VARCHAR(20) NOT NULL COMMENT '用户英文名',
  SHOW_NAME     VARCHAR(64) COMMENT '用户中文名',
  ORG_ID        VARCHAR(64) COMMENT '机构ID',
  IDENTITY_TYPE VARCHAR(2) COMMENT '证件类型',
  IDENTITY_ID   VARCHAR(64) COMMENT '证件号码',
  MOBILE        VARCHAR(64) COMMENT '电话',
  EMAIL         VARCHAR(64) COMMENT '邮箱',
  APP_ID        VARCHAR(64) NOT NULL COMMENT '应用ID',
  PRIMARY KEY (USER_ID)
);

ALTER TABLE PF_USER
  COMMENT '用户表';

/*==============================================================*/
/* Table: PF_USER_PASSWORD                                      */
/*==============================================================*/
CREATE TABLE PF_USER_PASSWORD
(
  USER_ID   VARCHAR(64) NOT NULL COMMENT '用户ID',
  MODI_TIME INTEGER     NOT NULL COMMENT '密码修改时间',
  PASSWORD  VARCHAR(64) COMMENT '密码',
  USE_FLAG  VARCHAR(64) COMMENT '使用标志 0 历史 1 当前',
  PRIMARY KEY (USER_ID, MODI_TIME)
);

ALTER TABLE PF_USER_PASSWORD
  COMMENT '用户密码表';

/*==============================================================*/
/* Table: PF_USER_PROFILE                                       */
/*==============================================================*/
CREATE TABLE PF_USER_PROFILE
(
  USER_ID     VARCHAR(64) NOT NULL COMMENT '用户ID',
  PARAM_CODE  VARCHAR(64) NOT NULL COMMENT '参数代码',
  PARAM_VALUE VARCHAR(200) COMMENT '参数值',
  PRIMARY KEY (USER_ID, PARAM_CODE)
);

ALTER TABLE PF_USER_PROFILE
  COMMENT '用户参数设置表';

/*==============================================================*/
/* Table: PF_USER_ROLE                                          */
/*==============================================================*/
CREATE TABLE PF_USER_ROLE
(
  USER_ID    VARCHAR(64) NOT NULL COMMENT '用户ID',
  ROLE_ID    VARCHAR(64) NOT NULL COMMENT '角色代码',
  IS_DEFAULT VARCHAR(64) COMMENT '是否默认',
  PRIMARY KEY (USER_ID, ROLE_ID)
);

ALTER TABLE PF_USER_ROLE
  COMMENT '用户角色表';

/*==============================================================*/
/* Table: PF_USER_STATE                                         */
/*==============================================================*/
CREATE TABLE PF_USER_STATE
(
  USER_ID         VARCHAR(64) NOT NULL COMMENT '用户ID',
  ENABLE          VARCHAR(64) COMMENT '是否启用',
  TRY_LOGIN_TIMES INTEGER COMMENT '尝试登录次数',
  LOCKED          VARCHAR(64) COMMENT '是否被锁定',
  LOCKED_TIME     INTEGER COMMENT '锁定时间',
  PRIMARY KEY (USER_ID)
);

ALTER TABLE PF_USER_STATE
  COMMENT '用户状态表';
