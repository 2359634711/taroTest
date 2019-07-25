"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("./util/api.js");

var _api2 = _interopRequireDefault(_api);

var _global = require("./util/global.js");

var _index3 = require("./store/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./npm/@tarojs/redux/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var store = (0, _index4.default)();
(0, _index5.setStore)(store);

if (_index5.ReduxContext.Provider) {
  _index5.ReduxContext.Provider({
    store: store
  });
  _index5.ReduxContext.Provider({
    store: store
  });
}

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));

    _this.config = {
      pages: ['pages/index/index', 'pages/user/user', 'pages/user/login/login', 'pages/refer/refer', 'pages/order/orderList/orderList'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    return _this;
  }

  _createClass(_App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //测试延时加载
      //监测授权状态
      _index2.default.login({
        success: function success(res) {
          console.log(res);
          //使用code换取openid
          _api2.default.login.getOpenId({ code: res.code }).then(function (res) {
            console.log(res);
            //获取到openid进行storage设置全局openid
            //使用异步因为react native 不支持同步操作
            (0, _global.setGlobal)({
              key: 'openid',
              data: 'sns_wa_' + res.data.data.openid
            });
          });
        }
      });
      (0, _index.getSetting)({
        success: function success(res) {
          if (!res.authSetting['scope.userInfo']) {
            //未登录
            console.log('未授权');
          } else {
            _index2.default.getUserInfo().then(function (res) {
              //如果已经授权，就进行储存storage
              _index2.default.setStorage({
                key: 'userInfo',
                data: res.userInfo
              });
            });
          }
        }
      });
      //设置全局变量至storage缓存 Start
      var baseConfig = {
        navBottom: [{
          url: '/pages/index/index',
          img: '/res/icon/nav-icon-home.png',
          selectedImg: '/res/icon/nav-icon-home-pre.png',
          title: '首页',
          havT: true
        }, {
          url: '/pages/refer/refer',
          img: '/res/icon/tuijian.png',
          selectedImg: '/res/icon/tuijian.png',
          title: '推荐有奖',
          havT: false
        }, {
          url: '/pages/order/orderList/orderList',
          img: '/res/icon/nav-icon-order.png',
          selectedImg: '/res/icon/nav-icon-order-pre.png',
          title: '订单',
          havT: true
        }, {
          url: '/pages/user/user',
          img: '/res/icon/nav-icon-user.png',
          selectedImg: '/res/icon/nav-icon-user-pre.png',
          title: '我的',
          havT: true
        }]
      };
      // 设置navBottom Start
      // 设置navBottom End
      setTimeout(function () {
        (0, _global.setGlobal)({
          key: 'baseConfig',
          data: baseConfig
        });
      }, 5000);
      //设置全局变量至storage缓存 End
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});