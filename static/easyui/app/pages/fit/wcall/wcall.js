require(['page'], function(Page){
	Page.create('fit/wcall/wcall', function($, $c, tab, me){
		var tabpanel = tab.find('.easyui-tabs'),
			queryForm,
			queryGrid,
			querySendForm,
			querySendGrid;
		return {
			_init: function(){
				tabpanel.tabs({
					onLoad: function(panel){
						var qf = tab.find('.easyui-form.query');
						if(!queryForm && qf && qf.length >= 1){
							queryForm = qf;
							queryGrid = tab.find('table.query');
							me.initQueryTab();
							me.bindEvent(qf);
						}
						
						var qfs = tab.find('.easyui-form.query-send');
						if(!querySendForm && qfs && qfs.length >= 1){
							querySendForm = qfs;
							querySendGrid = tab.find('table.query-send');
							me.initQuerySendTab();
							me.bindEvent(qfs);
						}
					}
				});
			},
			initQueryTab: function(){
				queryGrid.datagrid({
					idField : 'key',
					form: queryForm,
					autoLoad: false,
					pagination: false,
					url: $c.getApi('fit.wcalls', 'pays'),
					frozenColumns : [[
						{field : 'key', title : '时间区间', align:'left'}, 	
						{field : 'flistid', title : '基金交易单号', align:'left'},
						{field : 'fpurType', title : '基金交易类型', align:'left'},
						{field : 'ftotalFee', title : '申购金额', align:'right'},
						{field : 'success', title : '成功状态', align:'right'}
					]],
					columns : [ [
						{field : 'income', title : '数据来源', align:'left'},
						{field : 'opName', title : '操作类型', align:'left'},
						{field : 'fspid', title : '商户号', align:'left'},
						{field : 'fcoding', title : '商户订单号', align:'left'}, 	
						{field : 'ftradeId', title : '基金交易账户对应ID', align:'left'},
						{field : 'fuid', title : '财付通内部ID', align:'left'},
						{field : 'ffundName', title : '基金名称', align:'left'},
						{field : 'ffundCode', title : '基金代码', align:'left'},
						{field : 'fbankType', title : '银行类型', align:'left'},
						{field : 'fcardNo', title : '银行卡号', align:'left'}, 	
						{field : 'fstate', title : '状态', align:'left'},
						{field : 'flstate', title : '物理状态', align:'left'},
						{field : 'ffundType', title : '基金类型', align:'left'},
						{field : 'fmodifyTime', title : '最后修改时间', align:'left'},
						{field : 'fchannelId', title : '渠道', align:'right'},
						{field : 'fpayChannel', title : '支付方式', align:'left'}
			        ] ],
			        tools:[
			        	{iconCls: 'icon-reload', handler: me.doQuery}
			        ]
				});
			},
			doQuery: function(){
				queryGrid.datagrid('load');
			},
			initQuerySendTab: function(){
				querySendGrid.datagrid({
					idField : 'openId',
					form: querySendForm,
					autoLoad: false,
					pagination: false,
					url: $c.getApi('fit.wcalls', 'sends'),
					frozenColumns : [[
						{field : 'openId', title : 'OpenID', align:'left'},	
					]],
					columns : [ [
						{field : 'name', title : '姓氏', align:'left'},
						{field : 'sex', title : '性别', align:'left'},
						{field : 'birthday', title : '出生日期', align:'left'},
						{field : 'mobile', title : '移动电话', align:'left'}, 	
						{field : 'purProduct', title : '申购产品', align:'left'},
						{field : 'purAmount', title : '申购金额', align:'right'},
						{field : 'purTime', title : '申购时间', align:'left'},
						{field : 'openDate', title : '开户日期', align:'left'},
						{field : 'purType', title : '申购方式', align:'left'},
						{field : 'memberLevel', title : '会员级别', align:'left'},
						{field : 'city', title : '城市', align:'left'}
			        ] ],
			        tools:[
			        	{iconCls: 'icon-reload', handler: me.doQuerySend}
			        ]
				});
			},
			doQuerySend: function(){
				querySendGrid.datagrid('load');
			}
		};
	});
});