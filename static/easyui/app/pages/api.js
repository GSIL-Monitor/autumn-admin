/**
 * Ajax访问的API
 */
var $apis = {
    //'server': 'http://localhost:8080/autumn-admin/',
    'server': '/autumn-web-test/',
    /**
     * 公共请求
     */
    'base.login': 'v1/login', // 登录
    'base.logout': 'v1/logout', // 登出
    'base.rsaKeys': 'v1/rsa-public-key',//获取RSA加密公钥（登录前调用）
    'base.user': 'v1/session-user', //获取和当前会话对应的用户（登录后调用）
    'base.combos': 'v1/combos/{names}',// 从后台参数表中获取下拉选项的数据
    /**
     * 系统导航
     */
    'nav.menus.children': 'v1/navigation/menus/{menuId}/children', // 加载直接子菜单
    'nav.menus.tree': 'v1/navigation/menus/{menuId}/tree', // 加载所有子菜单形成的树型结构
    /**
     * 系统管理
     */
    'system.users.tof': 'v1/tof/staffs/{id}', //从TOF获取用户信息
    'system.users': 'v1/system/users/{id}', //用户管理
    'system.users.roles': 'v1/system/users/roles/{id}', //查询角色用于新增/编辑用户
    'system.users.profiles': 'v1/system/users/profiles/{id}',//用户参数设置
    'system.users.onlines': 'v1/system/log/logins/onlines',//在线用户
    'system.users.states': 'v1/system/users/states/{id}',//用户状态
    'system.roles': 'v1/system/roles/{id}', //角色维护
    'system.roles.perms': 'v1/system/roles/perms/{id}', //查询菜单用于新增/编辑角色
    'system.rolelimits': 'v1/system/rolelimits/{id}',//角色约束维护
    'system.menus.tree': 'v1/system/menus/{id}', // 加载所有子菜单形成的树型结构 // 用于菜单维护
    'system.param.defines': 'v1/system/param/defines/{id}',//参数定义
    'system.param.singles': 'v1/system/param/singles/{id}',//单值参数
    'system.param.enums': 'v1/system/param/enums/{id}',//枚举参数
    'system.param.regions': 'v1/system/param/regions/{id}',//区间枚举参数
    'system.param.trees': 'v1/system/param/trees/{id}',//树型参数
    'system.profiles': 'v1/system/profiles/{id}',//应用设置
    'system.rsakeypairs': 'v1/system/rsakeypairs',//密钥管理
    'system.entitys': 'v1/system/entitys/{id}',//实体
    'system.devops': 'v1/system/devops/{id}',//自助运维
    /**
     * FIT
     */
    'fit.hbases': 'v1/fit/hbases/{id}',
    'fit.tdes': 'v1/fit/tdes/{id}',
    'fit.tssds': 'v1/fit/tssds/{id}',
    'fit.tdbanks': 'v1/fit/tdbanks/{id}',
    'fit.selfstocks': 'v1/fit/selfstocks/{id}',
    'fit.wcalls': 'v1/fit/wcalls/{id}',
    'fit.smart.repos': 'v1/fit/smart/repos/{id}'
};
