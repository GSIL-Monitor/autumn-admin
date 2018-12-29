DROP TABLE PF_APP_ADMIN CASCADE CONSTRAINTS;

DROP TABLE PF_APP_BASE CASCADE CONSTRAINTS;

DROP TABLE PF_APP_DOMAIN CASCADE CONSTRAINTS;

DROP TABLE PF_APP_PROFILE CASCADE CONSTRAINTS;

DROP TABLE PF_APP_RSA_KEY_PAIR CASCADE CONSTRAINTS;

DROP TABLE PF_ENTITY CASCADE CONSTRAINTS;

DROP TABLE PF_ENTITY_PROPERTY CASCADE CONSTRAINTS;

DROP TABLE PF_LOG_LOGIN CASCADE CONSTRAINTS;

DROP TABLE PF_LOG_VISIT CASCADE CONSTRAINTS;

DROP TABLE PF_MENU CASCADE CONSTRAINTS;

DROP TABLE PF_MENU_I18N CASCADE CONSTRAINTS;

DROP TABLE PF_MENU_SHORT CASCADE CONSTRAINTS;

DROP TABLE PF_PARAM_DEF CASCADE CONSTRAINTS;

DROP TABLE PF_PARAM_LIST_ENUM CASCADE CONSTRAINTS;

DROP TABLE PF_PARAM_REGION_ENUM CASCADE CONSTRAINTS;

DROP TABLE PF_PARAM_SINGLE CASCADE CONSTRAINTS;

DROP TABLE PF_PARAM_TREE_ENUM CASCADE CONSTRAINTS;

DROP TABLE PF_PERM CASCADE CONSTRAINTS;

DROP TABLE PF_ROLE CASCADE CONSTRAINTS;

DROP TABLE PF_ROLE_PERM CASCADE CONSTRAINTS;

DROP TABLE PF_USER CASCADE CONSTRAINTS;

DROP TABLE PF_USER_PASSWORD CASCADE CONSTRAINTS;

DROP TABLE PF_USER_PROFILE CASCADE CONSTRAINTS;

DROP TABLE PF_USER_ROLE CASCADE CONSTRAINTS;

DROP TABLE PF_USER_STATE CASCADE CONSTRAINTS;

/*==============================================================*/
/* Table: PF_APP_ADMIN                                          */
/*==============================================================*/
CREATE TABLE PF_APP_ADMIN
(
  APP_ID  VARCHAR2(64) NOT NULL,
  USER_ID VARCHAR2(64) NOT NULL,
  CONSTRAINT PK_PF_APP_ADMIN PRIMARY KEY (APP_ID, USER_ID)
);

COMMENT ON TABLE PF_APP_ADMIN IS
  '应用管理员表';

COMMENT ON COLUMN PF_APP_ADMIN.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_APP_ADMIN.USER_ID IS
  '用户ID';

/*==============================================================*/
/* Table: PF_APP_BASE                                           */
/*==============================================================*/
CREATE TABLE PF_APP_BASE
(
  APP_ID    VARCHAR2(64)  NOT NULL,
  APP_CODE  VARCHAR2(64)  NOT NULL,
  APP_NAME  VARCHAR2(200) NOT NULL,
  APP_TYPE  VARCHAR2(64)  NOT NULL,
  DOMAIN_ID VARCHAR2(64)  NOT NULL,
  SEQNO     INTEGER,
  DES       VARCHAR2(200),
  CONSTRAINT PK_PF_APP_BASE PRIMARY KEY (APP_ID)
);

COMMENT ON TABLE PF_APP_BASE IS
  '应用基本信息表';

COMMENT ON COLUMN PF_APP_BASE.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_APP_BASE.APP_CODE IS
  '应用代码';

COMMENT ON COLUMN PF_APP_BASE.APP_NAME IS
  '应用名称';

COMMENT ON COLUMN PF_APP_BASE.APP_TYPE IS
  '应用类型';

COMMENT ON COLUMN PF_APP_BASE.DOMAIN_ID IS
  '领域ID';

COMMENT ON COLUMN PF_APP_BASE.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_APP_BASE.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_APP_DOMAIN                                         */
/*==============================================================*/
CREATE TABLE PF_APP_DOMAIN
(
  DOMAIN_ID   VARCHAR2(64)  NOT NULL,
  DOMAIN_CODE VARCHAR2(64)  NOT NULL,
  DOMAIN_NAME VARCHAR2(200) NOT NULL,
  SEQNO       INTEGER,
  DES         VARCHAR2(200),
  CONSTRAINT PK_PF_APP_DOMAIN PRIMARY KEY (DOMAIN_ID)
);

COMMENT ON TABLE PF_APP_DOMAIN IS
  '应用领域表';

COMMENT ON COLUMN PF_APP_DOMAIN.DOMAIN_ID IS
  '领域ID';

COMMENT ON COLUMN PF_APP_DOMAIN.DOMAIN_CODE IS
  '领域代码';

COMMENT ON COLUMN PF_APP_DOMAIN.DOMAIN_NAME IS
  '领域名称';

COMMENT ON COLUMN PF_APP_DOMAIN.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_APP_DOMAIN.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_APP_PROFILE                                        */
/*==============================================================*/
CREATE TABLE PF_APP_PROFILE
(
  APP_ID      VARCHAR2(64) NOT NULL,
  PARAM_CODE  VARCHAR2(64) NOT NULL,
  PARAM_VALUE VARCHAR2(200),
  CONSTRAINT PK_PF_APP_PROFILE PRIMARY KEY (APP_ID, PARAM_CODE)
);

COMMENT ON TABLE PF_APP_PROFILE IS
  '应用参数设置表';

COMMENT ON COLUMN PF_APP_PROFILE.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_APP_PROFILE.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_APP_PROFILE.PARAM_VALUE IS
  '参数值';

/*==============================================================*/
/* Table: PF_APP_RSA_KEY_PAIR                                   */
/*==============================================================*/
CREATE TABLE PF_APP_RSA_KEY_PAIR
(
  APP_ID      VARCHAR2(64)   NOT NULL,
  PUBLIC_KEY  VARCHAR2(1024) NOT NULL,
  PRIVATE_KEY VARCHAR2(1024) NOT NULL,
  CONSTRAINT PK_PF_APP_RSA_KEY_PAIR PRIMARY KEY (APP_ID)
);

COMMENT ON TABLE PF_APP_RSA_KEY_PAIR IS
  'RSA秘钥表';

COMMENT ON COLUMN PF_APP_RSA_KEY_PAIR.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_APP_RSA_KEY_PAIR.PUBLIC_KEY IS
  '公钥';

COMMENT ON COLUMN PF_APP_RSA_KEY_PAIR.PRIVATE_KEY IS
  '私钥';

/*==============================================================*/
/* Table: PF_ENTITY                                             */
/*==============================================================*/
CREATE TABLE PF_ENTITY
(
  ENTITY_ID    VARCHAR2(64) NOT NULL,
  ENTITY_NAME  VARCHAR2(200),
  ENTITY_GROUP VARCHAR2(64),
  APP_ID       VARCHAR2(64),
  SEQNO        INTEGER,
  DES          VARCHAR2(200),
  CONSTRAINT PK_PF_ENTITY PRIMARY KEY (ENTITY_ID)
);

COMMENT ON TABLE PF_ENTITY IS
  '实体表';

COMMENT ON COLUMN PF_ENTITY.ENTITY_ID IS
  '实体ID';

COMMENT ON COLUMN PF_ENTITY.ENTITY_NAME IS
  '实体名称';

COMMENT ON COLUMN PF_ENTITY.ENTITY_GROUP IS
  '实体组别';

COMMENT ON COLUMN PF_ENTITY.APP_ID IS
  '应用ID，为null表示所有应用共用，否则为特定应用使用';

COMMENT ON COLUMN PF_ENTITY.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_ENTITY.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_ENTITY_PROPERTY                                    */
/*==============================================================*/
CREATE TABLE PF_ENTITY_PROPERTY
(
  ENTITY_ID      VARCHAR2(64) NOT NULL,
  PROPERTY_CODE  VARCHAR2(64) NOT NULL,
  PROPERTY_VALUE VARCHAR2(200),
  CONSTRAINT PK_PF_ENTITY_PROPERTY PRIMARY KEY (ENTITY_ID, PROPERTY_CODE)
);

COMMENT ON TABLE PF_ENTITY_PROPERTY IS
  '实体属性表';

COMMENT ON COLUMN PF_ENTITY_PROPERTY.ENTITY_ID IS
  '实体ID';

COMMENT ON COLUMN PF_ENTITY_PROPERTY.PROPERTY_CODE IS
  '属性代码';

COMMENT ON COLUMN PF_ENTITY_PROPERTY.PROPERTY_VALUE IS
  '属性值';

/*==============================================================*/
/* Table: PF_LOG_LOGIN                                          */
/*==============================================================*/
CREATE TABLE PF_LOG_LOGIN
(
  SESSION_ID     VARCHAR2(64) NOT NULL,
  USER_ID        VARCHAR2(64),
  LOGIN_DATE     VARCHAR2(64),
  LOGIN_TIME     VARCHAR2(64),
  LOGOUT_DATE    VARCHAR2(64),
  LOGOUT_TIME    VARCHAR2(64),
  CLIENT_DEVICE  VARCHAR2(64),
  CLIENT_IP      VARCHAR2(64),
  CLIENT_BROWSER VARCHAR2(64),
  CLIENT_OS      VARCHAR2(64),
  SERVER_IP      VARCHAR2(64),
  CONSTRAINT PK_PF_LOG_LOGIN PRIMARY KEY (SESSION_ID)
);

COMMENT ON TABLE PF_LOG_LOGIN IS
  '登录日志表';

COMMENT ON COLUMN PF_LOG_LOGIN.SESSION_ID IS
  '登录会话ID';

COMMENT ON COLUMN PF_LOG_LOGIN.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_LOG_LOGIN.LOGIN_DATE IS
  '登录日期';

COMMENT ON COLUMN PF_LOG_LOGIN.LOGIN_TIME IS
  '登录时间';

COMMENT ON COLUMN PF_LOG_LOGIN.LOGOUT_DATE IS
  '登出日期';

COMMENT ON COLUMN PF_LOG_LOGIN.LOGOUT_TIME IS
  '登出时间';

COMMENT ON COLUMN PF_LOG_LOGIN.CLIENT_DEVICE IS
  '客户端设备';

COMMENT ON COLUMN PF_LOG_LOGIN.CLIENT_IP IS
  '客户端IP';

COMMENT ON COLUMN PF_LOG_LOGIN.CLIENT_BROWSER IS
  '客户端浏览器';

COMMENT ON COLUMN PF_LOG_LOGIN.CLIENT_OS IS
  '客户端操作系统';

COMMENT ON COLUMN PF_LOG_LOGIN.SERVER_IP IS
  '服务器IP';

/*==============================================================*/
/* Table: PF_LOG_VISIT                                          */
/*==============================================================*/
CREATE TABLE PF_LOG_VISIT
(
  REQUEST_ID     VARCHAR2(64) NOT NULL,
  SESSION_ID     VARCHAR2(64),
  USER_ID        VARCHAR2(64),
  START_DATE     VARCHAR2(64),
  START_TIME     VARCHAR2(64),
  END_DATE       VARCHAR2(64),
  END_TIME       VARCHAR2(64),
  PERM_ID        VARCHAR2(64),
  METHOD         VARCHAR2(64),
  REQUEST_URL    VARCHAR2(200),
  SERVICE_FLAG   VARCHAR2(64),
  CLIENT_DEVICE  VARCHAR2(64),
  CLIENT_IP      VARCHAR2(64),
  CLIENT_BROWSER VARCHAR2(64),
  CLIENT_OS      VARCHAR2(64),
  SERVER_IP      VARCHAR2(64),
  CONSTRAINT PK_PF_LOG_VISIT PRIMARY KEY (REQUEST_ID)
);

COMMENT ON TABLE PF_LOG_VISIT IS
  '访问日志表';

COMMENT ON COLUMN PF_LOG_VISIT.REQUEST_ID IS
  '请求ID';

COMMENT ON COLUMN PF_LOG_VISIT.SESSION_ID IS
  '会话ID';

COMMENT ON COLUMN PF_LOG_VISIT.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_LOG_VISIT.START_DATE IS
  '开始日期';

COMMENT ON COLUMN PF_LOG_VISIT.START_TIME IS
  '开始时间';

COMMENT ON COLUMN PF_LOG_VISIT.END_DATE IS
  '结束日期';

COMMENT ON COLUMN PF_LOG_VISIT.END_TIME IS
  '结束时间';

COMMENT ON COLUMN PF_LOG_VISIT.PERM_ID IS
  '权限ID';

COMMENT ON COLUMN PF_LOG_VISIT.METHOD IS
  'HTTP方法';

COMMENT ON COLUMN PF_LOG_VISIT.REQUEST_URL IS
  '请求URL';

COMMENT ON COLUMN PF_LOG_VISIT.SERVICE_FLAG IS
  '服务标志';

COMMENT ON COLUMN PF_LOG_VISIT.CLIENT_DEVICE IS
  '客户端设备';

COMMENT ON COLUMN PF_LOG_VISIT.CLIENT_IP IS
  '客户端IP';

COMMENT ON COLUMN PF_LOG_VISIT.CLIENT_BROWSER IS
  '客户端浏览器';

COMMENT ON COLUMN PF_LOG_VISIT.CLIENT_OS IS
  '客户端操作系统';

COMMENT ON COLUMN PF_LOG_VISIT.SERVER_IP IS
  '服务器IP';

/*==============================================================*/
/* Table: PF_MENU                                               */
/*==============================================================*/
CREATE TABLE PF_MENU
(
  MENU_ID        VARCHAR2(64) NOT NULL,
  PARENT_MENU_ID VARCHAR2(64),
  MENU_NAME      VARCHAR2(200),
  MENU_FLAG      VARCHAR2(64),
  ICON           VARCHAR2(200),
  METHOD         VARCHAR2(64),
  URL            VARCHAR2(200),
  SHOW_AREA      VARCHAR2(64),
  SHOW_PAGE_NAME VARCHAR2(64),
  APP_ID         VARCHAR2(64),
  SEQNO          INTEGER,
  DES            VARCHAR2(200),
  CONSTRAINT PK_PF_MENU PRIMARY KEY (MENU_ID)
);

COMMENT ON TABLE PF_MENU IS
  '菜单表';

COMMENT ON COLUMN PF_MENU.MENU_ID IS
  '菜单ID';

COMMENT ON COLUMN PF_MENU.PARENT_MENU_ID IS
  '父菜单ID';

COMMENT ON COLUMN PF_MENU.MENU_NAME IS
  '菜单名称';

COMMENT ON COLUMN PF_MENU.MENU_FLAG IS
  '菜单标志 10 普通菜单 20 有单独tab但不显示为菜单30 独立维护的功能点 40依赖其它节点权限的功能点';

COMMENT ON COLUMN PF_MENU.ICON IS
  '菜单图标';

COMMENT ON COLUMN PF_MENU.METHOD IS
  'HTTP方法';

COMMENT ON COLUMN PF_MENU.URL IS
  '菜单链接';

COMMENT ON COLUMN PF_MENU.SHOW_AREA IS
  '显示区域';

COMMENT ON COLUMN PF_MENU.SHOW_PAGE_NAME IS
  '显示页名称';

COMMENT ON COLUMN PF_MENU.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_MENU.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_MENU.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_MENU_I18N                                          */
/*==============================================================*/
CREATE TABLE PF_MENU_I18N
(
  MENU_ID   VARCHAR2(64) NOT NULL,
  LOCALE    VARCHAR2(64) NOT NULL,
  MENU_NAME VARCHAR2(200),
  MEMO      VARCHAR2(200),
  CONSTRAINT PK_PF_MENU_I18N PRIMARY KEY (MENU_ID, LOCALE)
);

COMMENT ON TABLE PF_MENU_I18N IS
  '菜单国际化表';

COMMENT ON COLUMN PF_MENU_I18N.MENU_ID IS
  '菜单ID';

COMMENT ON COLUMN PF_MENU_I18N.LOCALE IS
  '本地化标识';

COMMENT ON COLUMN PF_MENU_I18N.MENU_NAME IS
  '菜单名称';

COMMENT ON COLUMN PF_MENU_I18N.MEMO IS
  '备注';

/*==============================================================*/
/* Table: PF_MENU_SHORT                                         */
/*==============================================================*/
CREATE TABLE PF_MENU_SHORT
(
  KEY_ID          VARCHAR2(64) NOT NULL,
  PARENT_ID       VARCHAR2(64),
  USER_ID         VARCHAR2(64),
  MENU_ID         VARCHAR2(64),
  SHORT_MENU_NAME VARCHAR2(200),
  ICON            VARCHAR2(200),
  SEQNO           INTEGER,
  DES             VARCHAR2(200),
  CONSTRAINT PK_PF_MENU_SHORT PRIMARY KEY (KEY_ID)
);

COMMENT ON TABLE PF_MENU_SHORT IS
  '快捷菜单表';

COMMENT ON COLUMN PF_MENU_SHORT.KEY_ID IS
  '代理主键';

COMMENT ON COLUMN PF_MENU_SHORT.PARENT_ID IS
  '父ID';

COMMENT ON COLUMN PF_MENU_SHORT.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_MENU_SHORT.MENU_ID IS
  '菜单ID';

COMMENT ON COLUMN PF_MENU_SHORT.SHORT_MENU_NAME IS
  '快捷菜单名称';

COMMENT ON COLUMN PF_MENU_SHORT.ICON IS
  '快捷菜单图标';

COMMENT ON COLUMN PF_MENU_SHORT.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_MENU_SHORT.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_PARAM_DEF                                          */
/*==============================================================*/
CREATE TABLE PF_PARAM_DEF
(
  PARAM_CODE  VARCHAR2(64)  NOT NULL,
  PARAM_NAME  VARCHAR2(200) NOT NULL,
  PARAM_GROUP VARCHAR2(64)  NOT NULL,
  PARAM_TYPE  VARCHAR2(64)  NOT NULL,
  EDITABLE    VARCHAR2(64),
  VERSION     INTEGER,
  USE_FLAG    VARCHAR2(64),
  SEQNO       INTEGER,
  DES         VARCHAR2(200),
  CONSTRAINT PK_PF_PARAM_DEF PRIMARY KEY (PARAM_CODE)
);

COMMENT ON TABLE PF_PARAM_DEF IS
  '参数定义表';

COMMENT ON COLUMN PF_PARAM_DEF.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_PARAM_DEF.PARAM_NAME IS
  '参数名称';

COMMENT ON COLUMN PF_PARAM_DEF.PARAM_GROUP IS
  '参数组别';

COMMENT ON COLUMN PF_PARAM_DEF.PARAM_TYPE IS
  '参数类型 SINGLE单值参数、LIST列表型枚举参数、REGION区间型枚举参数、TREE树型枚举参数';

COMMENT ON COLUMN PF_PARAM_DEF.EDITABLE IS
  '是否可编辑';

COMMENT ON COLUMN PF_PARAM_DEF.VERSION IS
  '参数版本';

COMMENT ON COLUMN PF_PARAM_DEF.USE_FLAG IS
  '使用标志 0 历史 1 当前';

COMMENT ON COLUMN PF_PARAM_DEF.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_PARAM_DEF.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_PARAM_LIST_ENUM                                    */
/*==============================================================*/
CREATE TABLE PF_PARAM_LIST_ENUM
(
  PARAM_CODE VARCHAR2(64) NOT NULL,
  ITEM_CODE  VARCHAR2(64) NOT NULL,
  ITEM_TEXT  VARCHAR2(200),
  ITEM_PARAM VARCHAR2(200),
  SEQNO      INTEGER,
  DES        VARCHAR2(200),
  CONSTRAINT PK_PF_PARAM_LIST_ENUM PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

COMMENT ON TABLE PF_PARAM_LIST_ENUM IS
  '列表型枚举参数定义表';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.ITEM_CODE IS
  '项代码';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.ITEM_TEXT IS
  '项文本';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.ITEM_PARAM IS
  '项参数';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_PARAM_LIST_ENUM.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_PARAM_REGION_ENUM                                  */
/*==============================================================*/
CREATE TABLE PF_PARAM_REGION_ENUM
(
  PARAM_CODE  VARCHAR2(64) NOT NULL,
  ITEM_CODE   VARCHAR2(64) NOT NULL,
  ITEM_TEXT   VARCHAR2(200),
  ITEM_PARAM  VARCHAR2(200),
  LEFT_SIGN   VARCHAR2(64),
  LEFT_VALUE  NUMBER,
  RIGHT_SIGN  VARCHAR2(64),
  RIGHT_VALUE NUMBER,
  SEQNO       INTEGER,
  DES         VARCHAR2(200),
  CONSTRAINT PK_PF_PARAM_REGION_ENUM PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

COMMENT ON TABLE PF_PARAM_REGION_ENUM IS
  '区间型枚举参数定义表';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.ITEM_CODE IS
  '项代码';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.ITEM_TEXT IS
  '项文本';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.ITEM_PARAM IS
  '项参数';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.LEFT_SIGN IS
  '左区间标志';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.LEFT_VALUE IS
  '左区间值';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.RIGHT_SIGN IS
  '右区间标志';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.RIGHT_VALUE IS
  '右区间值';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_PARAM_REGION_ENUM.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_PARAM_SINGLE                                       */
/*==============================================================*/
CREATE TABLE PF_PARAM_SINGLE
(
  PARAM_CODE       VARCHAR2(64)  NOT NULL,
  STORE_TYPE       VARCHAR2(64)  NOT NULL,
  DATA_TYPE        VARCHAR2(64)  NOT NULL,
  DEFAULT_VALUE    VARCHAR2(200) NOT NULL,
  VALUE_RULE       VARCHAR2(64),
  VALUE_RULE_PARAM VARCHAR2(200),
  ALLOW_EMPTY      VARCHAR2(64),
  MIN_LENGTH       INTEGER,
  MAX_LENGTH       INTEGER,
  CONSTRAINT PK_PF_PARAM_SINGLE PRIMARY KEY (PARAM_CODE)
);

COMMENT ON TABLE PF_PARAM_SINGLE IS
  '单值参数定义表';

COMMENT ON COLUMN PF_PARAM_SINGLE.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_PARAM_SINGLE.STORE_TYPE IS
  '存储类型';

COMMENT ON COLUMN PF_PARAM_SINGLE.DATA_TYPE IS
  '数据类型';

COMMENT ON COLUMN PF_PARAM_SINGLE.DEFAULT_VALUE IS
  '默认值';

COMMENT ON COLUMN PF_PARAM_SINGLE.VALUE_RULE IS
  '取值规则';

COMMENT ON COLUMN PF_PARAM_SINGLE.VALUE_RULE_PARAM IS
  '取值规则参数';

COMMENT ON COLUMN PF_PARAM_SINGLE.ALLOW_EMPTY IS
  '是否允许为空';

COMMENT ON COLUMN PF_PARAM_SINGLE.MIN_LENGTH IS
  '最小长度';

COMMENT ON COLUMN PF_PARAM_SINGLE.MAX_LENGTH IS
  '最大长度';

/*==============================================================*/
/* Table: PF_PARAM_TREE_ENUM                                    */
/*==============================================================*/
CREATE TABLE PF_PARAM_TREE_ENUM
(
  PARAM_CODE       VARCHAR2(64) NOT NULL,
  ITEM_CODE        VARCHAR2(64) NOT NULL,
  ITEM_TEXT        VARCHAR2(200),
  PARENT_ITEM_CODE VARCHAR2(64),
  ITEM_ICON        VARCHAR2(200),
  ITEM_URL         VARCHAR2(200),
  ITEM_PARAM       VARCHAR2(200),
  SEQNO            INTEGER,
  DES              VARCHAR2(200),
  CONSTRAINT PK_PF_PARAM_TREE_ENUM PRIMARY KEY (PARAM_CODE, ITEM_CODE)
);

COMMENT ON TABLE PF_PARAM_TREE_ENUM IS
  '树型枚举参数定义表';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.ITEM_CODE IS
  '项代码';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.ITEM_TEXT IS
  '项文本';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.PARENT_ITEM_CODE IS
  '父项代码';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.ITEM_ICON IS
  '图标';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.ITEM_URL IS
  'URL';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.ITEM_PARAM IS
  '项参数';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.SEQNO IS
  '序号';

COMMENT ON COLUMN PF_PARAM_TREE_ENUM.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_PERM                                               */
/*==============================================================*/
CREATE TABLE PF_PERM
(
  PERM_ID       VARCHAR2(64) NOT NULL,
  BUSINESS_KEY  VARCHAR2(64),
  PERM_TYPE     VARCHAR2(64),
  PERM_TYPE_KEY VARCHAR2(64),
  AUTHZ_LEVEL   INTEGER,
  APP_ID        VARCHAR2(64),
  CONSTRAINT PK_PF_PERM PRIMARY KEY (PERM_ID)
);

COMMENT ON TABLE PF_PERM IS
  '权限表';

COMMENT ON COLUMN PF_PERM.PERM_ID IS
  '权限ID';

COMMENT ON COLUMN PF_PERM.BUSINESS_KEY IS
  '业务键值';

COMMENT ON COLUMN PF_PERM.PERM_TYPE IS
  '权限类型 MENU表示菜单';

COMMENT ON COLUMN PF_PERM.PERM_TYPE_KEY IS
  '权限类型键值，如菜单ID';

COMMENT ON COLUMN PF_PERM.AUTHZ_LEVEL IS
  '授权级别 0 游客级别 1 会话级别 2 授权级别';

COMMENT ON COLUMN PF_PERM.APP_ID IS
  '应用ID';

/*==============================================================*/
/* Table: PF_ROLE                                               */
/*==============================================================*/
CREATE TABLE PF_ROLE
(
  ROLE_ID   VARCHAR2(64) NOT NULL,
  ROLE_NAME VARCHAR2(200),
  APP_ID    VARCHAR2(64),
  DES       VARCHAR2(200),
  CONSTRAINT PK_PF_ROLE PRIMARY KEY (ROLE_ID)
);

COMMENT ON TABLE PF_ROLE IS
  '角色表';

COMMENT ON COLUMN PF_ROLE.ROLE_ID IS
  '角色代码';

COMMENT ON COLUMN PF_ROLE.ROLE_NAME IS
  '角色名称';

COMMENT ON COLUMN PF_ROLE.APP_ID IS
  '应用ID';

COMMENT ON COLUMN PF_ROLE.DES IS
  '备注';

/*==============================================================*/
/* Table: PF_ROLE_PERM                                          */
/*==============================================================*/
CREATE TABLE PF_ROLE_PERM
(
  ROLE_ID    VARCHAR2(64) NOT NULL,
  PERM_ID    VARCHAR2(64) NOT NULL,
  DATA_LEVEL INTEGER,
  CONSTRAINT PK_PF_ROLE_PERM PRIMARY KEY (ROLE_ID, PERM_ID)
);

COMMENT ON TABLE PF_ROLE_PERM IS
  '角色权限表';

COMMENT ON COLUMN PF_ROLE_PERM.ROLE_ID IS
  '角色代码';

COMMENT ON COLUMN PF_ROLE_PERM.PERM_ID IS
  '权限ID';

COMMENT ON COLUMN PF_ROLE_PERM.DATA_LEVEL IS
  '数据级别';

/*==============================================================*/
/* Table: PF_USER                                               */
/*==============================================================*/
CREATE TABLE PF_USER
(
  USER_ID       VARCHAR2(64) NOT NULL,
  USER_NAME     VARCHAR2(20) NOT NULL,
  SHOW_NAME     VARCHAR2(64),
  ORG_ID        VARCHAR2(64),
  IDENTITY_TYPE VARCHAR2(2),
  IDENTITY_ID   VARCHAR2(64),
  MOBILE        VARCHAR2(64),
  EMAIL         VARCHAR2(64),
  APP_ID        VARCHAR2(64) NOT NULL,
  CONSTRAINT PK_PF_USER PRIMARY KEY (USER_ID)
);

COMMENT ON TABLE PF_USER IS
  '用户表';

COMMENT ON COLUMN PF_USER.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_USER.USER_NAME IS
  '用户英文名';

COMMENT ON COLUMN PF_USER.SHOW_NAME IS
  '用户中文名';

COMMENT ON COLUMN PF_USER.ORG_ID IS
  '机构ID';

COMMENT ON COLUMN PF_USER.IDENTITY_TYPE IS
  '证件类型';

COMMENT ON COLUMN PF_USER.IDENTITY_ID IS
  '证件号码';

COMMENT ON COLUMN PF_USER.MOBILE IS
  '电话';

COMMENT ON COLUMN PF_USER.EMAIL IS
  '邮箱';

COMMENT ON COLUMN PF_USER.APP_ID IS
  '应用ID';

/*==============================================================*/
/* Table: PF_USER_PASSWORD                                      */
/*==============================================================*/
CREATE TABLE PF_USER_PASSWORD
(
  USER_ID   VARCHAR2(64) NOT NULL,
  MODI_TIME INTEGER      NOT NULL,
  PASSWORD  VARCHAR2(64),
  USE_FLAG  VARCHAR2(64),
  CONSTRAINT PK_PF_USER_PASSWORD PRIMARY KEY (USER_ID, MODI_TIME)
);

COMMENT ON TABLE PF_USER_PASSWORD IS
  '用户密码表';

COMMENT ON COLUMN PF_USER_PASSWORD.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_USER_PASSWORD.MODI_TIME IS
  '密码修改时间';

COMMENT ON COLUMN PF_USER_PASSWORD.PASSWORD IS
  '密码';

COMMENT ON COLUMN PF_USER_PASSWORD.USE_FLAG IS
  '使用标志 0 历史 1 当前';

/*==============================================================*/
/* Table: PF_USER_PROFILE                                       */
/*==============================================================*/
CREATE TABLE PF_USER_PROFILE
(
  USER_ID     VARCHAR2(64) NOT NULL,
  PARAM_CODE  VARCHAR2(64) NOT NULL,
  PARAM_VALUE VARCHAR2(200),
  CONSTRAINT PK_PF_USER_PROFILE PRIMARY KEY (USER_ID, PARAM_CODE)
);

COMMENT ON TABLE PF_USER_PROFILE IS
  '用户参数设置表';

COMMENT ON COLUMN PF_USER_PROFILE.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_USER_PROFILE.PARAM_CODE IS
  '参数代码';

COMMENT ON COLUMN PF_USER_PROFILE.PARAM_VALUE IS
  '参数值';

/*==============================================================*/
/* Table: PF_USER_ROLE                                          */
/*==============================================================*/
CREATE TABLE PF_USER_ROLE
(
  USER_ID    VARCHAR2(64) NOT NULL,
  ROLE_ID    VARCHAR2(64) NOT NULL,
  IS_DEFAULT VARCHAR2(64),
  CONSTRAINT PK_PF_USER_ROLE PRIMARY KEY (USER_ID, ROLE_ID)
);

COMMENT ON TABLE PF_USER_ROLE IS
  '用户角色表';

COMMENT ON COLUMN PF_USER_ROLE.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_USER_ROLE.ROLE_ID IS
  '角色代码';

COMMENT ON COLUMN PF_USER_ROLE.IS_DEFAULT IS
  '是否默认';

/*==============================================================*/
/* Table: PF_USER_STATE                                         */
/*==============================================================*/
CREATE TABLE PF_USER_STATE
(
  USER_ID         VARCHAR2(64) NOT NULL,
  ENABLE          VARCHAR2(64),
  TRY_LOGIN_TIMES INTEGER,
  LOCKED          VARCHAR2(64),
  LOCKED_TIME     INTEGER,
  CONSTRAINT PK_PF_USER_STATE PRIMARY KEY (USER_ID)
);

COMMENT ON TABLE PF_USER_STATE IS
  '用户状态表';

COMMENT ON COLUMN PF_USER_STATE.USER_ID IS
  '用户ID';

COMMENT ON COLUMN PF_USER_STATE.ENABLE IS
  '是否启用';

COMMENT ON COLUMN PF_USER_STATE.TRY_LOGIN_TIMES IS
  '尝试登录次数';

COMMENT ON COLUMN PF_USER_STATE.LOCKED IS
  '是否被锁定';

COMMENT ON COLUMN PF_USER_STATE.LOCKED_TIME IS
  '锁定时间';
