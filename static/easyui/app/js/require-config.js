require.config({
	/**
	 * JS文件主路径
	 */
	baseUrl : $consts.root + '/app/pages',
	paths : {
		/**
		 * 第三方插件
		 */
		'step' : '../../lib/requirejs/plugins/step',
		'css' : '../../lib/requirejs/plugins/css',
		'text' : '../../lib/requirejs/plugins/text',
		'json' : '../../lib/requirejs/plugins/json',
		
		/**
		 * 第三方模块
		 */
        'jquery' : '../../lib/easyui/1.5.5.5/jquery.min',
        'easyui' : '../../lib/easyui/1.5.5.5/jquery.easyui.min',
        'easyui-locale' : '../../lib/easyui/1.5.5.5/locale/easyui-lang-'+$consts.locale,
        'datagrid-dnd' : '../../lib/easyui/1.5.5.5/extension/datagrid-dnd',
        'treegrid-dnd' : '../../lib/easyui/1.5.5.5/extension/treegrid-dnd',
        
        'd3' : '../../lib/d3/d3.min',
        'vue' : '../../lib/vue/vue.min',
        'jsencrypt' : '../../lib/jsencrypt/jsencrypt.min',
        
        /**
         * 第三方样式
         */
        'easyui-icon' : '../../lib/easyui/1.5.5.5/themes/icon',
        'easyui-theme' : '../../lib/easyui/1.5.5.5/themes/'+$consts.theme+'/easyui',
        
        /**
         * 针对第三方库的扩展模块
         */
        'jquery-extend' : '../js/extend/jquery.extend',
        'easyui-extend' : '../js/extend/jquery.easyui.extend',
        
        /**
         * 公共JS
         */
        'icon' : '../js/icon',
        'common' : '../js/common',
        'page' : '../js/page',
        'treepage' : '../js/treepage',
        'rsa'  : '../../lib/jsencrypt/jsencrypt.min',
        'entity' : '../js/entity',
        
        /**
         * 样式
         */
        'css-public': '../css/public',
        'css-icon': '../css/icon',
        'css-icon2': '../css/icon2',
        'css-easyui-override': '../css/easyui-override',
        'font-awesome': '../../lib/font-awesome-4.7.0/css/font-awesome.min.css'
    },
    shim: {
    	'easyui' : {
    		deps: ['jquery', 'css!easyui-theme', 'css!easyui-icon']
    	},
    	'easyui-locale' : {
    		deps: ['easyui']
    	},
    	'common' : {
    		deps: ['css!css-public', 'css!css-icon', 'css!css-icon2', 'css!css-easyui-override']
    	},
    	'css!css-public': {
    		deps: ['css!easyui-theme', 'css!easyui-icon']
    	},
    	'css!css-icon': {
    		deps: ['css!easyui-theme', 'css!easyui-icon']
    	},
    	'css!css-icon2': {
    		deps: ['css!easyui-theme', 'css!easyui-icon']
    	},
    	'css!css-easyui-override': {
    		deps: ['css!easyui-theme', 'css!easyui-icon']
    	}
    }
});