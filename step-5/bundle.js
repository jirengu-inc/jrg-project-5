/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _leancloudStorage = __webpack_require__(3);

	var _leancloudStorage2 = _interopRequireDefault(_leancloudStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var APP_ID = '8axnRtGoxCJhEzsvNPEAHnol-gzGzoHsz';
	var APP_KEY = '0YH4XkYflb4CUPfA743TGj8G';
	_leancloudStorage2.default.init({
	  appId: APP_ID,
	  appKey: APP_KEY
	});

	var app = new _vue2.default({
	  el: '#app',
	  data: {
	    actionType: 'signUp',
	    formData: {
	      username: '',
	      password: ''
	    },
	    newTodo: '',
	    todoList: [],
	    currentUser: null
	  },
	  created: function created() {
	    var _this = this;

	    // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
	    window.onbeforeunload = function () {
	      var dataString = JSON.stringify(_this.todoList); // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON

	      var AVTodos = _leancloudStorage2.default.Object.extend('AllTodos');
	      var avTodos = new AVTodos();
	      avTodos.set('content', dataString);
	      avTodos.save().then(function (todo) {
	        // 成功保存之后，执行其他逻辑.
	        console.log('保存成功');
	      }, function (error) {
	        // 异常处理
	        console.error('保存失败');
	      });
	    };

	    // 从 LeanCloud 读取 todos 的逻辑先不写
	    //let oldDataString = window.localStorage.getItem('myTodos')
	    //let oldData = JSON.parse(oldDataString)
	    //this.todoList = oldData || []

	    this.currentUser = this.getCurrentUser();
	  },
	  methods: {
	    addTodo: function addTodo() {
	      this.todoList.push({
	        title: this.newTodo,
	        createdAt: new Date(),
	        done: false // 添加一个 done 属性
	      });
	      this.newTodo = '';
	    },
	    removeTodo: function removeTodo(todo) {
	      var index = this.todoList.indexOf(todo); // Array.prototype.indexOf 是 ES 5 新加的 API
	      this.todoList.splice(index, 1); // 不懂 splice？赶紧看 MDN 文档！
	    },
	    signUp: function signUp() {
	      var _this2 = this;

	      var user = new _leancloudStorage2.default.User();
	      user.setUsername(this.formData.username);
	      user.setPassword(this.formData.password);
	      user.signUp().then(function (loginedUser) {
	        _this2.currentUser = _this2.getCurrentUser();
	      }, function (error) {
	        alert('注册失败');
	      });
	    },
	    login: function login() {
	      var _this3 = this;

	      _leancloudStorage2.default.User.logIn(this.formData.username, this.formData.password).then(function (loginedUser) {
	        _this3.currentUser = _this3.getCurrentUser();
	      }, function (error) {
	        alert('登录失败');
	      });
	    },
	    getCurrentUser: function getCurrentUser() {
	      var current = _leancloudStorage2.default.User.current();
	      if (current) {
	        var id = current.id,
	            createdAt = current.createdAt,
	            username = current.attributes.username;
	        // 上面这句话看不懂就得看 MDN 文档了
	        // 我的《ES 6 新特性列表》里面有链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

	        return { id: id, username: username, createdAt: createdAt }; // 看文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
	      } else {
	        return null;
	      }
	    },
	    logout: function logout() {
	      _leancloudStorage2.default.User.logOut();
	      this.currentUser = null;
	      window.location.reload();
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * Vue.js v2.1.8
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    return JSON.stringify(a) === JSON.stringify(b)
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var formatComponentName;

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1 (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set$1(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = process.env.NODE_ENV !== 'production'
	    ? expOrFn.toString()
	    : '';
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            process.env.NODE_ENV !== 'production' && warn(
	              ("Error in watcher \"" + (this.expression) + "\""),
	              this.vm
	            );
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm, props) {
	  var propsData = vm.$options.propsData || {};
	  var keys = vm.$options._propKeys = Object.keys(props);
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( i ) {
	    var key = keys[i];
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    } else {
	      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
	    }
	  };

	  for (var i = 0; i < keys.length; i++) loop( i );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm, computed) {
	  for (var key in computed) {
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && key in vm) {
	      warn(
	        "existing instance property \"" + key + "\" will be " +
	        "overwritten by a computed property with the same name.",
	        vm
	      );
	    }
	    var userDef = computed[key];
	    if (typeof userDef === 'function') {
	      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	      computedSharedDefinition.set = noop;
	    } else {
	      computedSharedDefinition.get = userDef.get
	        ? userDef.cache !== false
	          ? makeComputedGetter(userDef.get, vm)
	          : bind$1(userDef.get, vm)
	        : noop;
	      computedSharedDefinition.set = userDef.set
	        ? bind$1(userDef.set, vm)
	        : noop;
	    }
	    Object.defineProperty(vm, key, computedSharedDefinition);
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm, methods) {
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	    if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
	      warn(
	        "method \"" + key + "\" has an undefined value in the component definition. " +
	        "Did you reference the function correctly?",
	        vm
	      );
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set$1;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture, once;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), once, capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, once, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      remove$$1(event, oldOn[name].invoker, capture);
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// nomralization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constrcuts that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add$1 (event, fn, once) {
	  if (once) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$2 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    // optimize hook:event cost by using a boolean flag marked at registration
	    // instead of a hash lookup
	    if (hookRE.test(event)) {
	      vm._hasHookEvent = true;
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      if (process.env.NODE_ENV !== 'production') {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      updateComponentListeners(vm, listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = {};
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (_parentVnode && _parentVnode.data.scopedSlots) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots;
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	        }
	        throw e
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // convert text to vnode
	  Vue.prototype._v = createTextVNode;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = createEmptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val) || typeof val === 'string') {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback,
	    props,
	    bindObject
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) { // scoped slot
	      props = props || {};
	      if (bindObject) {
	        extend(props, bindObject);
	      }
	      return scopedSlotFn(props) || fallback
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && process.env.NODE_ENV !== 'production') {
	        slotNodes._rendered && warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback
	    }
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(tag, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // check v-on keyCodes
	  Vue.prototype._k = function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInAlias
	  ) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  };
	}

	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      extendOptions._scopeId = options._scopeId;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else {
	    return pattern.test(name)
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      // check pattern
	      var name = opts.Ctor.options.name || opts.tag;
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + (opts.tag ? ("::" + (opts.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set$1;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.1.8';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.child) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.child) {
	      innerNode = innerNode.child._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.child = oldVnode.child;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);
	        createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parent !== null) {
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var target$1;

	function add$2 (event, handler, once, capture) {
	  if (once) {
	    var oldHandler = handler;
	    handler = function (ev) {
	      remove$3(event, handler, capture);
	      arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}

	function remove$3 (event, handler, capture) {
	  target$1.removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	    // #4521: if a click event triggers update before the change event is
	    // dispatched on a checkbox/radio input, the input's checked state will
	    // be reset and fail to trigger another update.
	    /* istanbul ignore next */
	    if (key === 'checked' && !isDirty(elm, cur)) {
	      continue
	    }
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  if (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(vnode, checkVal)
	  )) {
	    return true
	  }
	  return false
	}

	function isDirty (elm, checkVal) {
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (vnode, newVal) {
	  var value = vnode.elm.value;
	  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.child) {
	      childNode = childNode.child._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var toClass = isAppear ? appearToClass : enterToClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.context === vnode.context &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    leaveToClass: (name + "-leave-to"),
	    appearToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	if (process.env.NODE_ENV !== 'production' &&
	    inBrowser && typeof console !== 'undefined') {
	  console[console.info ? 'info' : 'log'](
	    "You are running Vue in development mode.\n" +
	    "Make sure to turn on production mode when deploying for production.\n" +
	    "See more tips at https://vuejs.org/guide/deployment.html"
	  );
	}

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      process.env.NODE_ENV !== 'production' &&
	      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
	var isSpecialTag = function (tag, isSFC, stack) {
	  if (isScriptOrStyle(tag)) {
	    return true
	  }
	  if (isSFC && stack.length === 1) {
	    // top-level template that has no pre-processor
	    if (tag === 'template' && !stack[0].attrs.some(hasLang)) {
	      return false
	    } else {
	      return true
	    }
	  }
	  return false
	};

	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !/[\w$]/.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        process.env.NODE_ENV !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if (process.env.NODE_ENV !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if (process.env.NODE_ENV !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            "Component template should contain exactly one root element:" +
	            "\n\n" + template + "\n\n" +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || children[children.length - 1].text !== ' ') {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      process.env.NODE_ENV !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn$1(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
	        warn$1(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if (process.env.NODE_ENV !== 'production' && el.key) {
	      warn$1(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if (process.env.NODE_ENV !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      if (process.env.NODE_ENV !== 'production') {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	      // #4530 also bind special attributes as props even if they are static
	      // so that patches between dynamic/static are consistent
	      if (platformMustUseProp(el.tag, name)) {
	        if (name === 'value') {
	          addProp(el, name, JSON.stringify(value));
	        } else {
	          addProp(el, name, 'true');
	        }
	      }
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;',
	  ctrl: 'if(!$event.ctrlKey)return;',
	  shift: 'if(!$event.shiftKey)return;',
	  alt: 'if(!$event.altKey)return;',
	  meta: 'if(!$event.metaKey)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	/*  */

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      process.env.NODE_ENV !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if (process.env.NODE_ENV !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$2('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
	}

	function genScopedSlot (key, el) {
	  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = getNormalizationType(children);
	    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
	        ? normalizationType ? ("," + normalizationType) : ''
	        : ''))
	  }
	}

	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (needsNormalization(el) ||
	        (el.if && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.if && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}

	function needsNormalization (el) {
	  return el.for || el.tag === 'template' || el.tag === 'slot'
	}

	function maybeComponent (el) {
	  return el.type === 1 && !isPlatformReservedTag$1(el.tag)
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if (process.env.NODE_ENV !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production') {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  if (process.env.NODE_ENV !== 'production') {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;

	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if (process.env.NODE_ENV !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }

	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	module.exports = Vue$3;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer) {(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["AV"] = factory();
		else
			root["AV"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// identity function for calling harmony imports with the correct context
	/******/ 	__webpack_require__.i = function(value) { return value; };
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 50);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var request = __webpack_require__(6);
	var debug = __webpack_require__(7)('leancloud:request');
	var md5 = __webpack_require__(43);
	var Promise = __webpack_require__(2);
	var Cache = __webpack_require__(10);
	var AVError = __webpack_require__(3);
	var AV = __webpack_require__(4);
	var _ = __webpack_require__(0);

	var _require = __webpack_require__(5),
	    getSessionToken = _require.getSessionToken;

	var getServerURLPromise = void 0;

	// 服务器请求的节点 host
	var API_HOST = {
	  cn: 'https://api.leancloud.cn',
	  us: 'https://us-api.leancloud.cn'
	};

	// 计算 X-LC-Sign 的签名方法
	var sign = function sign(key, isMasterKey) {
	  var now = new Date().getTime();
	  var signature = md5(now + key);
	  if (isMasterKey) {
	    return signature + ',' + now + ',master';
	  }
	  return signature + ',' + now;
	};

	var checkRouter = function checkRouter(router) {
	  var routerList = ['batch', 'classes', 'files', 'date', 'functions', 'call', 'login', 'push', 'search/select', 'requestPasswordReset', 'requestEmailVerify', 'requestPasswordResetBySmsCode', 'resetPasswordBySmsCode', 'requestMobilePhoneVerify', 'requestLoginSmsCode', 'verifyMobilePhone', 'requestSmsCode', 'verifySmsCode', 'users', 'usersByMobilePhone', 'cloudQuery', 'qiniu', 'fileTokens', 'statuses', 'bigquery', 'search/select', 'subscribe/statuses/count', 'subscribe/statuses', 'installations'];

	  if (routerList.indexOf(router) === -1 && !/users\/[^\/]+\/updatePassword/.test(router) && !/users\/[^\/]+\/friendship\/[^\/]+/.test(router)) {
	    throw new Error('Bad router: ' + router + '.');
	  }
	};

	var requestsCount = 0;

	var ajax = function ajax(method, resourceUrl, data) {
	  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var onprogress = arguments[4];

	  var count = requestsCount++;

	  debug('request(' + count + ')', method, resourceUrl, data, headers);

	  return new Promise(function (resolve, reject) {
	    var req = request(method, resourceUrl).set(headers).send(data);
	    if (onprogress) {
	      req.on('progress', onprogress);
	    }
	    req.end(function (err, res) {
	      if (res) {
	        debug('response(' + count + ')', res.status, res.body || res.text, res.header);
	      }
	      if (err) {
	        if (res) {
	          err.statusCode = res.status;
	          err.responseText = res.text;
	          err.response = res.body;
	        }
	        return reject(err);
	      }
	      return resolve(res.body);
	    });
	  });
	};

	var setAppId = function setAppId(headers, signKey) {
	  if (signKey) {
	    headers['X-LC-Sign'] = sign(AV.applicationKey);
	  } else {
	    headers['X-LC-Key'] = AV.applicationKey;
	  }
	};

	var setHeaders = function setHeaders() {
	  var authOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var signKey = arguments[1];

	  var headers = {
	    'X-LC-Id': AV.applicationId,
	    'Content-Type': 'application/json;charset=UTF-8'
	  };
	  var useMasterKey = false;
	  if (typeof authOptions.useMasterKey === 'boolean') {
	    useMasterKey = authOptions.useMasterKey;
	  } else if (typeof AV._useMasterKey === 'boolean') {
	    useMasterKey = AV._useMasterKey;
	  }
	  if (useMasterKey) {
	    if (AV.masterKey) {
	      if (signKey) {
	        headers['X-LC-Sign'] = sign(AV.masterKey, true);
	      } else {
	        headers['X-LC-Key'] = AV.masterKey + ',master';
	      }
	    } else {
	      console.warn('masterKey is not set, fall back to use appKey');
	      setAppId(headers, signKey);
	    }
	  } else {
	    setAppId(headers, signKey);
	  }
	  if (AV.hookKey) {
	    headers['X-LC-Hook-Key'] = AV.hookKey;
	  }
	  if (AV._config.applicationProduction !== null) {
	    headers['X-LC-Prod'] = String(AV._config.applicationProduction);
	  }
	  headers[ false ? 'User-Agent' : 'X-LC-UA'] = AV._config.userAgent;

	  return Promise.resolve().then(function () {
	    // Pass the session token
	    var sessionToken = getSessionToken(authOptions);
	    if (sessionToken) {
	      headers['X-LC-Session'] = sessionToken;
	    } else if (!AV._config.disableCurrentUser) {
	      return AV.User.currentAsync().then(function (currentUser) {
	        if (currentUser && currentUser._sessionToken) {
	          headers['X-LC-Session'] = currentUser._sessionToken;
	        }
	        return headers;
	      });
	    }
	    return headers;
	  });
	};

	var createApiUrl = function createApiUrl(route, className, objectId, method, dataObject) {
	  // TODO: 兼容 AV.serverURL 旧方式设置 API Host，后续去掉
	  if (AV.serverURL) {
	    AV._config.APIServerURL = AV.serverURL;
	    console.warn('Please use AV._config.APIServerURL to replace AV.serverURL, and it is an internal interface.');
	  }

	  var apiURL = AV._config.APIServerURL || API_HOST.cn;

	  if (apiURL.charAt(apiURL.length - 1) !== '/') {
	    apiURL += '/';
	  }
	  apiURL += '1.1/' + route;
	  if (className) {
	    apiURL += '/' + className;
	  }
	  if (objectId) {
	    apiURL += '/' + objectId;
	  }
	  if ((route === 'users' || route === 'classes') && dataObject) {
	    apiURL += '?';
	    if (dataObject._fetchWhenSave) {
	      delete dataObject._fetchWhenSave;
	      apiURL += '&new=true';
	    }
	    if (dataObject._where) {
	      apiURL += '&where=' + encodeURIComponent(JSON.stringify(dataObject._where));
	      delete dataObject._where;
	    }
	  }

	  if (method.toLowerCase() === 'get') {
	    if (apiURL.indexOf('?') === -1) {
	      apiURL += '?';
	    }
	    for (var k in dataObject) {
	      if (_typeof(dataObject[k]) === 'object') {
	        dataObject[k] = JSON.stringify(dataObject[k]);
	      }
	      apiURL += '&' + k + '=' + encodeURIComponent(dataObject[k]);
	    }
	  }

	  return apiURL;
	};

	var cacheServerURL = function cacheServerURL(serverURL, ttl) {
	  if (typeof ttl !== 'number') {
	    ttl = 3600;
	  }
	  return Cache.setAsync('APIServerURL', serverURL, ttl * 1000);
	};

	// handle AV._request Error
	var handleError = function handleError(error) {
	  return new Promise(function (resolve, reject) {
	    /**
	      When API request need to redirect to the right location,
	      can't use browser redirect by http status 307, as the reason of CORS,
	      so API server response http status 410 and the param "location" for this case.
	    */
	    if (error.statusCode === 410) {
	      cacheServerURL(error.response.api_server, error.response.ttl).then(function () {
	        resolve(error.response.location);
	      }).catch(reject);
	    } else {
	      var errorJSON = {
	        code: error.code || -1,
	        error: error.message || error.responseText
	      };
	      if (error.response && error.response.code) {
	        errorJSON = error.response;
	      } else if (error.responseText) {
	        try {
	          errorJSON = JSON.parse(error.responseText);
	        } catch (e) {
	          // If we fail to parse the error text, that's okay.
	        }
	      }

	      // Transform the error into an instance of AVError by trying to parse
	      // the error string as JSON.
	      reject(new AVError(errorJSON.code, errorJSON.error));
	    }
	  });
	};

	var setServerUrl = function setServerUrl(serverURL) {
	  AV._config.APIServerURL = 'https://' + serverURL;

	  // 根据新 URL 重新设置区域
	  var newRegion = _.findKey(API_HOST, function (item) {
	    return item === AV._config.APIServerURL;
	  });
	  if (newRegion) {
	    AV._config.region = newRegion;
	  }
	};

	var refreshServerUrlByRouter = function refreshServerUrlByRouter() {
	  var url = 'https://app-router.leancloud.cn/1/route?appId=' + AV.applicationId;
	  return ajax('get', url).then(function (servers) {
	    if (servers.api_server) {
	      setServerUrl(servers.api_server);
	      return cacheServerURL(servers.api_server, servers.ttl);
	    }
	  }, function (error) {
	    // bypass all non-4XX errors
	    if (error.statusCode >= 400 && error.statusCode < 500) {
	      throw error;
	    }
	  });
	};

	var setServerUrlByRegion = function setServerUrlByRegion() {
	  var region = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cn';

	  getServerURLPromise = new Promise(function (resolve, reject) {
	    // 如果用户在 init 之前设置了 APIServerURL，则跳过请求 router
	    if (AV._config.APIServerURL) {
	      resolve();
	      return;
	    }
	    // if not china server region, do not use router
	    if (region === 'cn') {
	      return Cache.getAsync('APIServerURL').then(function (serverURL) {
	        if (serverURL) {
	          setServerUrl(serverURL);
	        } else {
	          return refreshServerUrlByRouter();
	        }
	      }).then(function () {
	        resolve();
	      }).catch(function (error) {
	        reject(error);
	      });
	    } else {
	      AV._config.region = region;
	      AV._config.APIServerURL = API_HOST[region];
	      resolve();
	    }
	  });
	};

	/**
	 * route is classes, users, login, etc.
	 * objectId is null if there is no associated objectId.
	 * method is the http method for the REST API.
	 * dataObject is the payload as an object, or null if there is none.
	 * @ignore
	 */
	var AVRequest = function AVRequest(route, className, objectId, method) {
	  var dataObject = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  var authOptions = arguments[5];

	  if (!AV.applicationId) {
	    throw new Error('You must specify your applicationId using AV.init()');
	  }

	  if (!AV.applicationKey && !AV.masterKey) {
	    throw new Error('You must specify a AppKey using AV.init()');
	  }

	  checkRouter(route);

	  if (!getServerURLPromise) {
	    return Promise.reject(new Error('Not initialized'));
	  }
	  return getServerURLPromise.then(function () {
	    var apiURL = createApiUrl(route, className, objectId, method, dataObject);
	    // prevent URI too long
	    if (apiURL.length > 2000 && method.toLowerCase() === 'get') {
	      var body = {
	        request: {
	          method: method,
	          path: apiURL
	        }
	      };
	      return AVRequest('batch', null, null, 'POST', body, authOptions);
	    }
	    return setHeaders(authOptions).then(function (headers) {
	      return ajax(method, apiURL, dataObject, headers).then(null, function (res) {
	        return handleError(res).then(function (location) {
	          return ajax(method, location, dataObject, headers);
	        });
	      });
	    });
	  });
	};

	module.exports = {
	  ajax: ajax,
	  request: AVRequest,
	  setServerUrlByRegion: setServerUrlByRegion
	};

	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var Promise = __webpack_require__(40).Promise;

	Promise._continueWhile = function (predicate, asyncFunction) {
	  if (predicate()) {
	    return asyncFunction().then(function () {
	      return Promise._continueWhile(predicate, asyncFunction);
	    });
	  }
	  return Promise.resolve();
	};

	module.exports = Promise;

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	/**
	 * @class AV.Error
	 */

	function AVError(code, message) {
	  var error = new Error(message);
	  error.code = code;
	  return error;
	}

	_.extend(AVError, /** @lends AV.Error */{
	  /**
	   * Error code indicating some error other than those enumerated here.
	   * @constant
	   */
	  OTHER_CAUSE: -1,

	  /**
	   * Error code indicating that something has gone wrong with the server.
	   * If you get this error code, it is AV's fault. Contact us at
	   * https://avoscloud.com/help
	   * @constant
	   */
	  INTERNAL_SERVER_ERROR: 1,

	  /**
	   * Error code indicating the connection to the AV servers failed.
	   * @constant
	   */
	  CONNECTION_FAILED: 100,

	  /**
	   * Error code indicating the specified object doesn't exist.
	   * @constant
	   */
	  OBJECT_NOT_FOUND: 101,

	  /**
	   * Error code indicating you tried to query with a datatype that doesn't
	   * support it, like exact matching an array or object.
	   * @constant
	   */
	  INVALID_QUERY: 102,

	  /**
	   * Error code indicating a missing or invalid classname. Classnames are
	   * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
	   * only valid characters.
	   * @constant
	   */
	  INVALID_CLASS_NAME: 103,

	  /**
	   * Error code indicating an unspecified object id.
	   * @constant
	   */
	  MISSING_OBJECT_ID: 104,

	  /**
	   * Error code indicating an invalid key name. Keys are case-sensitive. They
	   * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
	   * @constant
	   */
	  INVALID_KEY_NAME: 105,

	  /**
	   * Error code indicating a malformed pointer. You should not see this unless
	   * you have been mucking about changing internal AV code.
	   * @constant
	   */
	  INVALID_POINTER: 106,

	  /**
	   * Error code indicating that badly formed JSON was received upstream. This
	   * either indicates you have done something unusual with modifying how
	   * things encode to JSON, or the network is failing badly.
	   * @constant
	   */
	  INVALID_JSON: 107,

	  /**
	   * Error code indicating that the feature you tried to access is only
	   * available internally for testing purposes.
	   * @constant
	   */
	  COMMAND_UNAVAILABLE: 108,

	  /**
	   * You must call AV.initialize before using the AV library.
	   * @constant
	   */
	  NOT_INITIALIZED: 109,

	  /**
	   * Error code indicating that a field was set to an inconsistent type.
	   * @constant
	   */
	  INCORRECT_TYPE: 111,

	  /**
	   * Error code indicating an invalid channel name. A channel name is either
	   * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
	   * characters.
	   * @constant
	   */
	  INVALID_CHANNEL_NAME: 112,

	  /**
	   * Error code indicating that push is misconfigured.
	   * @constant
	   */
	  PUSH_MISCONFIGURED: 115,

	  /**
	   * Error code indicating that the object is too large.
	   * @constant
	   */
	  OBJECT_TOO_LARGE: 116,

	  /**
	   * Error code indicating that the operation isn't allowed for clients.
	   * @constant
	   */
	  OPERATION_FORBIDDEN: 119,

	  /**
	   * Error code indicating the result was not found in the cache.
	   * @constant
	   */
	  CACHE_MISS: 120,

	  /**
	   * Error code indicating that an invalid key was used in a nested
	   * JSONObject.
	   * @constant
	   */
	  INVALID_NESTED_KEY: 121,

	  /**
	   * Error code indicating that an invalid filename was used for AVFile.
	   * A valid file name contains only a-zA-Z0-9_. characters and is between 1
	   * and 128 characters.
	   * @constant
	   */
	  INVALID_FILE_NAME: 122,

	  /**
	   * Error code indicating an invalid ACL was provided.
	   * @constant
	   */
	  INVALID_ACL: 123,

	  /**
	   * Error code indicating that the request timed out on the server. Typically
	   * this indicates that the request is too expensive to run.
	   * @constant
	   */
	  TIMEOUT: 124,

	  /**
	   * Error code indicating that the email address was invalid.
	   * @constant
	   */
	  INVALID_EMAIL_ADDRESS: 125,

	  /**
	   * Error code indicating a missing content type.
	   * @constant
	   */
	  MISSING_CONTENT_TYPE: 126,

	  /**
	   * Error code indicating a missing content length.
	   * @constant
	   */
	  MISSING_CONTENT_LENGTH: 127,

	  /**
	   * Error code indicating an invalid content length.
	   * @constant
	   */
	  INVALID_CONTENT_LENGTH: 128,

	  /**
	   * Error code indicating a file that was too large.
	   * @constant
	   */
	  FILE_TOO_LARGE: 129,

	  /**
	   * Error code indicating an error saving a file.
	   * @constant
	   */
	  FILE_SAVE_ERROR: 130,

	  /**
	   * Error code indicating an error deleting a file.
	   * @constant
	   */
	  FILE_DELETE_ERROR: 153,

	  /**
	   * Error code indicating that a unique field was given a value that is
	   * already taken.
	   * @constant
	   */
	  DUPLICATE_VALUE: 137,

	  /**
	   * Error code indicating that a role's name is invalid.
	   * @constant
	   */
	  INVALID_ROLE_NAME: 139,

	  /**
	   * Error code indicating that an application quota was exceeded.  Upgrade to
	   * resolve.
	   * @constant
	   */
	  EXCEEDED_QUOTA: 140,

	  /**
	   * Error code indicating that a Cloud Code script failed.
	   * @constant
	   */
	  SCRIPT_FAILED: 141,

	  /**
	   * Error code indicating that a Cloud Code validation failed.
	   * @constant
	   */
	  VALIDATION_ERROR: 142,

	  /**
	   * Error code indicating that invalid image data was provided.
	   * @constant
	   */
	  INVALID_IMAGE_DATA: 150,

	  /**
	   * Error code indicating an unsaved file.
	   * @constant
	   */
	  UNSAVED_FILE_ERROR: 151,

	  /**
	   * Error code indicating an invalid push time.
	   */
	  INVALID_PUSH_TIME_ERROR: 152,

	  /**
	   * Error code indicating that the username is missing or empty.
	   * @constant
	   */
	  USERNAME_MISSING: 200,

	  /**
	   * Error code indicating that the password is missing or empty.
	   * @constant
	   */
	  PASSWORD_MISSING: 201,

	  /**
	   * Error code indicating that the username has already been taken.
	   * @constant
	   */
	  USERNAME_TAKEN: 202,

	  /**
	   * Error code indicating that the email has already been taken.
	   * @constant
	   */
	  EMAIL_TAKEN: 203,

	  /**
	   * Error code indicating that the email is missing, but must be specified.
	   * @constant
	   */
	  EMAIL_MISSING: 204,

	  /**
	   * Error code indicating that a user with the specified email was not found.
	   * @constant
	   */
	  EMAIL_NOT_FOUND: 205,

	  /**
	   * Error code indicating that a user object without a valid session could
	   * not be altered.
	   * @constant
	   */
	  SESSION_MISSING: 206,

	  /**
	   * Error code indicating that a user can only be created through signup.
	   * @constant
	   */
	  MUST_CREATE_USER_THROUGH_SIGNUP: 207,

	  /**
	   * Error code indicating that an an account being linked is already linked
	   * to another user.
	   * @constant
	   */
	  ACCOUNT_ALREADY_LINKED: 208,

	  /**
	   * Error code indicating that a user cannot be linked to an account because
	   * that account's id could not be found.
	   * @constant
	   */
	  LINKED_ID_MISSING: 250,

	  /**
	   * Error code indicating that a user with a linked (e.g. Facebook) account
	   * has an invalid session.
	   * @constant
	   */
	  INVALID_LINKED_SESSION: 251,

	  /**
	   * Error code indicating that a service being linked (e.g. Facebook or
	   * Twitter) is unsupported.
	   * @constant
	   */
	  UNSUPPORTED_SERVICE: 252,
	  /**
	   * Error code indicating a real error code is unavailable because
	   * we had to use an XDomainRequest object to allow CORS requests in
	   * Internet Explorer, which strips the body from HTTP responses that have
	   * a non-2XX status code.
	   * @constant
	   */
	  X_DOMAIN_REQUEST: 602
	});

	module.exports = AVError;

	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(global) {

	var _ = __webpack_require__(0);
	var userAgent = __webpack_require__(31);

	var _require = __webpack_require__(5),
	    isNullOrUndefined = _require.isNullOrUndefined;

	var AV = global.AV || {};

	// All internal configuration items
	AV._config = AV._config || {};
	var AVConfig = AV._config;

	_.extend(AVConfig, {

	  // 服务器节点地区，默认中国大陆
	  region: 'cn',

	  // 服务器的 URL，默认初始化时被设置为大陆节点地址
	  APIServerURL: AVConfig.APIServerURL || '',

	  // 禁用 currentUser，通常用于多用户环境
	  disableCurrentUser: false,

	  // Internal config can modifie the UserAgent
	  userAgent: userAgent,

	  // set production environment or test environment
	  // 1: production environment, 0: test environment, null: default environment
	  applicationProduction: null
	});

	/**
	 * Contains all AV API classes and functions.
	 * @namespace AV
	 */

	// Helpers
	// -------

	// Shared empty constructor function to aid in prototype-chain creation.
	var EmptyConstructor = function EmptyConstructor() {};

	// Helper function to correctly set up the prototype chain, for subclasses.
	// Similar to `goog.inherits`, but uses a hash of prototype properties and
	// class properties to be extended.
	var inherits = function inherits(parent, protoProps, staticProps) {
	  var child;

	  // The constructor function for the new subclass is either defined by you
	  // (the "constructor" property in your `extend` definition), or defaulted
	  // by us to simply call the parent's constructor.
	  if (protoProps && protoProps.hasOwnProperty('constructor')) {
	    child = protoProps.constructor;
	  } else {
	    /** @ignore */
	    child = function child() {
	      parent.apply(this, arguments);
	    };
	  }

	  // Inherit class (static) properties from parent.
	  _.extend(child, parent);

	  // Set the prototype chain to inherit from `parent`, without calling
	  // `parent`'s constructor function.
	  EmptyConstructor.prototype = parent.prototype;
	  child.prototype = new EmptyConstructor();

	  // Add prototype properties (instance properties) to the subclass,
	  // if supplied.
	  if (protoProps) {
	    _.extend(child.prototype, protoProps);
	  }

	  // Add static properties to the constructor function, if supplied.
	  if (staticProps) {
	    _.extend(child, staticProps);
	  }

	  // Correctly set child's `prototype.constructor`.
	  child.prototype.constructor = child;

	  // Set a convenience property in case the parent's prototype is
	  // needed later.
	  child.__super__ = parent.prototype;

	  return child;
	};

	/**
	 * Call this method to set production environment variable.
	 * @function AV.setProduction
	 * @param {Boolean} production True is production environment,and
	 *  it's true by default.
	 */
	AV.setProduction = function (production) {
	  if (!isNullOrUndefined(production)) {
	    AVConfig.applicationProduction = production ? 1 : 0;
	  } else {
	    // change to default value
	    AVConfig.applicationProduction = null;
	  }
	};

	/**
	 * Returns prefix for localStorage keys used by this instance of AV.
	 * @param {String} path The relative suffix to append to it.
	 *     null or undefined is treated as the empty string.
	 * @return {String} The full key name.
	 * @private
	 */
	AV._getAVPath = function (path) {
	  if (!AV.applicationId) {
	    throw new Error("You need to call AV.initialize before using AV.");
	  }
	  if (!path) {
	    path = "";
	  }
	  if (!_.isString(path)) {
	    throw new Error("Tried to get a localStorage path that wasn't a String.");
	  }
	  if (path[0] === "/") {
	    path = path.substring(1);
	  }
	  return "AV/" + AV.applicationId + "/" + path;
	};

	/**
	 * Returns the unique string for this app on this machine.
	 * Gets reset when localStorage is cleared.
	 * @private
	 */
	AV._installationId = null;
	AV._getInstallationId = function () {
	  // See if it's cached in RAM.
	  if (AV._installationId) {
	    return AV.Promise.resolve(AV._installationId);
	  }

	  // Try to get it from localStorage.
	  var path = AV._getAVPath("installationId");
	  return AV.localStorage.getItemAsync(path).then(function (_installationId) {
	    AV._installationId = _installationId;
	    if (!AV._installationId) {
	      // It wasn't in localStorage, so create a new one.
	      var hexOctet = function hexOctet() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	      };
	      AV._installationId = hexOctet() + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + hexOctet() + hexOctet();
	      return AV.localStorage.setItemAsync(path, AV._installationId);
	    } else {
	      return _installationId;
	    }
	  });
	};

	AV._parseDate = function (iso8601) {
	  var regexp = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})" + "T" + "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})" + "(.([0-9]+))?" + "Z$");
	  var match = regexp.exec(iso8601);
	  if (!match) {
	    return null;
	  }

	  var year = match[1] || 0;
	  var month = (match[2] || 1) - 1;
	  var day = match[3] || 0;
	  var hour = match[4] || 0;
	  var minute = match[5] || 0;
	  var second = match[6] || 0;
	  var milli = match[8] || 0;

	  return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
	};

	// A self-propagating extend function.
	AV._extend = function (protoProps, classProps) {
	  var child = inherits(this, protoProps, classProps);
	  child.extend = this.extend;
	  return child;
	};

	// Helper function to get a value from a Backbone object as a property
	// or as a function.
	AV._getValue = function (object, prop) {
	  if (!(object && object[prop])) {
	    return null;
	  }
	  return _.isFunction(object[prop]) ? object[prop]() : object[prop];
	};

	/**
	 * Converts a value in a AV Object into the appropriate representation.
	 * This is the JS equivalent of Java's AV.maybeReferenceAndEncode(Object)
	 * if seenObjects is falsey. Otherwise any AV.Objects not in
	 * seenObjects will be fully embedded rather than encoded
	 * as a pointer.  This array will be used to prevent going into an infinite
	 * loop because we have circular references.  If <seenObjects>
	 * is set, then none of the AV Objects that are serialized can be dirty.
	 * @private
	 */
	AV._encode = function (value, seenObjects, disallowObjects) {
	  if (value instanceof AV.Object) {
	    if (disallowObjects) {
	      throw new Error("AV.Objects not allowed here");
	    }
	    if (!seenObjects || _.include(seenObjects, value) || !value._hasData) {
	      return value._toPointer();
	    }
	    if (!value.dirty()) {
	      seenObjects = seenObjects.concat(value);
	      return AV._encode(value._toFullJSON(seenObjects), seenObjects, disallowObjects);
	    }
	    throw new Error("Tried to save an object with a pointer to a new, unsaved object.");
	  }
	  if (value instanceof AV.ACL) {
	    return value.toJSON();
	  }
	  if (_.isDate(value)) {
	    return { "__type": "Date", "iso": value.toJSON() };
	  }
	  if (value instanceof AV.GeoPoint) {
	    return value.toJSON();
	  }
	  if (_.isArray(value)) {
	    return _.map(value, function (x) {
	      return AV._encode(x, seenObjects, disallowObjects);
	    });
	  }
	  if (_.isRegExp(value)) {
	    return value.source;
	  }
	  if (value instanceof AV.Relation) {
	    return value.toJSON();
	  }
	  if (value instanceof AV.Op) {
	    return value.toJSON();
	  }
	  if (value instanceof AV.File) {
	    if (!value.url() && !value.id) {
	      throw new Error("Tried to save an object containing an unsaved file.");
	    }
	    return {
	      __type: "File",
	      id: value.id,
	      name: value.name(),
	      url: value.url()
	    };
	  }
	  if (_.isObject(value)) {
	    return _.mapObject(value, function (v, k) {
	      return AV._encode(v, seenObjects, disallowObjects);
	    });
	  }
	  return value;
	};

	/**
	 * The inverse function of AV._encode.
	 * @private
	 */
	AV._decode = function (value, key) {
	  if (!_.isObject(value) || _.isDate(value)) {
	    return value;
	  }
	  if (_.isArray(value)) {
	    return _.map(value, function (v) {
	      return AV._decode(v);
	    });
	  }
	  if (value instanceof AV.Object) {
	    return value;
	  }
	  if (value instanceof AV.File) {
	    return value;
	  }
	  if (value instanceof AV.Op) {
	    return value;
	  }
	  if (value instanceof AV.GeoPoint) {
	    return value;
	  }
	  if (value instanceof AV.ACL) {
	    return value;
	  }
	  if (value.__op) {
	    return AV.Op._decode(value);
	  }
	  var className;
	  if (value.__type === "Pointer") {
	    className = value.className;
	    var pointer = AV.Object._create(className);
	    if (Object.keys(value).length > 3) {
	      var v = _.clone(value);
	      delete v.__type;
	      delete v.className;
	      pointer._finishFetch(v, true);
	    } else {
	      pointer._finishFetch({ objectId: value.objectId }, false);
	    }
	    return pointer;
	  }
	  if (value.__type === "Object") {
	    // It's an Object included in a query result.
	    className = value.className;
	    var _v = _.clone(value);
	    delete _v.__type;
	    delete _v.className;
	    var object = AV.Object._create(className);
	    object._finishFetch(_v, true);
	    return object;
	  }
	  if (value.__type === "Date") {
	    return AV._parseDate(value.iso);
	  }
	  if (value.__type === "GeoPoint") {
	    return new AV.GeoPoint({
	      latitude: value.latitude,
	      longitude: value.longitude
	    });
	  }
	  if (value.__type === "Relation") {
	    if (!key) throw new Error('key missing decoding a Relation');
	    var relation = new AV.Relation(null, key);
	    relation.targetClassName = value.className;
	    return relation;
	  }
	  if (value.__type === 'File') {
	    var file = new AV.File(value.name);
	    var _v2 = _.clone(value);
	    delete _v2.__type;
	    file._finishFetch(_v2);
	    return file;
	  }
	  return _.mapObject(value, function (v, k) {
	    if (k === "ACL") {
	      return new AV.ACL(v);
	    }
	    return AV._decode(v, k);
	  });
	};

	AV._encodeObjectOrArray = function (value) {
	  var encodeAVObject = function encodeAVObject(object) {
	    if (object && object._toFullJSON) {
	      object = object._toFullJSON([]);
	    }

	    return _.mapObject(object, function (value) {
	      return AV._encode(value, []);
	    });
	  };

	  if (_.isArray(value)) {
	    return value.map(function (object) {
	      return encodeAVObject(object);
	    });
	  } else {
	    return encodeAVObject(value);
	  }
	};

	AV._arrayEach = _.each;

	/**
	 * Does a deep traversal of every item in object, calling func on every one.
	 * @param {Object} object The object or array to traverse deeply.
	 * @param {Function} func The function to call for every item. It will
	 *     be passed the item as an argument. If it returns a truthy value, that
	 *     value will replace the item in its parent container.
	 * @returns {} the result of calling func on the top-level object itself.
	 * @private
	 */
	AV._traverse = function (object, func, seen) {
	  if (object instanceof AV.Object) {
	    seen = seen || [];
	    if (_.indexOf(seen, object) >= 0) {
	      // We've already visited this object in this call.
	      return;
	    }
	    seen.push(object);
	    AV._traverse(object.attributes, func, seen);
	    return func(object);
	  }
	  if (object instanceof AV.Relation || object instanceof AV.File) {
	    // Nothing needs to be done, but we don't want to recurse into the
	    // object's parent infinitely, so we catch this case.
	    return func(object);
	  }
	  if (_.isArray(object)) {
	    _.each(object, function (child, index) {
	      var newChild = AV._traverse(child, func, seen);
	      if (newChild) {
	        object[index] = newChild;
	      }
	    });
	    return func(object);
	  }
	  if (_.isObject(object)) {
	    AV._each(object, function (child, key) {
	      var newChild = AV._traverse(child, func, seen);
	      if (newChild) {
	        object[key] = newChild;
	      }
	    });
	    return func(object);
	  }
	  return func(object);
	};

	/**
	 * This is like _.each, except:
	 * * it doesn't work for so-called array-like objects,
	 * * it does work for dictionaries with a "length" attribute.
	 * @private
	 */
	AV._objectEach = AV._each = function (obj, callback) {
	  if (_.isObject(obj)) {
	    _.each(_.keys(obj), function (key) {
	      callback(obj[key], key);
	    });
	  } else {
	    _.each(obj, callback);
	  }
	};

	module.exports = AV;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	// Helper function to check null or undefined.
	var isNullOrUndefined = function isNullOrUndefined(x) {
	  return _.isNull(x) || _.isUndefined(x);
	};

	var ensureArray = function ensureArray(target) {
	  if (_.isArray(target)) {
	    return target;
	  }
	  if (target === undefined || target === null) {
	    return [];
	  }
	  return [target];
	};

	var getSessionToken = function getSessionToken(authOptions) {
	  if (authOptions.sessionToken) {
	    return authOptions.sessionToken;
	  }
	  if (authOptions.user && typeof authOptions.user.getSessionToken === 'function') {
	    return authOptions.user.getSessionToken();
	  }
	};

	module.exports = {
	  isNullOrUndefined: isNullOrUndefined,
	  ensureArray: ensureArray,
	  getSessionToken: getSessionToken
	};

	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = this;
	}

	var Emitter = __webpack_require__(37);
	var RequestBase = __webpack_require__(46);
	var isObject = __webpack_require__(8);
	var isFunction = __webpack_require__(45);
	var ResponseBase = __webpack_require__(47);

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Expose `request`.
	 */

	var request = exports = module.exports = function(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new exports.Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new exports.Request('GET', method);
	  }

	  return new exports.Request(method, url);
	}

	exports.Request = Request;

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val != null) {
	    if (Array.isArray(val)) {
	      val.forEach(function(v) {
	        pushEncodedKeyValuePair(pairs, key, v);
	      });
	    } else if (isObject(val)) {
	      for(var subkey in val) {
	        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	      }
	    } else {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(val));
	    }
	  } else if (val === null) {
	    pairs.push(encodeURIComponent(key));
	  }
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  var status = this.xhr.status;
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	      status = 204;
	  }
	  this._setStatusProperties(status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);

	  if (null === this.text && req._responseType) {
	    this.body = this.xhr.response;
	  } else {
	    this.body = this.req.method != 'HEAD'
	      ? this._parseBody(this.text ? this.text : this.xhr.response)
	      : null;
	  }
	}

	ResponseBase(Response.prototype);

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if(this.req._parser) {
	    return this.req._parser(this, str);
	  }
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      if (self.xhr) {
	        // ie9 doesn't have 'response' property
	        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
	        // issue #876: return the http status code if the response parsing fails
	        err.status = self.xhr.status ? self.xhr.status : null;
	        err.statusCode = err.status; // backwards-compat only
	      } else {
	        err.rawResponse = null;
	        err.status = null;
	      }

	      return self.callback(err);
	    }

	    self.emit('response', res);

	    var new_err;
	    try {
	      if (!self._isResponseOK(res)) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch(e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }

	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}

	/**
	 * Mixin `Emitter` and `RequestBase`.
	 */

	Emitter(Request.prototype);
	RequestBase(Request.prototype);

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'function' === typeof btoa ? 'basic' : 'auto',
	    }
	  }

	  switch (options.type) {
	    case 'basic':
	      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
	    break;

	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `options` (or filename).
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String|Object} options
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, options){
	  if (this._data) {
	    throw Error("superagent can't mix .send() and .attach()");
	  }

	  this._getFormData().append(field, file, options || file.name);
	  return this;
	};

	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();

	  if (err) {
	    this.emit('error', err);
	  }

	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	// This only warns, because the request is still likely to work
	Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
	  console.warn("This is not supported in browser version of superagent");
	  return this;
	};

	// This throws, because it can't send/receive data as expected
	Request.prototype.pipe = Request.prototype.write = function(){
	  throw Error("Streaming is not supported in browser version of superagent");
	};

	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */

	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
	  }

	  if (this._sort) {
	    var index = this.url.indexOf('?');
	    if (index >= 0) {
	      var queryArr = this.url.substring(index + 1).split('&');
	      if (isFunction(this._sort)) {
	        queryArr.sort(this._sort);
	      } else {
	        queryArr.sort();
	      }
	      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
	    }
	  }
	};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	Request.prototype._isHost = function _isHost(obj) {
	  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
	  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
	}

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var data = this._formData || this._data;

	  if (this._endCalled) {
	    console.warn("Warning: .end() was called twice. This is not supported in superagent");
	  }
	  this._endCalled = true;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    var readyState = xhr.readyState;
	    if (readyState >= 2 && self._responseTimeoutTimer) {
	      clearTimeout(self._responseTimeoutTimer);
	    }
	    if (4 != readyState) {
	      return;
	    }

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (!status) {
	      if (self.timedout || self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(direction, e) {
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = direction;
	    self.emit('progress', e);
	  }
	  if (this.hasListeners('progress')) {
	    try {
	      xhr.onprogress = handleProgress.bind(null, 'download');
	      if (xhr.upload) {
	        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
	      }
	    } catch(e) {
	      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	      // Reported here:
	      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	    }
	  }

	  // querystring
	  this._appendQueryString();

	  this._setTimeouts();

	  // initiate request
	  try {
	    if (this.username && this.password) {
	      xhr.open(this.method, this.url, true, this.username, this.password);
	    } else {
	      xhr.open(this.method, this.url, true);
	    }
	  } catch (err) {
	    // see #1149
	    return this.callback(err);
	  }

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) {
	      serialize = request.serialize['application/json'];
	    }
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request['del'] = del;
	request['delete'] = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(39);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
	    return true;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


	/***/ }),
	/* 8 */
	/***/ (function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}

	module.exports = isObject;


	/***/ }),
	/* 9 */
	/***/ (function(module, exports) {

	var g;

	// This works in non-strict mode
	g = (function() {
		return this;
	})();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (1,eval)("this");
	} catch(e) {
		// This works if the window reference is available
		if(typeof window === "object")
			g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;


	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var storage = __webpack_require__(11);
	var AV = __webpack_require__(4);

	var removeAsync = exports.removeAsync = storage.removeItemAsync.bind(storage);

	var getCacheData = function getCacheData(cacheData, key) {
	  try {
	    cacheData = JSON.parse(cacheData);
	  } catch (e) {
	    return null;
	  }
	  if (cacheData) {
	    var expired = cacheData.expiredAt && cacheData.expiredAt < Date.now();
	    if (!expired) {
	      return cacheData.value;
	    }
	    return removeAsync(key).then(function () {
	      return null;
	    });
	  }
	  return null;
	};

	exports.getAsync = function (key) {
	  key = AV.applicationId + '/' + key;
	  return storage.getItemAsync(key).then(function (cache) {
	    return getCacheData(cache, key);
	  });
	};

	exports.setAsync = function (key, value, ttl) {
	  var cache = { value: value };
	  if (typeof ttl === 'number') {
	    cache.expiredAt = Date.now() + ttl;
	  }
	  return storage.setItemAsync(AV.applicationId + '/' + key, JSON.stringify(cache));
	};

	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var Promise = __webpack_require__(2);
	var localStorage = __webpack_require__(35);

	var syncApiNames = ['getItem', 'setItem', 'removeItem', 'clear'];

	if (!localStorage.async) {
	  // wrap sync apis with async ones.
	  _(syncApiNames).each(function (apiName) {
	    if (typeof localStorage[apiName] === 'function') {
	      localStorage[apiName + 'Async'] = function () {
	        return Promise.resolve(localStorage[apiName].apply(localStorage, arguments));
	      };
	    }
	  });
	} else {
	  _(syncApiNames).each(function (apiName) {
	    if (typeof localStorage[apiName] !== 'function') {
	      localStorage[apiName] = function () {
	        var error = new Error('Synchronous API [' + apiName + '] is not available in this runtime.');
	        error.code = 'SYNC_API_NOT_AVAILABLE';
	        throw error;
	      };
	    }
	  });
	}

	module.exports = localStorage;

	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	module.exports = '2.0.1';

	/***/ }),
	/* 13 */
	/***/ (function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;


	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	module.exports = function (AV) {
	  var PUBLIC_KEY = "*";

	  /**
	   * Creates a new ACL.
	   * If no argument is given, the ACL has no permissions for anyone.
	   * If the argument is a AV.User, the ACL will have read and write
	   *   permission for only that user.
	   * If the argument is any other JSON object, that object will be interpretted
	   *   as a serialized ACL created with toJSON().
	   * @see AV.Object#setACL
	   * @class
	   *
	   * <p>An ACL, or Access Control List can be added to any
	   * <code>AV.Object</code> to restrict access to only a subset of users
	   * of your application.</p>
	   */
	  AV.ACL = function (arg1) {
	    var self = this;
	    self.permissionsById = {};
	    if (_.isObject(arg1)) {
	      if (arg1 instanceof AV.User) {
	        self.setReadAccess(arg1, true);
	        self.setWriteAccess(arg1, true);
	      } else {
	        if (_.isFunction(arg1)) {
	          throw new Error('AV.ACL() called with a function.  Did you forget ()?');
	        }
	        AV._objectEach(arg1, function (accessList, userId) {
	          if (!_.isString(userId)) {
	            throw new Error('Tried to create an ACL with an invalid userId.');
	          }
	          self.permissionsById[userId] = {};
	          AV._objectEach(accessList, function (allowed, permission) {
	            if (permission !== "read" && permission !== "write") {
	              throw new Error('Tried to create an ACL with an invalid permission type.');
	            }
	            if (!_.isBoolean(allowed)) {
	              throw new Error('Tried to create an ACL with an invalid permission value.');
	            }
	            self.permissionsById[userId][permission] = allowed;
	          });
	        });
	      }
	    }
	  };

	  /**
	   * Returns a JSON-encoded version of the ACL.
	   * @return {Object}
	   */
	  AV.ACL.prototype.toJSON = function () {
	    return _.clone(this.permissionsById);
	  };

	  AV.ACL.prototype._setAccess = function (accessType, userId, allowed) {
	    if (userId instanceof AV.User) {
	      userId = userId.id;
	    } else if (userId instanceof AV.Role) {
	      userId = "role:" + userId.getName();
	    }
	    if (!_.isString(userId)) {
	      throw new Error('userId must be a string.');
	    }
	    if (!_.isBoolean(allowed)) {
	      throw new Error('allowed must be either true or false.');
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      if (!allowed) {
	        // The user already doesn't have this permission, so no action needed.
	        return;
	      } else {
	        permissions = {};
	        this.permissionsById[userId] = permissions;
	      }
	    }

	    if (allowed) {
	      this.permissionsById[userId][accessType] = true;
	    } else {
	      delete permissions[accessType];
	      if (_.isEmpty(permissions)) {
	        delete permissions[userId];
	      }
	    }
	  };

	  AV.ACL.prototype._getAccess = function (accessType, userId) {
	    if (userId instanceof AV.User) {
	      userId = userId.id;
	    } else if (userId instanceof AV.Role) {
	      userId = "role:" + userId.getName();
	    }
	    var permissions = this.permissionsById[userId];
	    if (!permissions) {
	      return false;
	    }
	    return permissions[accessType] ? true : false;
	  };

	  /**
	   * Set whether the given user is allowed to read this object.
	   * @param userId An instance of AV.User or its objectId.
	   * @param {Boolean} allowed Whether that user should have read access.
	   */
	  AV.ACL.prototype.setReadAccess = function (userId, allowed) {
	    this._setAccess("read", userId, allowed);
	  };

	  /**
	   * Get whether the given user id is *explicitly* allowed to read this object.
	   * Even if this returns false, the user may still be able to access it if
	   * getPublicReadAccess returns true or a role that the user belongs to has
	   * write access.
	   * @param userId An instance of AV.User or its objectId, or a AV.Role.
	   * @return {Boolean}
	   */
	  AV.ACL.prototype.getReadAccess = function (userId) {
	    return this._getAccess("read", userId);
	  };

	  /**
	   * Set whether the given user id is allowed to write this object.
	   * @param userId An instance of AV.User or its objectId, or a AV.Role..
	   * @param {Boolean} allowed Whether that user should have write access.
	   */
	  AV.ACL.prototype.setWriteAccess = function (userId, allowed) {
	    this._setAccess("write", userId, allowed);
	  };

	  /**
	   * Get whether the given user id is *explicitly* allowed to write this object.
	   * Even if this returns false, the user may still be able to write it if
	   * getPublicWriteAccess returns true or a role that the user belongs to has
	   * write access.
	   * @param userId An instance of AV.User or its objectId, or a AV.Role.
	   * @return {Boolean}
	   */
	  AV.ACL.prototype.getWriteAccess = function (userId) {
	    return this._getAccess("write", userId);
	  };

	  /**
	   * Set whether the public is allowed to read this object.
	   * @param {Boolean} allowed
	   */
	  AV.ACL.prototype.setPublicReadAccess = function (allowed) {
	    this.setReadAccess(PUBLIC_KEY, allowed);
	  };

	  /**
	   * Get whether the public is allowed to read this object.
	   * @return {Boolean}
	   */
	  AV.ACL.prototype.getPublicReadAccess = function () {
	    return this.getReadAccess(PUBLIC_KEY);
	  };

	  /**
	   * Set whether the public is allowed to write this object.
	   * @param {Boolean} allowed
	   */
	  AV.ACL.prototype.setPublicWriteAccess = function (allowed) {
	    this.setWriteAccess(PUBLIC_KEY, allowed);
	  };

	  /**
	   * Get whether the public is allowed to write this object.
	   * @return {Boolean}
	   */
	  AV.ACL.prototype.getPublicWriteAccess = function () {
	    return this.getWriteAccess(PUBLIC_KEY);
	  };

	  /**
	   * Get whether users belonging to the given role are allowed
	   * to read this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has read access.
	   *
	   * @param role The name of the role, or a AV.Role object.
	   * @return {Boolean} true if the role has read access. false otherwise.
	   * @throws {String} If role is neither a AV.Role nor a String.
	   */
	  AV.ACL.prototype.getRoleReadAccess = function (role) {
	    if (role instanceof AV.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      return this.getReadAccess("role:" + role);
	    }
	    throw new Error('role must be a AV.Role or a String');
	  };

	  /**
	   * Get whether users belonging to the given role are allowed
	   * to write this object. Even if this returns false, the role may
	   * still be able to write it if a parent role has write access.
	   *
	   * @param role The name of the role, or a AV.Role object.
	   * @return {Boolean} true if the role has write access. false otherwise.
	   * @throws {String} If role is neither a AV.Role nor a String.
	   */
	  AV.ACL.prototype.getRoleWriteAccess = function (role) {
	    if (role instanceof AV.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      return this.getWriteAccess("role:" + role);
	    }
	    throw new Error('role must be a AV.Role or a String');
	  };

	  /**
	   * Set whether users belonging to the given role are allowed
	   * to read this object.
	   *
	   * @param role The name of the role, or a AV.Role object.
	   * @param {Boolean} allowed Whether the given role can read this object.
	   * @throws {String} If role is neither a AV.Role nor a String.
	   */
	  AV.ACL.prototype.setRoleReadAccess = function (role, allowed) {
	    if (role instanceof AV.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      this.setReadAccess("role:" + role, allowed);
	      return;
	    }
	    throw new Error('role must be a AV.Role or a String');
	  };

	  /**
	   * Set whether users belonging to the given role are allowed
	   * to write this object.
	   *
	   * @param role The name of the role, or a AV.Role object.
	   * @param {Boolean} allowed Whether the given role can write this object.
	   * @throws {String} If role is neither a AV.Role nor a String.
	   */
	  AV.ACL.prototype.setRoleWriteAccess = function (role, allowed) {
	    if (role instanceof AV.Role) {
	      // Normalize to the String name
	      role = role.getName();
	    }
	    if (_.isString(role)) {
	      this.setWriteAccess("role:" + role, allowed);
	      return;
	    }
	    throw new Error('role must be a AV.Role or a String');
	  };
	};

	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVRequest = __webpack_require__(1).request;

	module.exports = function (AV) {
	  /**
	   * Contains functions for calling and declaring
	   * <p><strong><em>
	   *   Some functions are only available from Cloud Code.
	   * </em></strong></p>
	   *
	   * @namespace
	   */
	  AV.Cloud = AV.Cloud || {};

	  _.extend(AV.Cloud, /** @lends AV.Cloud */{
	    /**
	     * Makes a call to a cloud function.
	     * @param {String} name The function name.
	     * @param {Object} data The parameters to send to the cloud function.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    run: function run(name, data, options) {
	      var request = AVRequest('functions', name, null, 'POST', AV._encode(data, null, true), options);

	      return request.then(function (resp) {
	        return AV._decode(resp).result;
	      });
	    },

	    /**
	     * Makes a call to a cloud function, you can send {AV.Object} as param or a field of param; the response
	     * from server will also be parsed as an {AV.Object}, array of {AV.Object}, or object includes {AV.Object}
	     * @param {String} name The function name.
	     * @param {Object} data The parameters to send to the cloud function.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that will be resolved with the result of the function.
	     */
	    rpc: function rpc(name, data, options) {
	      if (_.isArray(data)) {
	        return Promise.reject(new Error('Can\'t pass Array as the param of rpc function in JavaScript SDK.'));
	      }

	      return AVRequest('call', name, null, 'POST', AV._encodeObjectOrArray(data), options).then(function (resp) {
	        return AV._decode(resp).result;
	      });
	    },

	    /**
	     * Make a call to request server date time.
	     * @return {Promise.<Date>} A promise that will be resolved with the result
	     * of the function.
	     * @since 0.5.9
	     */
	    getServerDate: function getServerDate() {
	      var request = AVRequest("date", null, null, 'GET');

	      return request.then(function (resp) {
	        return AV._decode(resp);
	      });
	    },

	    /**
	     * Makes a call to request a sms code for operation verification.
	     * @param {Object} data The mobile phone number string or a JSON
	     *    object that contains mobilePhoneNumber,template,op,ttl,name etc.
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    requestSmsCode: function requestSmsCode(data) {
	      if (_.isString(data)) {
	        data = { mobilePhoneNumber: data };
	      }
	      if (!data.mobilePhoneNumber) {
	        throw new Error('Missing mobilePhoneNumber.');
	      }
	      var request = AVRequest("requestSmsCode", null, null, 'POST', data);
	      return request;
	    },

	    /**
	     * Makes a call to verify sms code that sent by AV.Cloud.requestSmsCode
	     * @param {String} code The sms code sent by AV.Cloud.requestSmsCode
	     * @param {phone} phone The mobile phoner number(optional).
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    verifySmsCode: function verifySmsCode(code, phone) {
	      if (!code) throw new Error('Missing sms code.');
	      var params = {};
	      if (_.isString(phone)) {
	        params['mobilePhoneNumber'] = phone;
	      }

	      var request = AVRequest("verifySmsCode", code, null, 'POST', params);
	      return request;
	    }
	  });
	};

	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	module.exports = function (AV) {
	  var eventSplitter = /\s+/;
	  var slice = Array.prototype.slice;

	  /**
	   * @class
	   *
	   * <p>AV.Events is a fork of Backbone's Events module, provided for your
	   * convenience.</p>
	   *
	   * <p>A module that can be mixed in to any object in order to provide
	   * it with custom events. You may bind callback functions to an event
	   * with `on`, or remove these functions with `off`.
	   * Triggering an event fires all callbacks in the order that `on` was
	   * called.
	   *
	   * @private
	   * @example
	   * var object = {};
	   * _.extend(object, AV.Events);
	   * object.on('expand', function(){ alert('expanded'); });
	   * object.trigger('expand');</pre></p>
	   *
	   */
	  AV.Events = {
	    /**
	     * Bind one or more space separated events, `events`, to a `callback`
	     * function. Passing `"all"` will bind the callback to all events fired.
	     */
	    on: function on(events, callback, context) {

	      var calls, event, node, tail, list;
	      if (!callback) {
	        return this;
	      }
	      events = events.split(eventSplitter);
	      calls = this._callbacks || (this._callbacks = {});

	      // Create an immutable callback list, allowing traversal during
	      // modification.  The tail is an empty object that will always be used
	      // as the next node.
	      event = events.shift();
	      while (event) {
	        list = calls[event];
	        node = list ? list.tail : {};
	        node.next = tail = {};
	        node.context = context;
	        node.callback = callback;
	        calls[event] = { tail: tail, next: list ? list.next : node };
	        event = events.shift();
	      }

	      return this;
	    },

	    /**
	     * Remove one or many callbacks. If `context` is null, removes all callbacks
	     * with that function. If `callback` is null, removes all callbacks for the
	     * event. If `events` is null, removes all bound callbacks for all events.
	     */
	    off: function off(events, callback, context) {
	      var event, calls, node, tail, cb, ctx;

	      // No events, or removing *all* events.
	      if (!(calls = this._callbacks)) {
	        return;
	      }
	      if (!(events || callback || context)) {
	        delete this._callbacks;
	        return this;
	      }

	      // Loop through the listed events and contexts, splicing them out of the
	      // linked list of callbacks if appropriate.
	      events = events ? events.split(eventSplitter) : _.keys(calls);
	      event = events.shift();
	      while (event) {
	        node = calls[event];
	        delete calls[event];
	        if (!node || !(callback || context)) {
	          continue;
	        }
	        // Create a new list, omitting the indicated callbacks.
	        tail = node.tail;
	        node = node.next;
	        while (node !== tail) {
	          cb = node.callback;
	          ctx = node.context;
	          if (callback && cb !== callback || context && ctx !== context) {
	            this.on(event, cb, ctx);
	          }
	          node = node.next;
	        }
	        event = events.shift();
	      }

	      return this;
	    },

	    /**
	     * Trigger one or many events, firing all bound callbacks. Callbacks are
	     * passed the same arguments as `trigger` is, apart from the event name
	     * (unless you're listening on `"all"`, which will cause your callback to
	     * receive the true name of the event as the first argument).
	     */
	    trigger: function trigger(events) {
	      var event, node, calls, tail, args, all, rest;
	      if (!(calls = this._callbacks)) {
	        return this;
	      }
	      all = calls.all;
	      events = events.split(eventSplitter);
	      rest = slice.call(arguments, 1);

	      // For each event, walk through the linked list of callbacks twice,
	      // first to trigger the event, then to trigger any `"all"` callbacks.
	      event = events.shift();
	      while (event) {
	        node = calls[event];
	        if (node) {
	          tail = node.tail;
	          while ((node = node.next) !== tail) {
	            node.callback.apply(node.context || this, rest);
	          }
	        }
	        node = all;
	        if (node) {
	          tail = node.tail;
	          args = [event].concat(rest);
	          while ((node = node.next) !== tail) {
	            node.callback.apply(node.context || this, args);
	          }
	        }
	        event = events.shift();
	      }

	      return this;
	    }
	  };

	  /**
	   * @function
	   */
	  AV.Events.bind = AV.Events.on;

	  /**
	   * @function
	   */
	  AV.Events.unbind = AV.Events.off;
	};

	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var cos = __webpack_require__(32);
	var qiniu = __webpack_require__(33);
	var s3 = __webpack_require__(34);
	var AVError = __webpack_require__(3);
	var AVRequest = __webpack_require__(1).request;
	var Promise = __webpack_require__(2);

	module.exports = function (AV) {

	  // 挂载一些配置
	  var avConfig = AV._config;

	  var hexOctet = function hexOctet() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  };

	  // port from browserify path module
	  // since react-native packager won't shim node modules.
	  var extname = function extname(path) {
	    return path.match(/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/)[4];
	  };

	  var b64Digit = function b64Digit(number) {
	    if (number < 26) {
	      return String.fromCharCode(65 + number);
	    }
	    if (number < 52) {
	      return String.fromCharCode(97 + (number - 26));
	    }
	    if (number < 62) {
	      return String.fromCharCode(48 + (number - 52));
	    }
	    if (number === 62) {
	      return '+';
	    }
	    if (number === 63) {
	      return '/';
	    }
	    throw new Error('Tried to encode large digit ' + number + ' in base64.');
	  };

	  var encodeBase64 = function encodeBase64(array) {
	    var chunks = [];
	    chunks.length = Math.ceil(array.length / 3);
	    _.times(chunks.length, function (i) {
	      var b1 = array[i * 3];
	      var b2 = array[i * 3 + 1] || 0;
	      var b3 = array[i * 3 + 2] || 0;

	      var has2 = i * 3 + 1 < array.length;
	      var has3 = i * 3 + 2 < array.length;

	      chunks[i] = [b64Digit(b1 >> 2 & 0x3F), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0F), has2 ? b64Digit(b2 << 2 & 0x3C | b3 >> 6 & 0x03) : "=", has3 ? b64Digit(b3 & 0x3F) : "="].join("");
	    });
	    return chunks.join("");
	  };

	  /**
	   * An AV.File is a local representation of a file that is saved to the AV
	   * cloud.
	   * @param name {String} The file's name. This will change to a unique value
	   *     once the file has finished saving.
	   * @param data {Array} The data for the file, as either:
	   *     1. an Array of byte value Numbers, or
	   *     2. an Object like { base64: "..." } with a base64-encoded String.
	   *     3. a File object selected with a file upload control. (3) only works
	   *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
	   *     4.a Buffer object in Node.js runtime.
	   *
	   *        For example:<pre>
	   * var fileUploadControl = $("#profilePhotoFileUpload")[0];
	   * if (fileUploadControl.files.length > 0) {
	   *   var file = fileUploadControl.files[0];
	   *   var name = "photo.jpg";
	   *   var file = new AV.File(name, file);
	   *   file.save().then(function() {
	   *     // The file has been saved to AV.
	   *   }, function(error) {
	   *     // The file either could not be read, or could not be saved to AV.
	   *   });
	   * }</pre>
	   *
	   * @class
	   * @param [mimeType] {String} Content-Type header to use for the file. If
	   *     this is omitted, the content type will be inferred from the name's
	   *     extension.
	   */
	  AV.File = function (name, data, mimeType) {

	    this.attributes = {
	      name: name,
	      url: '',
	      metaData: {},
	      // 用来存储转换后要上传的 base64 String
	      base64: ''
	    };

	    this._extName = '';

	    var owner = void 0;
	    if (data && data.owner) {
	      owner = data.owner;
	    } else if (!AV._config.disableCurrentUser) {
	      try {
	        owner = AV.User.current();
	      } catch (error) {
	        if ('SYNC_API_NOT_AVAILABLE' === error.code) {
	          console.warn('Get current user failed. It seems this runtime use an async storage system, please create AV.File in the callback of AV.User.currentAsync().');
	        } else {
	          throw error;
	        }
	      }
	    }

	    this.attributes.metaData = {
	      owner: owner ? owner.id : 'unknown'
	    };

	    this.set('mime_type', mimeType);

	    if (_.isArray(data)) {
	      this.attributes.metaData.size = data.length;
	      data = { base64: encodeBase64(data) };
	    }
	    if (data && data.base64) {
	      var parseBase64 = __webpack_require__(36);
	      var dataBase64 = parseBase64(data.base64, mimeType);
	      this._source = Promise.resolve({ data: dataBase64, type: mimeType });
	    } else if (data && data.blob) {
	      if (!data.blob.type && mimeType) {
	        data.blob.type = mimeType;
	      }
	      if (!data.blob.name) {
	        data.blob.name = name;
	      }
	      if (false) {
	        this._extName = extname(data.blob.uri);
	      }
	      this._source = Promise.resolve({ data: data.blob, type: mimeType });
	    } else if (typeof File !== "undefined" && data instanceof File) {
	      if (data.size) {
	        this.attributes.metaData.size = data.size;
	      }
	      if (data.name) {
	        this._extName = extname(data.name);
	      }
	      this._source = Promise.resolve({ data: data, type: mimeType });
	    } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
	      this.attributes.metaData.size = data.length;
	      this._source = Promise.resolve({ data: data, type: mimeType });
	    } else if (_.isString(data)) {
	      throw new Error("Creating a AV.File from a String is not yet supported.");
	    }
	  };

	  /**
	   * Creates a fresh AV.File object with exists url for saving to AVOS Cloud.
	   * @param {String} name the file name
	   * @param {String} url the file url.
	   * @param {Object} [metaData] the file metadata object.
	   * @param {String} [type] Content-Type header to use for the file. If
	   *     this is omitted, the content type will be inferred from the name's
	   *     extension.
	   * @return {AV.File} the file object
	   */
	  AV.File.withURL = function (name, url, metaData, type) {
	    if (!name || !url) {
	      throw new Error("Please provide file name and url");
	    }
	    var file = new AV.File(name, null, type);
	    //copy metaData properties to file.
	    if (metaData) {
	      for (var prop in metaData) {
	        if (!file.attributes.metaData[prop]) file.attributes.metaData[prop] = metaData[prop];
	      }
	    }
	    file.attributes.url = url;
	    //Mark the file is from external source.
	    file.attributes.metaData.__source = 'external';
	    return file;
	  };

	  /**
	   * Creates a file object with exists objectId.
	   * @param {String} objectId The objectId string
	   * @return {AV.File} the file object
	   */
	  AV.File.createWithoutData = function (objectId) {
	    var file = new AV.File();
	    file.id = objectId;
	    return file;
	  };

	  AV.File.prototype = {
	    className: '_File',

	    toJSON: function toJSON() {
	      return AV._encode(this);
	    },

	    /**
	     * Returns the ACL for this file.
	     * @returns {AV.ACL} An instance of AV.ACL.
	     */
	    getACL: function getACL() {
	      return this._acl;
	    },

	    /**
	     * Sets the ACL to be used for this file.
	     * @param {AV.ACL} acl An instance of AV.ACL.
	     */
	    setACL: function setACL(acl) {
	      if (!(acl instanceof AV.ACL)) {
	        return new AVError(AVError.OTHER_CAUSE, 'ACL must be a AV.ACL.');
	      }
	      this._acl = acl;
	    },

	    /**
	     * Gets the name of the file. Before save is called, this is the filename
	     * given by the user. After save is called, that name gets prefixed with a
	     * unique identifier.
	     */
	    name: function name() {
	      return this.get('name');
	    },

	    /**
	     * Gets the url of the file. It is only available after you save the file or
	     * after you get the file from a AV.Object.
	     * @return {String}
	     */
	    url: function url() {
	      return this.get('url');
	    },

	    /**
	    * Gets the attributs of the file object.
	    * @param {String} The attribute name which want to get.
	    * @returns {Any}
	    */
	    get: function get(attrName) {
	      switch (attrName) {
	        case 'objectId':
	          return this.id;
	        case 'url':
	        case 'name':
	        case 'mime_type':
	        case 'metaData':
	        case 'createdAt':
	        case 'updatedAt':
	          return this.attributes[attrName];
	        default:
	          return this.attributes.metaData[attrName];
	      }
	    },

	    /**
	    * Set the metaData of the file object.
	    * @param {Object} Object is an key value Object for setting metaData.
	    * @param {String} attr is an optional metadata key.
	    * @param {Object} value is an optional metadata value.
	    * @returns {String|Number|Array|Object}
	    */
	    set: function set() {
	      var _this = this;

	      var set = function set(attrName, value) {
	        switch (attrName) {
	          case 'name':
	          case 'url':
	          case 'mime_type':
	          case 'base64':
	          case 'metaData':
	            _this.attributes[attrName] = value;
	            break;
	          default:
	            // File 并非一个 AVObject，不能完全自定义其他属性，所以只能都放在 metaData 上面
	            _this.attributes.metaData[attrName] = value;
	            break;
	        }
	      };

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      switch (args.length) {
	        case 1:
	          // 传入一个 Object
	          for (var k in args[0]) {
	            set(k, args[0][k]);
	          }
	          break;
	        case 2:
	          set(args[0], args[1]);
	          break;
	      }
	    },

	    /**
	    * <p>Returns the file's metadata JSON object if no arguments is given.Returns the
	    * metadata value if a key is given.Set metadata value if key and value are both given.</p>
	    * <p><pre>
	    *  var metadata = file.metaData(); //Get metadata JSON object.
	    *  var size = file.metaData('size');  // Get the size metadata value.
	    *  file.metaData('format', 'jpeg'); //set metadata attribute and value.
	    *</pre></p>
	    * @return {Object} The file's metadata JSON object.
	    * @param {String} attr an optional metadata key.
	    * @param {Object} value an optional metadata value.
	    **/
	    metaData: function metaData(attr, value) {
	      if (attr && value) {
	        this.attributes.metaData[attr] = value;
	        return this;
	      } else if (attr && !value) {
	        return this.attributes.metaData[attr];
	      } else {
	        return this.attributes.metaData;
	      }
	    },

	    /**
	     * 如果文件是图片，获取图片的缩略图URL。可以传入宽度、高度、质量、格式等参数。
	     * @return {String} 缩略图URL
	     * @param {Number} width 宽度，单位：像素
	     * @param {Number} heigth 高度，单位：像素
	     * @param {Number} quality 质量，1-100的数字，默认100
	     * @param {Number} scaleToFit 是否将图片自适应大小。默认为true。
	     * @param {String} fmt 格式，默认为png，也可以为jpeg,gif等格式。
	     */

	    thumbnailURL: function thumbnailURL(width, height, quality, scaleToFit, fmt) {
	      var url = this.attributes.url;
	      if (!url) {
	        throw new Error('Invalid url.');
	      }
	      if (!width || !height || width <= 0 || height <= 0) {
	        throw new Error('Invalid width or height value.');
	      }
	      quality = quality || 100;
	      scaleToFit = !scaleToFit ? true : scaleToFit;
	      if (quality <= 0 || quality > 100) {
	        throw new Error('Invalid quality value.');
	      }
	      fmt = fmt || 'png';
	      var mode = scaleToFit ? 2 : 1;
	      return url + '?imageView/' + mode + '/w/' + width + '/h/' + height + '/q/' + quality + '/format/' + fmt;
	    },

	    /**
	    * Returns the file's size.
	    * @return {Number} The file's size in bytes.
	    **/
	    size: function size() {
	      return this.metaData().size;
	    },

	    /**
	     * Returns the file's owner.
	     * @return {String} The file's owner id.
	     */
	    ownerId: function ownerId() {
	      return this.metaData().owner;
	    },

	    /**
	    * Destroy the file.
	    * @param {AuthOptions} options
	    * @return {Promise} A promise that is fulfilled when the destroy
	    *     completes.
	    */
	    destroy: function destroy(options) {
	      if (!this.id) {
	        return Promise.reject(new Error('The file id is not eixsts.'));
	      }
	      var request = AVRequest("files", null, this.id, 'DELETE', null, options);
	      return request;
	    },

	    /**
	     * Request Qiniu upload token
	     * @param {string} type
	     * @return {Promise} Resolved with the response
	     * @private
	     */
	    _fileToken: function _fileToken(type) {
	      var _this2 = this;

	      var route = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fileTokens';

	      var name = this.attributes.name;

	      // Create 16-bits uuid as qiniu key.
	      var extName = extname(name) || this._extName;
	      var key = hexOctet() + hexOctet() + hexOctet() + hexOctet() + hexOctet() + extName;
	      var data = {
	        key: key,
	        name: name,
	        ACL: this._acl,
	        mime_type: type,
	        metaData: this.attributes.metaData
	      };
	      this._qiniu_key = key;
	      return AVRequest(route, null, null, 'POST', data).then(function (response) {
	        if (response.mime_type) {
	          _this2.set('mime_type', response.mime_type);
	        }
	        return response;
	      });
	    },


	    /**
	     * @callback UploadProgressCallback
	     * @param {XMLHttpRequestProgressEvent} event - The progress event with 'loaded' and 'total' attributes
	     */
	    /**
	     * Saves the file to the AV cloud.
	     * @param {Object} [options]
	     * @param {UploadProgressCallback} [options.onprogress] 文件上传进度，在 Node.js 与小程序中无效，回调参数说明详见 {@link UploadProgressCallback}。
	     * @return {Promise} Promise that is resolved when the save finishes.
	     */
	    save: function save(options) {
	      var _this3 = this;

	      if (this.id) {
	        throw new Error('File already saved. If you want to manipulate a file, use AV.Query to get it.');
	      }
	      if (!this._previousSave) {
	        if (this._source) {
	          this._previousSave = this._source.then(function (_ref) {
	            var data = _ref.data,
	                type = _ref.type;
	            return _this3._fileToken(type).then(function (uploadInfo) {
	              var uploadPromise = void 0;
	              switch (uploadInfo.provider) {
	                case 's3':
	                  uploadPromise = s3(uploadInfo, data, _this3, options);
	                  break;
	                case 'qcloud':
	                  uploadPromise = cos(uploadInfo, data, _this3, options);
	                  break;
	                case 'qiniu':
	                default:
	                  uploadPromise = qiniu(uploadInfo, data, _this3, options);
	                  break;
	              }
	              return uploadPromise.catch(function (err) {
	                // destroy this file object when upload fails.
	                _this3.destroy();
	                throw err;
	              });
	            });
	          });
	        } else if (this.attributes.url && this.attributes.metaData.__source === 'external') {
	          // external link file.
	          var data = {
	            name: this.attributes.name,
	            ACL: this._acl,
	            metaData: this.attributes.metaData,
	            mime_type: this.mimeType,
	            url: this.attributes.url
	          };
	          this._previousSave = AVRequest('files', this.attributes.name, null, 'post', data).then(function (response) {
	            _this3.attributes.name = response.name;
	            _this3.attributes.url = response.url;
	            _this3.id = response.objectId;
	            if (response.size) {
	              _this3.attributes.metaData.size = response.size;
	            }
	            return _this3;
	          });
	        }
	      }
	      return this._previousSave;
	    },

	    /**
	    * fetch the file from server. If the server's representation of the
	    * model differs from its current attributes, they will be overriden,
	    * @param {AuthOptions} options AuthOptions plus 'keys' and 'include' option.
	    * @return {Promise} A promise that is fulfilled when the fetch
	    *     completes.
	    */
	    fetch: function fetch(options) {
	      var options = null;

	      var request = AVRequest('files', null, this.id, 'GET', options);
	      return request.then(this._finishFetch.bind(this));
	    },
	    _finishFetch: function _finishFetch(response) {
	      var value = AV.Object.prototype.parse(response);
	      value.attributes = {
	        name: value.name,
	        url: value.url,
	        mime_type: value.mime_type
	      };
	      value.attributes.metaData = value.metaData || {};
	      value.id = value.objectId;
	      // clean
	      delete value.objectId;
	      delete value.metaData;
	      delete value.url;
	      delete value.name;
	      delete value.mime_type;
	      _.extend(this, value);
	      return this;
	    }
	  };
	};

	/***/ }),
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	/*global navigator: false */
	module.exports = function (AV) {
	  /**
	   * Creates a new GeoPoint with any of the following forms:<br>
	   * @example
	   * new GeoPoint(otherGeoPoint)
	   * new GeoPoint(30, 30)
	   * new GeoPoint([30, 30])
	   * new GeoPoint({latitude: 30, longitude: 30})
	   * new GeoPoint()  // defaults to (0, 0)
	   * @class
	   *
	   * <p>Represents a latitude / longitude point that may be associated
	   * with a key in a AVObject or used as a reference point for geo queries.
	   * This allows proximity-based queries on the key.</p>
	   *
	   * <p>Only one key in a class may contain a GeoPoint.</p>
	   *
	   * <p>Example:<pre>
	   *   var point = new AV.GeoPoint(30.0, -20.0);
	   *   var object = new AV.Object("PlaceObject");
	   *   object.set("location", point);
	   *   object.save();</pre></p>
	   */
	  AV.GeoPoint = function (arg1, arg2) {
	    if (_.isArray(arg1)) {
	      AV.GeoPoint._validate(arg1[0], arg1[1]);
	      this.latitude = arg1[0];
	      this.longitude = arg1[1];
	    } else if (_.isObject(arg1)) {
	      AV.GeoPoint._validate(arg1.latitude, arg1.longitude);
	      this.latitude = arg1.latitude;
	      this.longitude = arg1.longitude;
	    } else if (_.isNumber(arg1) && _.isNumber(arg2)) {
	      AV.GeoPoint._validate(arg1, arg2);
	      this.latitude = arg1;
	      this.longitude = arg2;
	    } else {
	      this.latitude = 0;
	      this.longitude = 0;
	    }

	    // Add properties so that anyone using Webkit or Mozilla will get an error
	    // if they try to set values that are out of bounds.
	    var self = this;
	    if (this.__defineGetter__ && this.__defineSetter__) {
	      // Use _latitude and _longitude to actually store the values, and add
	      // getters and setters for latitude and longitude.
	      this._latitude = this.latitude;
	      this._longitude = this.longitude;
	      this.__defineGetter__("latitude", function () {
	        return self._latitude;
	      });
	      this.__defineGetter__("longitude", function () {
	        return self._longitude;
	      });
	      this.__defineSetter__("latitude", function (val) {
	        AV.GeoPoint._validate(val, self.longitude);
	        self._latitude = val;
	      });
	      this.__defineSetter__("longitude", function (val) {
	        AV.GeoPoint._validate(self.latitude, val);
	        self._longitude = val;
	      });
	    }
	  };

	  /**
	   * @lends AV.GeoPoint.prototype
	   * @property {float} latitude North-south portion of the coordinate, in range
	   *   [-90, 90].  Throws an exception if set out of range in a modern browser.
	   * @property {float} longitude East-west portion of the coordinate, in range
	   *   [-180, 180].  Throws if set out of range in a modern browser.
	   */

	  /**
	   * Throws an exception if the given lat-long is out of bounds.
	   * @private
	   */
	  AV.GeoPoint._validate = function (latitude, longitude) {
	    if (latitude < -90.0) {
	      throw new Error("AV.GeoPoint latitude " + latitude + " < -90.0.");
	    }
	    if (latitude > 90.0) {
	      throw new Error("AV.GeoPoint latitude " + latitude + " > 90.0.");
	    }
	    if (longitude < -180.0) {
	      throw new Error("AV.GeoPoint longitude " + longitude + " < -180.0.");
	    }
	    if (longitude > 180.0) {
	      throw new Error("AV.GeoPoint longitude " + longitude + " > 180.0.");
	    }
	  };

	  /**
	   * Creates a GeoPoint with the user's current location, if available.
	   * @return {Promise.<AV.GeoPoint>}
	   */
	  AV.GeoPoint.current = function () {
	    return new AV.Promise(function (resolve, reject) {
	      navigator.geolocation.getCurrentPosition(function (location) {
	        resolve(new AV.GeoPoint({
	          latitude: location.coords.latitude,
	          longitude: location.coords.longitude
	        }));
	      }, reject);
	    });
	  };

	  AV.GeoPoint.prototype = {
	    /**
	     * Returns a JSON representation of the GeoPoint, suitable for AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      AV.GeoPoint._validate(this.latitude, this.longitude);
	      return {
	        "__type": "GeoPoint",
	        latitude: this.latitude,
	        longitude: this.longitude
	      };
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in radians.
	     * @param {AV.GeoPoint} point the other AV.GeoPoint.
	     * @return {Number}
	     */
	    radiansTo: function radiansTo(point) {
	      var d2r = Math.PI / 180.0;
	      var lat1rad = this.latitude * d2r;
	      var long1rad = this.longitude * d2r;
	      var lat2rad = point.latitude * d2r;
	      var long2rad = point.longitude * d2r;
	      var deltaLat = lat1rad - lat2rad;
	      var deltaLong = long1rad - long2rad;
	      var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
	      var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
	      // Square of half the straight line chord distance between both points.
	      var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
	      a = Math.min(1.0, a);
	      return 2 * Math.asin(Math.sqrt(a));
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in kilometers.
	     * @param {AV.GeoPoint} point the other AV.GeoPoint.
	     * @return {Number}
	     */
	    kilometersTo: function kilometersTo(point) {
	      return this.radiansTo(point) * 6371.0;
	    },

	    /**
	     * Returns the distance from this GeoPoint to another in miles.
	     * @param {AV.GeoPoint} point the other AV.GeoPoint.
	     * @return {Number}
	     */
	    milesTo: function milesTo(point) {
	      return this.radiansTo(point) * 3958.8;
	    }
	  };
	};

	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var AV = __webpack_require__(4);
	var request = __webpack_require__(1);

	var initialize = function initialize(appId, appKey, masterKey, hookKey) {
	  if (AV.applicationId && appId !== AV.applicationId && appKey !== AV.applicationKey && masterKey !== AV.masterKey) {
	    console.warn('LeanCloud SDK is already initialized, please do not reinitialize it.');
	  }
	  AV.applicationId = appId;
	  AV.applicationKey = appKey;
	  AV.masterKey = masterKey;
	  if (false) {
	    AV.hookKey = hookKey || process.env.LEANCLOUD_APP_HOOK_KEY;
	  }
	  AV._useMasterKey = false;
	};

	var masterKeyWarn = function masterKeyWarn() {
	  console.warn('MasterKey is not supposed to be used in browser.');
	};

	/**
	  * Call this method first to set up your authentication tokens for AV.
	  * You can get your app keys from the LeanCloud dashboard on http://leancloud.cn .
	  * @function AV.init
	  * @param {Object} options
	  * @param {String} options.appId application id
	  * @param {String} options.appKey application key
	  * @param {String} options.masterKey application master key
	*/

	AV.init = function () {
	  switch (arguments.length) {
	    case 1:
	      var options = arguments.length <= 0 ? undefined : arguments[0];
	      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	        if ("Browser" && options.masterKey) {
	          masterKeyWarn();
	        }
	        initialize(options.appId, options.appKey, options.masterKey, options.hookKey);
	        request.setServerUrlByRegion(options.region);
	        AV._config.disableCurrentUser = options.disableCurrentUser;
	      } else {
	        throw new Error('AV.init(): Parameter is not correct.');
	      }
	      break;
	    // 兼容旧版本的初始化方法
	    case 2:
	    case 3:
	      console.warn('Please use AV.init() to replace AV.initialize(), ' + 'AV.init() need an Object param, like { appId: \'YOUR_APP_ID\', appKey: \'YOUR_APP_KEY\' } . ' + 'Docs: https://leancloud.cn/docs/sdk_setup-js.html');
	      if ("Browser" && arguments.length === 3) {
	        masterKeyWarn();
	      }
	      initialize.apply(undefined, arguments);
	      request.setServerUrlByRegion('cn');
	      break;
	  }
	};

	// If we're running in node.js, allow using the master key.
	if (false) {
	  AV.Cloud = AV.Cloud || {};
	  /**
	   * Switches the LeanCloud SDK to using the Master key.  The Master key grants
	   * priveleged access to the data in LeanCloud and can be used to bypass ACLs and
	   * other restrictions that are applied to the client SDKs.
	   * <p><strong><em>Available in Cloud Code and Node.js only.</em></strong>
	   * </p>
	   */
	  AV.Cloud.useMasterKey = function () {
	    AV._useMasterKey = true;
	  };
	}

	// 兼容老版本的初始化方法
	AV.initialize = AV.init;

	/***/ }),
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVError = __webpack_require__(3);
	var AVRequest = __webpack_require__(1).request;

	module.exports = function (AV) {
	  /**
	   * 包含了使用了 LeanCloud
	   *  <a href='/docs/leaninsight_guide.html'>离线数据分析功能</a>的函数。
	   * <p><strong><em>
	   *   仅在云引擎运行环境下有效。
	   * </em></strong></p>
	   * @namespace
	   */
	  AV.Insight = AV.Insight || {};

	  _.extend(AV.Insight, /** @lends AV.Insight */{

	    /**
	     * 开始一个 Insight 任务。结果里将返回 Job id，你可以拿得到的 id 使用
	     * AV.Insight.JobQuery 查询任务状态和结果。
	     * @param {Object} jobConfig 任务配置的 JSON 对象，例如：<code><pre>
	     *                   { "sql" : "select count(*) as c,gender from _User group by gender",
	     *                     "saveAs": {
	     *                         "className" : "UserGender",
	     *                         "limit": 1
	     *                      }
	     *                   }
	     *                  </pre></code>
	     *               sql 指定任务执行的 SQL 语句， saveAs（可选） 指定将结果保存在哪张表里，limit 最大 1000。
	     * @param {AuthOptions} [options]
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    startJob: function startJob(jobConfig, options) {
	      if (!jobConfig || !jobConfig.sql) {
	        throw new Error('Please provide the sql to run the job.');
	      }
	      var data = {
	        jobConfig: jobConfig,
	        appId: AV.applicationId
	      };
	      var request = AVRequest("bigquery", 'jobs', null, 'POST', AV._encode(data, null, true), options);

	      return request.then(function (resp) {
	        return AV._decode(resp).id;
	      });
	    },

	    /**
	     * 监听 Insight 任务事件，目前仅支持 end 事件，表示任务完成。
	     *  <p><strong><em>
	     *     仅在云引擎运行环境下有效。
	     *  </em></strong></p>
	     * @param {String} event 监听的事件，目前仅支持 'end' ，表示任务完成
	     * @param {Function} 监听回调函数，接收 (err, id) 两个参数，err 表示错误信息，
	     *                   id 表示任务 id。接下来你可以拿这个 id 使用AV.Insight.JobQuery 查询任务状态和结果。
	     *
	     */
	    on: function on(event, cb) {}
	  });

	  /**
	   * 创建一个对象，用于查询 Insight 任务状态和结果。
	   * @class
	   * @param {String} id 任务 id
	   * @since 0.5.5
	   */
	  AV.Insight.JobQuery = function (id, className) {
	    if (!id) {
	      throw new Error('Please provide the job id.');
	    }
	    this.id = id;
	    this.className = className;
	    this._skip = 0;
	    this._limit = 100;
	  };

	  AV.Insight.JobQuery.prototype = {

	    /**
	     * Sets the number of results to skip before returning any results.
	     * This is useful for pagination.
	     * Default is to skip zero results.
	     * @param {Number} n the number of results to skip.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    skip: function skip(n) {
	      this._skip = n;
	      return this;
	    },

	    /**
	     * Sets the limit of the number of results to return. The default limit is
	     * 100, with a maximum of 1000 results being returned at a time.
	     * @param {Number} n the number of results to limit to.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    limit: function limit(n) {
	      this._limit = n;
	      return this;
	    },

	    /**
	     * 查询任务状态和结果，任务结果为一个 JSON 对象，包括 status 表示任务状态， totalCount 表示总数，
	     * results 数组表示任务结果数组，previewCount 表示可以返回的结果总数，任务的开始和截止时间
	     * startTime、endTime 等信息。
	     *
	     * @param {AuthOptions} [options]
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     *
	     */
	    find: function find(options) {
	      var params = {
	        skip: this._skip,
	        limit: this._limit
	      };

	      var request = AVRequest("bigquery", 'jobs', this.id, "GET", params, options);
	      var self = this;
	      return request.then(function (response) {
	        if (response.error) {
	          return AV.Promise.reject(new AVError(response.code, response.error));
	        }
	        return AV.Promise.resolve(response);
	      });
	    }

	  };
	};

	/***/ }),
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVError = __webpack_require__(3);
	var AVRequest = __webpack_require__(1).request;
	var utils = __webpack_require__(5);

	var RESERVED_KEYS = ['objectId', 'createdAt', 'updatedAt'];
	var checkReservedKey = function checkReservedKey(key) {
	  if (RESERVED_KEYS.indexOf(key) !== -1) {
	    throw new Error('key[' + key + '] is reserved');
	  }
	};

	// AV.Object is analogous to the Java AVObject.
	// It also implements the same interface as a Backbone model.

	module.exports = function (AV) {
	  /**
	   * Creates a new model with defined attributes. A client id (cid) is
	   * automatically generated and assigned for you.
	   *
	   * <p>You won't normally call this method directly.  It is recommended that
	   * you use a subclass of <code>AV.Object</code> instead, created by calling
	   * <code>extend</code>.</p>
	   *
	   * <p>However, if you don't want to use a subclass, or aren't sure which
	   * subclass is appropriate, you can use this form:<pre>
	   *     var object = new AV.Object("ClassName");
	   * </pre>
	   * That is basically equivalent to:<pre>
	   *     var MyClass = AV.Object.extend("ClassName");
	   *     var object = new MyClass();
	   * </pre></p>
	   *
	   * @param {Object} attributes The initial set of data to store in the object.
	   * @param {Object} options A set of Backbone-like options for creating the
	   *     object.  The only option currently supported is "collection".
	   * @see AV.Object.extend
	   *
	   * @class
	   *
	   * <p>The fundamental unit of AV data, which implements the Backbone Model
	   * interface.</p>
	   */
	  AV.Object = function (attributes, options) {
	    // Allow new AV.Object("ClassName") as a shortcut to _create.
	    if (_.isString(attributes)) {
	      return AV.Object._create.apply(this, arguments);
	    }

	    attributes = attributes || {};
	    if (options && options.parse) {
	      attributes = this.parse(attributes);
	      attributes = this._mergeMagicFields(attributes);
	    }
	    var defaults = AV._getValue(this, 'defaults');
	    if (defaults) {
	      attributes = _.extend({}, defaults, attributes);
	    }
	    if (options && options.collection) {
	      this.collection = options.collection;
	    }

	    this._serverData = {}; // The last known data for this object from cloud.
	    this._opSetQueue = [{}]; // List of sets of changes to the data.
	    this._flags = {};
	    this.attributes = {}; // The best estimate of this's current data.

	    this._hashedJSON = {}; // Hash of values of containers at last save.
	    this._escapedAttributes = {};
	    this.cid = _.uniqueId('c');
	    this.changed = {};
	    this._silent = {};
	    this._pending = {};
	    this.set(attributes, { silent: true });
	    this.changed = {};
	    this._silent = {};
	    this._pending = {};
	    this._hasData = true;
	    this._previousAttributes = _.clone(this.attributes);
	    this.initialize.apply(this, arguments);
	  };

	  /**
	   * @lends AV.Object.prototype
	   * @property {String} id The objectId of the AV Object.
	   */

	  /**
	   * Saves the given list of AV.Object.
	   * If any error is encountered, stops and calls the error handler.
	   *
	   * <pre>
	   *   AV.Object.saveAll([object1, object2, ...]).then(function(list) {
	   *     // All the objects were saved.
	   *   }, function(error) {
	   *     // An error occurred while saving one of the objects.
	   *   });
	   *
	   * @param {Array} list A list of <code>AV.Object</code>.
	   */
	  AV.Object.saveAll = function (list, options) {
	    return AV.Object._deepSaveAsync(list, null, options);
	  };

	  /**
	   * Fetch the given list of AV.Object.
	   *
	   * @param {AV.Object[]} objects A list of <code>AV.Object</code>
	   * @param {AuthOptions} options
	   * @return {Promise.<AV.Object[]>} The given list of <code>AV.Object</code>, updated
	   */

	  AV.Object.fetchAll = function (objects, options) {
	    return AV.Promise.resolve().then(function () {
	      return AVRequest('batch', null, null, 'POST', {
	        requests: _.map(objects, function (object) {
	          if (!object.className) throw new Error('object must have className to fetch');
	          if (!object.id) throw new Error('object must have id to fetch');
	          if (object.dirty()) throw new Error('object is modified but not saved');
	          return {
	            method: 'GET',
	            path: '/1.1/classes/' + object.className + '/' + object.id
	          };
	        })
	      }, options);
	    }).then(function (response) {
	      _.forEach(objects, function (object, i) {
	        if (response[i].success) {
	          object._finishFetch(object.parse(response[i].success));
	        } else {
	          var error = new Error(response[i].error.error);
	          error.code = response[i].error.code;
	          throw error;
	        }
	      });
	      return objects;
	    });
	  };

	  // Attach all inheritable methods to the AV.Object prototype.
	  _.extend(AV.Object.prototype, AV.Events,
	  /** @lends AV.Object.prototype */{
	    _fetchWhenSave: false,

	    /**
	     * Initialize is an empty function by default. Override it with your own
	     * initialization logic.
	     */
	    initialize: function initialize() {},

	    /**
	      * Set whether to enable fetchWhenSave option when updating object.
	      * When set true, SDK would fetch the latest object after saving.
	      * Default is false.
	      *
	      * @deprecated use AV.Object#save with options.fetchWhenSave instead
	      * @param {boolean} enable  true to enable fetchWhenSave option.
	      */
	    fetchWhenSave: function fetchWhenSave(enable) {
	      console.warn('AV.Object#fetchWhenSave is deprecated, use AV.Object#save with options.fetchWhenSave instead.');
	      if (!_.isBoolean(enable)) {
	        throw new Error('Expect boolean value for fetchWhenSave');
	      }
	      this._fetchWhenSave = enable;
	    },

	    /**
	     * Returns the object's objectId.
	     * @return {String} the objectId.
	     */
	    getObjectId: function getObjectId() {
	      return this.id;
	    },

	    /**
	     * Returns the object's createdAt attribute.
	     * @return {Date}
	     */
	    getCreatedAt: function getCreatedAt() {
	      return this.createdAt || this.get('createdAt');
	    },

	    /**
	     * Returns the object's updatedAt attribute.
	     * @return {Date}
	     */
	    getUpdatedAt: function getUpdatedAt() {
	      return this.updatedAt || this.get('updatedAt');
	    },

	    /**
	     * Returns a JSON version of the object suitable for saving to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      var json = this._toFullJSON();
	      AV._arrayEach(["__type", "className"], function (key) {
	        delete json[key];
	      });
	      return json;
	    },

	    _toFullJSON: function _toFullJSON(seenObjects) {
	      var json = _.clone(this.attributes);
	      AV._objectEach(json, function (val, key) {
	        json[key] = AV._encode(val, seenObjects);
	      });
	      AV._objectEach(this._operations, function (val, key) {
	        json[key] = val;
	      });

	      if (_.has(this, "id")) {
	        json.objectId = this.id;
	      }
	      if (_.has(this, "createdAt")) {
	        if (_.isDate(this.createdAt)) {
	          json.createdAt = this.createdAt.toJSON();
	        } else {
	          json.createdAt = this.createdAt;
	        }
	      }

	      if (_.has(this, "updatedAt")) {
	        if (_.isDate(this.updatedAt)) {
	          json.updatedAt = this.updatedAt.toJSON();
	        } else {
	          json.updatedAt = this.updatedAt;
	        }
	      }
	      json.__type = "Object";
	      json.className = this.className;
	      return json;
	    },

	    /**
	     * Updates _hashedJSON to reflect the current state of this object.
	     * Adds any changed hash values to the set of pending changes.
	     * @private
	     */
	    _refreshCache: function _refreshCache() {
	      var self = this;
	      if (self._refreshingCache) {
	        return;
	      }
	      self._refreshingCache = true;
	      AV._objectEach(this.attributes, function (value, key) {
	        if (value instanceof AV.Object) {
	          value._refreshCache();
	        } else if (_.isObject(value)) {
	          if (self._resetCacheForKey(key)) {
	            self.set(key, new AV.Op.Set(value), { silent: true });
	          }
	        }
	      });
	      delete self._refreshingCache;
	    },

	    /**
	     * Returns true if this object has been modified since its last
	     * save/refresh.  If an attribute is specified, it returns true only if that
	     * particular attribute has been modified since the last save/refresh.
	     * @param {String} attr An attribute name (optional).
	     * @return {Boolean}
	     */
	    dirty: function dirty(attr) {
	      this._refreshCache();

	      var currentChanges = _.last(this._opSetQueue);

	      if (attr) {
	        return currentChanges[attr] ? true : false;
	      }
	      if (!this.id) {
	        return true;
	      }
	      if (_.keys(currentChanges).length > 0) {
	        return true;
	      }
	      return false;
	    },

	    /**
	     * Gets a Pointer referencing this Object.
	     * @private
	     */
	    _toPointer: function _toPointer() {
	      // if (!this.id) {
	      //   throw new Error("Can't serialize an unsaved AV.Object");
	      // }
	      return { __type: "Pointer",
	        className: this.className,
	        objectId: this.id };
	    },

	    /**
	     * Gets the value of an attribute.
	     * @param {String} attr The string name of an attribute.
	     */
	    get: function get(attr) {
	      switch (attr) {
	        case 'objectId':
	          return this.id;
	        case 'createdAt':
	        case 'updatedAt':
	          return this[attr];
	        default:
	          return this.attributes[attr];
	      }
	    },

	    /**
	     * Gets a relation on the given class for the attribute.
	     * @param {String} attr The attribute to get the relation for.
	     * @return {AV.Relation}
	     */
	    relation: function relation(attr) {
	      var value = this.get(attr);
	      if (value) {
	        if (!(value instanceof AV.Relation)) {
	          throw new Error("Called relation() on non-relation field " + attr);
	        }
	        value._ensureParentAndKey(this, attr);
	        return value;
	      } else {
	        return new AV.Relation(this, attr);
	      }
	    },

	    /**
	     * Gets the HTML-escaped value of an attribute.
	     */
	    escape: function escape(attr) {
	      var html = this._escapedAttributes[attr];
	      if (html) {
	        return html;
	      }
	      var val = this.attributes[attr];
	      var escaped;
	      if (utils.isNullOrUndefined(val)) {
	        escaped = '';
	      } else {
	        escaped = _.escape(val.toString());
	      }
	      this._escapedAttributes[attr] = escaped;
	      return escaped;
	    },

	    /**
	     * Returns <code>true</code> if the attribute contains a value that is not
	     * null or undefined.
	     * @param {String} attr The string name of the attribute.
	     * @return {Boolean}
	     */
	    has: function has(attr) {
	      return !utils.isNullOrUndefined(this.attributes[attr]);
	    },

	    /**
	     * Pulls "special" fields like objectId, createdAt, etc. out of attrs
	     * and puts them on "this" directly.  Removes them from attrs.
	     * @param attrs - A dictionary with the data for this AV.Object.
	     * @private
	     */
	    _mergeMagicFields: function _mergeMagicFields(attrs) {
	      // Check for changes of magic fields.
	      var model = this;
	      var specialFields = ["objectId", "createdAt", "updatedAt"];
	      AV._arrayEach(specialFields, function (attr) {
	        if (attrs[attr]) {
	          if (attr === "objectId") {
	            model.id = attrs[attr];
	          } else if ((attr === "createdAt" || attr === "updatedAt") && !_.isDate(attrs[attr])) {
	            model[attr] = AV._parseDate(attrs[attr]);
	          } else {
	            model[attr] = attrs[attr];
	          }
	          delete attrs[attr];
	        }
	      });
	      return attrs;
	    },

	    /**
	     * Returns the json to be sent to the server.
	     * @private
	     */
	    _startSave: function _startSave() {
	      this._opSetQueue.push({});
	    },

	    /**
	     * Called when a save fails because of an error. Any changes that were part
	     * of the save need to be merged with changes made after the save. This
	     * might throw an exception is you do conflicting operations. For example,
	     * if you do:
	     *   object.set("foo", "bar");
	     *   object.set("invalid field name", "baz");
	     *   object.save();
	     *   object.increment("foo");
	     * then this will throw when the save fails and the client tries to merge
	     * "bar" with the +1.
	     * @private
	     */
	    _cancelSave: function _cancelSave() {
	      var self = this;
	      var failedChanges = _.first(this._opSetQueue);
	      this._opSetQueue = _.rest(this._opSetQueue);
	      var nextChanges = _.first(this._opSetQueue);
	      AV._objectEach(failedChanges, function (op, key) {
	        var op1 = failedChanges[key];
	        var op2 = nextChanges[key];
	        if (op1 && op2) {
	          nextChanges[key] = op2._mergeWithPrevious(op1);
	        } else if (op1) {
	          nextChanges[key] = op1;
	        }
	      });
	      this._saving = this._saving - 1;
	    },

	    /**
	     * Called when a save completes successfully. This merges the changes that
	     * were saved into the known server data, and overrides it with any data
	     * sent directly from the server.
	     * @private
	     */
	    _finishSave: function _finishSave(serverData) {
	      // Grab a copy of any object referenced by this object. These instances
	      // may have already been fetched, and we don't want to lose their data.
	      // Note that doing it like this means we will unify separate copies of the
	      // same object, but that's a risk we have to take.
	      var fetchedObjects = {};
	      AV._traverse(this.attributes, function (object) {
	        if (object instanceof AV.Object && object.id && object._hasData) {
	          fetchedObjects[object.id] = object;
	        }
	      });

	      var savedChanges = _.first(this._opSetQueue);
	      this._opSetQueue = _.rest(this._opSetQueue);
	      this._applyOpSet(savedChanges, this._serverData);
	      this._mergeMagicFields(serverData);
	      var self = this;
	      AV._objectEach(serverData, function (value, key) {
	        self._serverData[key] = AV._decode(value, key);

	        // Look for any objects that might have become unfetched and fix them
	        // by replacing their values with the previously observed values.
	        var fetched = AV._traverse(self._serverData[key], function (object) {
	          if (object instanceof AV.Object && fetchedObjects[object.id]) {
	            return fetchedObjects[object.id];
	          }
	        });
	        if (fetched) {
	          self._serverData[key] = fetched;
	        }
	      });
	      this._rebuildAllEstimatedData();
	      this._saving = this._saving - 1;
	    },

	    /**
	     * Called when a fetch or login is complete to set the known server data to
	     * the given object.
	     * @private
	     */
	    _finishFetch: function _finishFetch(serverData, hasData) {
	      // Clear out any changes the user might have made previously.
	      this._opSetQueue = [{}];

	      // Bring in all the new server data.
	      this._mergeMagicFields(serverData);
	      var self = this;
	      AV._objectEach(serverData, function (value, key) {
	        self._serverData[key] = AV._decode(value, key);
	      });

	      // Refresh the attributes.
	      this._rebuildAllEstimatedData();

	      // Clear out the cache of mutable containers.
	      this._refreshCache();
	      this._opSetQueue = [{}];

	      this._hasData = hasData;
	    },

	    /**
	     * Applies the set of AV.Op in opSet to the object target.
	     * @private
	     */
	    _applyOpSet: function _applyOpSet(opSet, target) {
	      var self = this;
	      AV._objectEach(opSet, function (change, key) {
	        target[key] = change._estimate(target[key], self, key);
	        if (target[key] === AV.Op._UNSET) {
	          delete target[key];
	        }
	      });
	    },

	    /**
	     * Replaces the cached value for key with the current value.
	     * Returns true if the new value is different than the old value.
	     * @private
	     */
	    _resetCacheForKey: function _resetCacheForKey(key) {
	      var value = this.attributes[key];
	      if (_.isObject(value) && !(value instanceof AV.Object) && !(value instanceof AV.File)) {

	        value = value.toJSON ? value.toJSON() : value;
	        var json = JSON.stringify(value);
	        if (this._hashedJSON[key] !== json) {
	          var wasSet = !!this._hashedJSON[key];
	          this._hashedJSON[key] = json;
	          return wasSet;
	        }
	      }
	      return false;
	    },

	    /**
	     * Populates attributes[key] by starting with the last known data from the
	     * server, and applying all of the local changes that have been made to that
	     * key since then.
	     * @private
	     */
	    _rebuildEstimatedDataForKey: function _rebuildEstimatedDataForKey(key) {
	      var self = this;
	      delete this.attributes[key];
	      if (this._serverData[key]) {
	        this.attributes[key] = this._serverData[key];
	      }
	      AV._arrayEach(this._opSetQueue, function (opSet) {
	        var op = opSet[key];
	        if (op) {
	          self.attributes[key] = op._estimate(self.attributes[key], self, key);
	          if (self.attributes[key] === AV.Op._UNSET) {
	            delete self.attributes[key];
	          } else {
	            self._resetCacheForKey(key);
	          }
	        }
	      });
	    },

	    /**
	     * Populates attributes by starting with the last known data from the
	     * server, and applying all of the local changes that have been made since
	     * then.
	     * @private
	     */
	    _rebuildAllEstimatedData: function _rebuildAllEstimatedData() {
	      var self = this;

	      var previousAttributes = _.clone(this.attributes);

	      this.attributes = _.clone(this._serverData);
	      AV._arrayEach(this._opSetQueue, function (opSet) {
	        self._applyOpSet(opSet, self.attributes);
	        AV._objectEach(opSet, function (op, key) {
	          self._resetCacheForKey(key);
	        });
	      });

	      // Trigger change events for anything that changed because of the fetch.
	      AV._objectEach(previousAttributes, function (oldValue, key) {
	        if (self.attributes[key] !== oldValue) {
	          self.trigger('change:' + key, self, self.attributes[key], {});
	        }
	      });
	      AV._objectEach(this.attributes, function (newValue, key) {
	        if (!_.has(previousAttributes, key)) {
	          self.trigger('change:' + key, self, newValue, {});
	        }
	      });
	    },

	    /**
	     * Sets a hash of model attributes on the object, firing
	     * <code>"change"</code> unless you choose to silence it.
	     *
	     * <p>You can call it with an object containing keys and values, or with one
	     * key and value.  For example:<pre>
	     *   gameTurn.set({
	     *     player: player1,
	     *     diceRoll: 2
	     *   }, {
	     *     error: function(gameTurnAgain, error) {
	     *       // The set failed validation.
	     *     }
	     *   });
	     *
	     *   game.set("currentPlayer", player2, {
	     *     error: function(gameTurnAgain, error) {
	     *       // The set failed validation.
	     *     }
	     *   });
	     *
	     *   game.set("finished", true);</pre></p>
	     *
	     * @param {String} key The key to set.
	     * @param {Any} value The value to give it.
	     * @param {Object} [options]
	     * @param {Boolean} [options.silent]
	     * @return {AV.Object} self if succeeded, throws if the value is not valid.
	     * @see AV.Object#validate
	     */
	    set: function set(key, value, options) {
	      var attrs;
	      if (_.isObject(key) || utils.isNullOrUndefined(key)) {
	        attrs = _.mapObject(key, function (v, k) {
	          checkReservedKey(k);
	          return AV._decode(v, k);
	        });
	        options = value;
	      } else {
	        attrs = {};
	        checkReservedKey(key);
	        attrs[key] = AV._decode(value, key);
	      }

	      // Extract attributes and options.
	      options = options || {};
	      if (!attrs) {
	        return this;
	      }
	      if (attrs instanceof AV.Object) {
	        attrs = attrs.attributes;
	      }

	      // If the unset option is used, every attribute should be a Unset.
	      if (options.unset) {
	        AV._objectEach(attrs, function (unused_value, key) {
	          attrs[key] = new AV.Op.Unset();
	        });
	      }

	      // Apply all the attributes to get the estimated values.
	      var dataToValidate = _.clone(attrs);
	      var self = this;
	      AV._objectEach(dataToValidate, function (value, key) {
	        if (value instanceof AV.Op) {
	          dataToValidate[key] = value._estimate(self.attributes[key], self, key);
	          if (dataToValidate[key] === AV.Op._UNSET) {
	            delete dataToValidate[key];
	          }
	        }
	      });

	      // Run validation.
	      this._validate(attrs, options);

	      options.changes = {};
	      var escaped = this._escapedAttributes;
	      var prev = this._previousAttributes || {};

	      // Update attributes.
	      AV._arrayEach(_.keys(attrs), function (attr) {
	        var val = attrs[attr];

	        // If this is a relation object we need to set the parent correctly,
	        // since the location where it was parsed does not have access to
	        // this object.
	        if (val instanceof AV.Relation) {
	          val.parent = self;
	        }

	        if (!(val instanceof AV.Op)) {
	          val = new AV.Op.Set(val);
	        }

	        // See if this change will actually have any effect.
	        var isRealChange = true;
	        if (val instanceof AV.Op.Set && _.isEqual(self.attributes[attr], val.value)) {
	          isRealChange = false;
	        }

	        if (isRealChange) {
	          delete escaped[attr];
	          if (options.silent) {
	            self._silent[attr] = true;
	          } else {
	            options.changes[attr] = true;
	          }
	        }

	        var currentChanges = _.last(self._opSetQueue);
	        currentChanges[attr] = val._mergeWithPrevious(currentChanges[attr]);
	        self._rebuildEstimatedDataForKey(attr);

	        if (isRealChange) {
	          self.changed[attr] = self.attributes[attr];
	          if (!options.silent) {
	            self._pending[attr] = true;
	          }
	        } else {
	          delete self.changed[attr];
	          delete self._pending[attr];
	        }
	      });

	      if (!options.silent) {
	        this.change(options);
	      }
	      return this;
	    },

	    /**
	     * Remove an attribute from the model, firing <code>"change"</code> unless
	     * you choose to silence it. This is a noop if the attribute doesn't
	     * exist.
	     */
	    unset: function unset(attr, options) {
	      options = options || {};
	      options.unset = true;
	      return this.set(attr, null, options);
	    },

	    /**
	     * Atomically increments the value of the given attribute the next time the
	     * object is saved. If no amount is specified, 1 is used by default.
	     *
	     * @param attr {String} The key.
	     * @param amount {Number} The amount to increment by.
	     */
	    increment: function increment(attr, amount) {
	      if (_.isUndefined(amount) || _.isNull(amount)) {
	        amount = 1;
	      }
	      return this.set(attr, new AV.Op.Increment(amount));
	    },

	    /**
	     * Atomically add an object to the end of the array associated with a given
	     * key.
	     * @param attr {String} The key.
	     * @param item {} The item to add.
	     */
	    add: function add(attr, item) {
	      return this.set(attr, new AV.Op.Add(utils.ensureArray(item)));
	    },

	    /**
	     * Atomically add an object to the array associated with a given key, only
	     * if it is not already present in the array. The position of the insert is
	     * not guaranteed.
	     *
	     * @param attr {String} The key.
	     * @param item {} The object to add.
	     */
	    addUnique: function addUnique(attr, item) {
	      return this.set(attr, new AV.Op.AddUnique(utils.ensureArray(item)));
	    },

	    /**
	     * Atomically remove all instances of an object from the array associated
	     * with a given key.
	     *
	     * @param attr {String} The key.
	     * @param item {} The object to remove.
	     */
	    remove: function remove(attr, item) {
	      return this.set(attr, new AV.Op.Remove(utils.ensureArray(item)));
	    },

	    /**
	     * Returns an instance of a subclass of AV.Op describing what kind of
	     * modification has been performed on this field since the last time it was
	     * saved. For example, after calling object.increment("x"), calling
	     * object.op("x") would return an instance of AV.Op.Increment.
	     *
	     * @param attr {String} The key.
	     * @returns {AV.Op} The operation, or undefined if none.
	     */
	    op: function op(attr) {
	      return _.last(this._opSetQueue)[attr];
	    },

	    /**
	     * Clear all attributes on the model, firing <code>"change"</code> unless
	     * you choose to silence it.
	     */
	    clear: function clear(options) {
	      options = options || {};
	      options.unset = true;
	      var keysToClear = _.extend(this.attributes, this._operations);
	      return this.set(keysToClear, options);
	    },

	    /**
	     * Returns a JSON-encoded set of operations to be sent with the next save
	     * request.
	     * @private
	     */
	    _getSaveJSON: function _getSaveJSON() {
	      var json = _.clone(_.first(this._opSetQueue));
	      AV._objectEach(json, function (op, key) {
	        json[key] = op.toJSON();
	      });
	      return json;
	    },

	    /**
	     * Returns true if this object can be serialized for saving.
	     * @private
	     */
	    _canBeSerialized: function _canBeSerialized() {
	      return AV.Object._canBeSerializedAsValue(this.attributes);
	    },

	    /**
	     * Fetch the model from the server. If the server's representation of the
	     * model differs from its current attributes, they will be overriden,
	     * triggering a <code>"change"</code> event.
	     * @param {Object} fetchOptions Optional options to set 'keys' and
	     *      'include' option.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the fetch
	     *     completes.
	     */
	    fetch: function fetch() {
	      var fetchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var options = arguments[1];

	      if (_.isArray(fetchOptions.keys)) {
	        fetchOptions.keys = fetchOptions.keys.join(',');
	      }
	      if (_.isArray(fetchOptions.include)) {
	        fetchOptions.include = fetchOptions.include.join(',');
	      }

	      var self = this;
	      var request = AVRequest('classes', this.className, this.id, 'GET', fetchOptions, options);
	      return request.then(function (response) {
	        self._finishFetch(self.parse(response), true);
	        return self;
	      });
	    },

	    /**
	     * Set a hash of model attributes, and save the model to the server.
	     * updatedAt will be updated when the request returns.
	     * You can either call it as:<pre>
	     *   object.save();</pre>
	     * or<pre>
	     *   object.save(null, options);</pre>
	     * or<pre>
	     *   object.save(attrs, options);</pre>
	     * or<pre>
	     *   object.save(key, value, options);</pre>
	     *
	     * For example, <pre>
	     *   gameTurn.save({
	     *     player: "Jake Cutter",
	     *     diceRoll: 2
	     *   }).then(function(gameTurnAgain) {
	     *     // The save was successful.
	     *   }, function(error) {
	     *     // The save failed.  Error is an instance of AVError.
	     *   });</pre>
	     * @param {AuthOptions} options AuthOptions plus:
	     * @param {Boolean} options.fetchWhenSave fetch and update object after save succeeded
	     * @param {AV.Query} options.query Save object only when it matches the query
	     * @return {AV.Promise} A promise that is fulfilled when the save
	     *     completes.
	     * @see AVError
	     */
	    save: function save(arg1, arg2, arg3) {
	      var i, attrs, current, options, saved;
	      if (_.isObject(arg1) || utils.isNullOrUndefined(arg1)) {
	        attrs = arg1;
	        options = arg2;
	      } else {
	        attrs = {};
	        attrs[arg1] = arg2;
	        options = arg3;
	      }

	      options = _.clone(options) || {};
	      if (options.wait) {
	        current = _.clone(this.attributes);
	      }

	      var setOptions = _.clone(options) || {};
	      if (setOptions.wait) {
	        setOptions.silent = true;
	      }
	      if (attrs) {
	        this.set(attrs, setOptions);
	      }

	      var model = this;

	      // If there is any unsaved child, save it first.
	      model._refreshCache();

	      var unsavedChildren = [];
	      var unsavedFiles = [];
	      AV.Object._findUnsavedChildren(model.attributes, unsavedChildren, unsavedFiles);
	      if (unsavedChildren.length + unsavedFiles.length > 0) {
	        return AV.Object._deepSaveAsync(this.attributes, model, options).then(function () {
	          return model.save(null, options);
	        });
	      }

	      this._startSave();
	      this._saving = (this._saving || 0) + 1;

	      this._allPreviousSaves = this._allPreviousSaves || AV.Promise.resolve();
	      this._allPreviousSaves = this._allPreviousSaves.catch(function (e) {}).then(function () {
	        var method = model.id ? 'PUT' : 'POST';

	        var json = model._getSaveJSON();

	        if (model._fetchWhenSave) {
	          //Sepcial-case fetchWhenSave when updating object.
	          json._fetchWhenSave = true;
	        }

	        if (options.fetchWhenSave) {
	          json._fetchWhenSave = true;
	        }
	        if (options.query) {
	          var queryJSON;
	          if (typeof options.query.toJSON === 'function') {
	            queryJSON = options.query.toJSON();
	            if (queryJSON) {
	              json._where = queryJSON.where;
	            }
	          }
	          if (!json._where) {
	            var error = new Error('options.query is not an AV.Query');
	            throw error;
	          }
	        }

	        _.extend(json, model._flags);

	        var route = "classes";
	        var className = model.className;
	        if (model.className === "_User" && !model.id) {
	          // Special-case user sign-up.
	          route = "users";
	          className = null;
	        }
	        //hook makeRequest in options.
	        var makeRequest = options._makeRequest || AVRequest;
	        var request = makeRequest(route, className, model.id, method, json, options);

	        request = request.then(function (resp) {
	          var serverAttrs = model.parse(resp);
	          if (options.wait) {
	            serverAttrs = _.extend(attrs || {}, serverAttrs);
	          }
	          model._finishSave(serverAttrs);
	          if (options.wait) {
	            model.set(current, setOptions);
	          }
	          return model;
	        }, function (error) {
	          model._cancelSave();
	          throw error;
	        });

	        return request;
	      });
	      return this._allPreviousSaves;
	    },

	    /**
	     * Destroy this model on the server if it was already persisted.
	     * Optimistically removes the model from its collection, if it has one.
	     * @param {AuthOptions} options AuthOptions plus:
	     * @param {Boolean} [options.wait] wait for the server to respond
	     * before removal.
	     *
	     * @return {Promise} A promise that is fulfilled when the destroy
	     *     completes.
	     */
	    destroy: function destroy(options) {
	      options = options || {};
	      var model = this;

	      var triggerDestroy = function triggerDestroy() {
	        model.trigger('destroy', model, model.collection, options);
	      };

	      if (!this.id) {
	        return triggerDestroy();
	      }

	      if (!options.wait) {
	        triggerDestroy();
	      }

	      var request = AVRequest('classes', this.className, this.id, 'DELETE', this._flags, options);
	      return request.then(function () {
	        if (options.wait) {
	          triggerDestroy();
	        }
	        return model;
	      });
	    },

	    /**
	     * Converts a response into the hash of attributes to be set on the model.
	     * @ignore
	     */
	    parse: function parse(resp) {
	      var output = _.clone(resp);
	      _(["createdAt", "updatedAt"]).each(function (key) {
	        if (output[key]) {
	          output[key] = AV._parseDate(output[key]);
	        }
	      });
	      if (!output.updatedAt) {
	        output.updatedAt = output.createdAt;
	      }
	      return output;
	    },

	    /**
	     * Creates a new model with identical attributes to this one.
	     * @return {AV.Object}
	     */
	    clone: function clone() {
	      return new this.constructor(this.attributes);
	    },

	    /**
	     * Returns true if this object has never been saved to AV.
	     * @return {Boolean}
	     */
	    isNew: function isNew() {
	      return !this.id;
	    },

	    /**
	     * Call this method to manually fire a `"change"` event for this model and
	     * a `"change:attribute"` event for each changed attribute.
	     * Calling this will cause all objects observing the model to update.
	     */
	    change: function change(options) {
	      options = options || {};
	      var changing = this._changing;
	      this._changing = true;

	      // Silent changes become pending changes.
	      var self = this;
	      AV._objectEach(this._silent, function (attr) {
	        self._pending[attr] = true;
	      });

	      // Silent changes are triggered.
	      var changes = _.extend({}, options.changes, this._silent);
	      this._silent = {};
	      AV._objectEach(changes, function (unused_value, attr) {
	        self.trigger('change:' + attr, self, self.get(attr), options);
	      });
	      if (changing) {
	        return this;
	      }

	      // This is to get around lint not letting us make a function in a loop.
	      var deleteChanged = function deleteChanged(value, attr) {
	        if (!self._pending[attr] && !self._silent[attr]) {
	          delete self.changed[attr];
	        }
	      };

	      // Continue firing `"change"` events while there are pending changes.
	      while (!_.isEmpty(this._pending)) {
	        this._pending = {};
	        this.trigger('change', this, options);
	        // Pending and silent changes still remain.
	        AV._objectEach(this.changed, deleteChanged);
	        self._previousAttributes = _.clone(this.attributes);
	      }

	      this._changing = false;
	      return this;
	    },

	    /**
	     * Determine if the model has changed since the last <code>"change"</code>
	     * event.  If you specify an attribute name, determine if that attribute
	     * has changed.
	     * @param {String} attr Optional attribute name
	     * @return {Boolean}
	     */
	    hasChanged: function hasChanged(attr) {
	      if (!arguments.length) {
	        return !_.isEmpty(this.changed);
	      }
	      return this.changed && _.has(this.changed, attr);
	    },

	    /**
	     * Returns an object containing all the attributes that have changed, or
	     * false if there are no changed attributes. Useful for determining what
	     * parts of a view need to be updated and/or what attributes need to be
	     * persisted to the server. Unset attributes will be set to undefined.
	     * You can also pass an attributes object to diff against the model,
	     * determining if there *would be* a change.
	     */
	    changedAttributes: function changedAttributes(diff) {
	      if (!diff) {
	        return this.hasChanged() ? _.clone(this.changed) : false;
	      }
	      var changed = {};
	      var old = this._previousAttributes;
	      AV._objectEach(diff, function (diffVal, attr) {
	        if (!_.isEqual(old[attr], diffVal)) {
	          changed[attr] = diffVal;
	        }
	      });
	      return changed;
	    },

	    /**
	     * Gets the previous value of an attribute, recorded at the time the last
	     * <code>"change"</code> event was fired.
	     * @param {String} attr Name of the attribute to get.
	     */
	    previous: function previous(attr) {
	      if (!arguments.length || !this._previousAttributes) {
	        return null;
	      }
	      return this._previousAttributes[attr];
	    },

	    /**
	     * Gets all of the attributes of the model at the time of the previous
	     * <code>"change"</code> event.
	     * @return {Object}
	     */
	    previousAttributes: function previousAttributes() {
	      return _.clone(this._previousAttributes);
	    },

	    /**
	     * Checks if the model is currently in a valid state. It's only possible to
	     * get into an *invalid* state if you're using silent changes.
	     * @return {Boolean}
	     */
	    isValid: function isValid() {
	      try {
	        this.validate(this.attributes);
	      } catch (error) {
	        return false;
	      }
	      return true;
	    },

	    /**
	     * You should not call this function directly unless you subclass
	     * <code>AV.Object</code>, in which case you can override this method
	     * to provide additional validation on <code>set</code> and
	     * <code>save</code>.  Your implementation should throw an Error if
	     * the attrs is invalid
	     *
	     * @param {Object} attrs The current data to validate.
	     * @see AV.Object#set
	     */
	    validate: function validate(attrs) {
	      if (_.has(attrs, "ACL") && !(attrs.ACL instanceof AV.ACL)) {
	        throw new AVError(AVError.OTHER_CAUSE, "ACL must be a AV.ACL.");
	      }
	    },

	    /**
	     * Run validation against a set of incoming attributes, returning `true`
	     * if all is well. If a specific `error` callback has been passed,
	     * call that instead of firing the general `"error"` event.
	     * @private
	     */
	    _validate: function _validate(attrs, options) {
	      if (options.silent || !this.validate) {
	        return;
	      }
	      attrs = _.extend({}, this.attributes, attrs);
	      this.validate(attrs);
	    },

	    /**
	     * Returns the ACL for this object.
	     * @returns {AV.ACL} An instance of AV.ACL.
	     * @see AV.Object#get
	     */
	    getACL: function getACL() {
	      return this.get("ACL");
	    },

	    /**
	     * Sets the ACL to be used for this object.
	     * @param {AV.ACL} acl An instance of AV.ACL.
	     * @param {Object} options Optional Backbone-like options object to be
	     *     passed in to set.
	     * @return {Boolean} Whether the set passed validation.
	     * @see AV.Object#set
	     */
	    setACL: function setACL(acl, options) {
	      return this.set("ACL", acl, options);
	    },

	    disableBeforeHook: function disableBeforeHook() {
	      this.ignoreHook('beforeSave');
	      this.ignoreHook('beforeUpdate');
	      this.ignoreHook('beforeDelete');
	    },

	    disableAfterHook: function disableAfterHook() {
	      this.ignoreHook('afterSave');
	      this.ignoreHook('afterUpdate');
	      this.ignoreHook('afterDelete');
	    },

	    ignoreHook: function ignoreHook(hookName) {
	      if (!_.contains(['beforeSave', 'afterSave', 'beforeUpdate', 'afterUpdate', 'beforeDelete', 'afterDelete'], hookName)) {
	        console.trace('Unsupported hookName: ' + hookName);
	      }

	      if (!AV.hookKey) {
	        console.trace('ignoreHook required hookKey');
	      }

	      if (!this._flags.__ignore_hooks) {
	        this._flags.__ignore_hooks = [];
	      }

	      this._flags.__ignore_hooks.push(hookName);
	    }
	  });

	  /**
	   * Creates an instance of a subclass of AV.Object for the give classname
	   * and id.
	   * @param  {String} className The name of the AV class backing this model.
	   * @param {String} id The object id of this model.
	   * @return {AV.Object} A new subclass instance of AV.Object.
	   */
	  AV.Object.createWithoutData = function (className, id, hasData) {
	    var result = new AV.Object(className);
	    result.id = id;
	    result._hasData = hasData;
	    return result;
	  };
	  /**
	   * Delete objects in batch.
	   * @param {AV.Object[]} objects The <code>AV.Object</code> array to be deleted.
	   * @param {AuthOptions} options
	   * @return {Promise} A promise that is fulfilled when the save
	   *     completes.
	   */
	  AV.Object.destroyAll = function (objects) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (!objects || objects.length === 0) {
	      return AV.Promise.resolve();
	    }
	    var objectsByClassNameAndFlags = _.groupBy(objects, function (object) {
	      return JSON.stringify({
	        className: object.className,
	        flags: object._flags
	      });
	    });
	    var body = {
	      requests: _.map(objectsByClassNameAndFlags, function (objects) {
	        var ids = _.map(objects, 'id').join(',');
	        return {
	          method: 'DELETE',
	          path: '/1.1/classes/' + objects[0].className + '/' + ids,
	          body: objects[0]._flags
	        };
	      })
	    };
	    return AVRequest('batch', null, null, 'POST', body, options);
	  };

	  /**
	   * Returns the appropriate subclass for making new instances of the given
	   * className string.
	   * @private
	   */
	  AV.Object._getSubclass = function (className) {
	    if (!_.isString(className)) {
	      throw new Error('AV.Object._getSubclass requires a string argument.');
	    }
	    var ObjectClass = AV.Object._classMap[className];
	    if (!ObjectClass) {
	      ObjectClass = AV.Object.extend(className);
	      AV.Object._classMap[className] = ObjectClass;
	    }
	    return ObjectClass;
	  };

	  /**
	   * Creates an instance of a subclass of AV.Object for the given classname.
	   * @private
	   */
	  AV.Object._create = function (className, attributes, options) {
	    var ObjectClass = AV.Object._getSubclass(className);
	    return new ObjectClass(attributes, options);
	  };

	  // Set up a map of className to class so that we can create new instances of
	  // AV Objects from JSON automatically.
	  AV.Object._classMap = {};

	  AV.Object._extend = AV._extend;

	  /**
	   * Creates a new model with defined attributes,
	   * It's the same with
	   * <pre>
	   *   new AV.Object(attributes, options);
	   *  </pre>
	   * @param {Object} attributes The initial set of data to store in the object.
	   * @param {Object} options A set of Backbone-like options for creating the
	   *     object.  The only option currently supported is "collection".
	   * @return {AV.Object}
	   * @since v0.4.4
	   * @see AV.Object
	   * @see AV.Object.extend
	   */
	  AV.Object['new'] = function (attributes, options) {
	    return new AV.Object(attributes, options);
	  };

	  /**
	   * Creates a new subclass of AV.Object for the given AV class name.
	   *
	   * <p>Every extension of a AV class will inherit from the most recent
	   * previous extension of that class. When a AV.Object is automatically
	   * created by parsing JSON, it will use the most recent extension of that
	   * class.</p>
	   *
	   * <p>You should call either:<pre>
	   *     var MyClass = AV.Object.extend("MyClass", {
	   *         <i>Instance properties</i>
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre>
	   * or, for Backbone compatibility:<pre>
	   *     var MyClass = AV.Object.extend({
	   *         className: "MyClass",
	   *         <i>Other instance properties</i>
	   *     }, {
	   *         <i>Class properties</i>
	   *     });</pre></p>
	   *
	   * @param {String} className The name of the AV class backing this model.
	   * @param {Object} protoProps Instance properties to add to instances of the
	   *     class returned from this method.
	   * @param {Object} classProps Class properties to add the class returned from
	   *     this method.
	   * @return {Class} A new subclass of AV.Object.
	   */
	  AV.Object.extend = function (className, protoProps, classProps) {
	    // Handle the case with only two args.
	    if (!_.isString(className)) {
	      if (className && _.has(className, "className")) {
	        return AV.Object.extend(className.className, className, protoProps);
	      } else {
	        throw new Error("AV.Object.extend's first argument should be the className.");
	      }
	    }

	    // If someone tries to subclass "User", coerce it to the right type.
	    if (className === "User") {
	      className = "_User";
	    }

	    var NewClassObject = null;
	    if (_.has(AV.Object._classMap, className)) {
	      var OldClassObject = AV.Object._classMap[className];
	      // This new subclass has been told to extend both from "this" and from
	      // OldClassObject. This is multiple inheritance, which isn't supported.
	      // For now, let's just pick one.
	      if (protoProps || classProps) {
	        NewClassObject = OldClassObject._extend(protoProps, classProps);
	      } else {
	        return OldClassObject;
	      }
	    } else {
	      protoProps = protoProps || {};
	      protoProps._className = className;
	      NewClassObject = this._extend(protoProps, classProps);
	    }
	    // Extending a subclass should reuse the classname automatically.
	    NewClassObject.extend = function (arg0) {
	      if (_.isString(arg0) || arg0 && _.has(arg0, "className")) {
	        return AV.Object.extend.apply(NewClassObject, arguments);
	      }
	      var newArguments = [className].concat(_.toArray(arguments));
	      return AV.Object.extend.apply(NewClassObject, newArguments);
	    };
	    NewClassObject['new'] = function (attributes, options) {
	      return new NewClassObject(attributes, options);
	    };
	    AV.Object._classMap[className] = NewClassObject;
	    return NewClassObject;
	  };

	  // ES6 class syntax support
	  Object.defineProperty(AV.Object.prototype, 'className', {
	    get: function get() {
	      var className = this._className || this.constructor._LCClassName || this.constructor.name;
	      // If someone tries to subclass "User", coerce it to the right type.
	      if (className === "User") {
	        return "_User";
	      }
	      return className;
	    }
	  });

	  /**
	   * Register a class.
	   * If a subclass of <code>AV.Object</code> is defined with your own implement
	   * rather then <code>AV.Object.extend</code>, the subclass must be registered.
	   * @param {Function} klass A subclass of <code>AV.Object</code>
	   * @param {String} [name] Specify the name of the class. Useful when the class might be uglified.
	   * @example
	   * class Person extend AV.Object {}
	   * AV.Object.register(Person);
	   */
	  AV.Object.register = function (klass, name) {
	    if (!(klass.prototype instanceof AV.Object)) {
	      throw new Error('registered class is not a subclass of AV.Object');
	    }
	    var className = name || klass.name;
	    if (!className.length) {
	      throw new Error('registered class must be named');
	    }
	    if (name) {
	      klass._LCClassName = name;
	    }
	    AV.Object._classMap[className] = klass;
	  };

	  AV.Object._findUnsavedChildren = function (object, children, files) {
	    AV._traverse(object, function (object) {
	      if (object instanceof AV.Object) {
	        object._refreshCache();
	        if (object.dirty()) {
	          children.push(object);
	        }
	        return;
	      }

	      if (object instanceof AV.File) {
	        if (!object.url() && !object.id) {
	          files.push(object);
	        }
	        return;
	      }
	    });
	  };

	  AV.Object._canBeSerializedAsValue = function (object) {
	    var canBeSerializedAsValue = true;

	    if (object instanceof AV.Object || object instanceof AV.File) {
	      canBeSerializedAsValue = !!object.id;
	    } else if (_.isArray(object)) {
	      AV._arrayEach(object, function (child) {
	        if (!AV.Object._canBeSerializedAsValue(child)) {
	          canBeSerializedAsValue = false;
	        }
	      });
	    } else if (_.isObject(object)) {
	      AV._objectEach(object, function (child) {
	        if (!AV.Object._canBeSerializedAsValue(child)) {
	          canBeSerializedAsValue = false;
	        }
	      });
	    }

	    return canBeSerializedAsValue;
	  };

	  AV.Object._deepSaveAsync = function (object, model, options) {
	    var unsavedChildren = [];
	    var unsavedFiles = [];
	    AV.Object._findUnsavedChildren(object, unsavedChildren, unsavedFiles);
	    if (model) {
	      unsavedChildren = _.filter(unsavedChildren, function (object) {
	        return object != model;
	      });
	    }

	    var promise = AV.Promise.resolve();
	    _.each(unsavedFiles, function (file) {
	      promise = promise.then(function () {
	        return file.save();
	      });
	    });

	    var objects = _.uniq(unsavedChildren);
	    var remaining = _.uniq(objects);

	    return promise.then(function () {
	      return AV.Promise._continueWhile(function () {
	        return remaining.length > 0;
	      }, function () {

	        // Gather up all the objects that can be saved in this batch.
	        var batch = [];
	        var newRemaining = [];
	        AV._arrayEach(remaining, function (object) {
	          // Limit batches to 20 objects.
	          if (batch.length > 20) {
	            newRemaining.push(object);
	            return;
	          }

	          if (object._canBeSerialized()) {
	            batch.push(object);
	          } else {
	            newRemaining.push(object);
	          }
	        });
	        remaining = newRemaining;

	        // If we can't save any objects, there must be a circular reference.
	        if (batch.length === 0) {
	          return AV.Promise.reject(new AVError(AVError.OTHER_CAUSE, "Tried to save a batch with a cycle."));
	        }

	        // Reserve a spot in every object's save queue.
	        var readyToStart = AV.Promise.resolve(_.map(batch, function (object) {
	          return object._allPreviousSaves || AV.Promise.resolve();
	        }));

	        // Save a single batch, whether previous saves succeeded or failed.
	        var bathSavePromise = readyToStart.then(function () {
	          return AVRequest("batch", null, null, "POST", {
	            requests: _.map(batch, function (object) {
	              var json = object._getSaveJSON();
	              _.extend(json, object._flags);
	              var method = "POST";

	              var path = "/1.1/classes/" + object.className;
	              if (object.id) {
	                path = path + "/" + object.id;
	                method = "PUT";
	              }

	              object._startSave();

	              return {
	                method: method,
	                path: path,
	                body: json
	              };
	            })

	          }, options).then(function (response) {
	            var error;
	            AV._arrayEach(batch, function (object, i) {
	              if (response[i].success) {
	                object._finishSave(object.parse(response[i].success));
	              } else {
	                error = error || response[i].error;
	                object._cancelSave();
	              }
	            });
	            if (error) {
	              return AV.Promise.reject(new AVError(error.code, error.error));
	            }
	          });
	        });
	        AV._arrayEach(batch, function (object) {
	          object._allPreviousSaves = bathSavePromise;
	        });
	        return bathSavePromise;
	      });
	    }).then(function () {
	      return object;
	    });
	  };
	};

	/***/ }),
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	module.exports = function (AV) {

	  /**
	   * @private
	   * @class
	   * A AV.Op is an atomic operation that can be applied to a field in a
	   * AV.Object. For example, calling <code>object.set("foo", "bar")</code>
	   * is an example of a AV.Op.Set. Calling <code>object.unset("foo")</code>
	   * is a AV.Op.Unset. These operations are stored in a AV.Object and
	   * sent to the server as part of <code>object.save()</code> operations.
	   * Instances of AV.Op should be immutable.
	   *
	   * You should not create subclasses of AV.Op or instantiate AV.Op
	   * directly.
	   */
	  AV.Op = function () {
	    this._initialize.apply(this, arguments);
	  };

	  AV.Op.prototype = {
	    _initialize: function _initialize() {}
	  };

	  _.extend(AV.Op, {
	    /**
	     * To create a new Op, call AV.Op._extend();
	     * @private
	     */
	    _extend: AV._extend,

	    // A map of __op string to decoder function.
	    _opDecoderMap: {},

	    /**
	     * Registers a function to convert a json object with an __op field into an
	     * instance of a subclass of AV.Op.
	     * @private
	     */
	    _registerDecoder: function _registerDecoder(opName, decoder) {
	      AV.Op._opDecoderMap[opName] = decoder;
	    },

	    /**
	     * Converts a json object into an instance of a subclass of AV.Op.
	     * @private
	     */
	    _decode: function _decode(json) {
	      var decoder = AV.Op._opDecoderMap[json.__op];
	      if (decoder) {
	        return decoder(json);
	      } else {
	        return undefined;
	      }
	    }
	  });

	  /*
	   * Add a handler for Batch ops.
	   */
	  AV.Op._registerDecoder("Batch", function (json) {
	    var op = null;
	    AV._arrayEach(json.ops, function (nextOp) {
	      nextOp = AV.Op._decode(nextOp);
	      op = nextOp._mergeWithPrevious(op);
	    });
	    return op;
	  });

	  /**
	   * @private
	   * @class
	   * A Set operation indicates that either the field was changed using
	   * AV.Object.set, or it is a mutable container that was detected as being
	   * changed.
	   */
	  AV.Op.Set = AV.Op._extend( /** @lends AV.Op.Set.prototype */{
	    _initialize: function _initialize(value) {
	      this._value = value;
	    },

	    /**
	     * Returns the new value of this field after the set.
	     */
	    value: function value() {
	      return this._value;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return AV._encode(this.value());
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      return this;
	    },

	    _estimate: function _estimate(oldValue) {
	      return this.value();
	    }
	  });

	  /**
	   * A sentinel value that is returned by AV.Op.Unset._estimate to
	   * indicate the field should be deleted. Basically, if you find _UNSET as a
	   * value in your object, you should remove that key.
	   */
	  AV.Op._UNSET = {};

	  /**
	   * @private
	   * @class
	   * An Unset operation indicates that this field has been deleted from the
	   * object.
	   */
	  AV.Op.Unset = AV.Op._extend( /** @lends AV.Op.Unset.prototype */{
	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { __op: "Delete" };
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      return this;
	    },

	    _estimate: function _estimate(oldValue) {
	      return AV.Op._UNSET;
	    }
	  });

	  AV.Op._registerDecoder("Delete", function (json) {
	    return new AV.Op.Unset();
	  });

	  /**
	   * @private
	   * @class
	   * An Increment is an atomic operation where the numeric value for the field
	   * will be increased by a given amount.
	   */
	  AV.Op.Increment = AV.Op._extend(
	  /** @lends AV.Op.Increment.prototype */{

	    _initialize: function _initialize(amount) {
	      this._amount = amount;
	    },

	    /**
	     * Returns the amount to increment by.
	     * @return {Number} the amount to increment by.
	     */
	    amount: function amount() {
	      return this._amount;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { __op: "Increment", amount: this._amount };
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof AV.Op.Unset) {
	        return new AV.Op.Set(this.amount());
	      } else if (previous instanceof AV.Op.Set) {
	        return new AV.Op.Set(previous.value() + this.amount());
	      } else if (previous instanceof AV.Op.Increment) {
	        return new AV.Op.Increment(this.amount() + previous.amount());
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    },

	    _estimate: function _estimate(oldValue) {
	      if (!oldValue) {
	        return this.amount();
	      }
	      return oldValue + this.amount();
	    }
	  });

	  AV.Op._registerDecoder("Increment", function (json) {
	    return new AV.Op.Increment(json.amount);
	  });

	  /**
	   * @private
	   * @class
	   * Add is an atomic operation where the given objects will be appended to the
	   * array that is stored in this field.
	   */
	  AV.Op.Add = AV.Op._extend( /** @lends AV.Op.Add.prototype */{
	    _initialize: function _initialize(objects) {
	      this._objects = objects;
	    },

	    /**
	     * Returns the objects to be added to the array.
	     * @return {Array} The objects to be added to the array.
	     */
	    objects: function objects() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { __op: "Add", objects: AV._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof AV.Op.Unset) {
	        return new AV.Op.Set(this.objects());
	      } else if (previous instanceof AV.Op.Set) {
	        return new AV.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof AV.Op.Add) {
	        return new AV.Op.Add(previous.objects().concat(this.objects()));
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    },

	    _estimate: function _estimate(oldValue) {
	      if (!oldValue) {
	        return _.clone(this.objects());
	      } else {
	        return oldValue.concat(this.objects());
	      }
	    }
	  });

	  AV.Op._registerDecoder("Add", function (json) {
	    return new AV.Op.Add(AV._decode(json.objects));
	  });

	  /**
	   * @private
	   * @class
	   * AddUnique is an atomic operation where the given items will be appended to
	   * the array that is stored in this field only if they were not already
	   * present in the array.
	   */
	  AV.Op.AddUnique = AV.Op._extend(
	  /** @lends AV.Op.AddUnique.prototype */{

	    _initialize: function _initialize(objects) {
	      this._objects = _.uniq(objects);
	    },

	    /**
	     * Returns the objects to be added to the array.
	     * @return {Array} The objects to be added to the array.
	     */
	    objects: function objects() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { __op: "AddUnique", objects: AV._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof AV.Op.Unset) {
	        return new AV.Op.Set(this.objects());
	      } else if (previous instanceof AV.Op.Set) {
	        return new AV.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof AV.Op.AddUnique) {
	        return new AV.Op.AddUnique(this._estimate(previous.objects()));
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    },

	    _estimate: function _estimate(oldValue) {
	      if (!oldValue) {
	        return _.clone(this.objects());
	      } else {
	        // We can't just take the _.uniq(_.union(...)) of oldValue and
	        // this.objects, because the uniqueness may not apply to oldValue
	        // (especially if the oldValue was set via .set())
	        var newValue = _.clone(oldValue);
	        AV._arrayEach(this.objects(), function (obj) {
	          if (obj instanceof AV.Object && obj.id) {
	            var matchingObj = _.find(newValue, function (anObj) {
	              return anObj instanceof AV.Object && anObj.id === obj.id;
	            });
	            if (!matchingObj) {
	              newValue.push(obj);
	            } else {
	              var index = _.indexOf(newValue, matchingObj);
	              newValue[index] = obj;
	            }
	          } else if (!_.contains(newValue, obj)) {
	            newValue.push(obj);
	          }
	        });
	        return newValue;
	      }
	    }
	  });

	  AV.Op._registerDecoder("AddUnique", function (json) {
	    return new AV.Op.AddUnique(AV._decode(json.objects));
	  });

	  /**
	   * @private
	   * @class
	   * Remove is an atomic operation where the given objects will be removed from
	   * the array that is stored in this field.
	   */
	  AV.Op.Remove = AV.Op._extend( /** @lends AV.Op.Remove.prototype */{
	    _initialize: function _initialize(objects) {
	      this._objects = _.uniq(objects);
	    },

	    /**
	     * Returns the objects to be removed from the array.
	     * @return {Array} The objects to be removed from the array.
	     */
	    objects: function objects() {
	      return this._objects;
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { __op: "Remove", objects: AV._encode(this.objects()) };
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof AV.Op.Unset) {
	        return previous;
	      } else if (previous instanceof AV.Op.Set) {
	        return new AV.Op.Set(this._estimate(previous.value()));
	      } else if (previous instanceof AV.Op.Remove) {
	        return new AV.Op.Remove(_.union(previous.objects(), this.objects()));
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    },

	    _estimate: function _estimate(oldValue) {
	      if (!oldValue) {
	        return [];
	      } else {
	        var newValue = _.difference(oldValue, this.objects());
	        // If there are saved AV Objects being removed, also remove them.
	        AV._arrayEach(this.objects(), function (obj) {
	          if (obj instanceof AV.Object && obj.id) {
	            newValue = _.reject(newValue, function (other) {
	              return other instanceof AV.Object && other.id === obj.id;
	            });
	          }
	        });
	        return newValue;
	      }
	    }
	  });

	  AV.Op._registerDecoder("Remove", function (json) {
	    return new AV.Op.Remove(AV._decode(json.objects));
	  });

	  /**
	   * @private
	   * @class
	   * A Relation operation indicates that the field is an instance of
	   * AV.Relation, and objects are being added to, or removed from, that
	   * relation.
	   */
	  AV.Op.Relation = AV.Op._extend(
	  /** @lends AV.Op.Relation.prototype */{

	    _initialize: function _initialize(adds, removes) {
	      this._targetClassName = null;

	      var self = this;

	      var pointerToId = function pointerToId(object) {
	        if (object instanceof AV.Object) {
	          if (!object.id) {
	            throw new Error('You can\'t add an unsaved AV.Object to a relation.');
	          }
	          if (!self._targetClassName) {
	            self._targetClassName = object.className;
	          }
	          if (self._targetClassName !== object.className) {
	            throw new Error("Tried to create a AV.Relation with 2 different types: " + self._targetClassName + " and " + object.className + ".");
	          }
	          return object.id;
	        }
	        return object;
	      };

	      this.relationsToAdd = _.uniq(_.map(adds, pointerToId));
	      this.relationsToRemove = _.uniq(_.map(removes, pointerToId));
	    },

	    /**
	     * Returns an array of unfetched AV.Object that are being added to the
	     * relation.
	     * @return {Array}
	     */
	    added: function added() {
	      var self = this;
	      return _.map(this.relationsToAdd, function (objectId) {
	        var object = AV.Object._create(self._targetClassName);
	        object.id = objectId;
	        return object;
	      });
	    },

	    /**
	     * Returns an array of unfetched AV.Object that are being removed from
	     * the relation.
	     * @return {Array}
	     */
	    removed: function removed() {
	      var self = this;
	      return _.map(this.relationsToRemove, function (objectId) {
	        var object = AV.Object._create(self._targetClassName);
	        object.id = objectId;
	        return object;
	      });
	    },

	    /**
	     * Returns a JSON version of the operation suitable for sending to AV.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      var adds = null;
	      var removes = null;
	      var self = this;
	      var idToPointer = function idToPointer(id) {
	        return { __type: 'Pointer',
	          className: self._targetClassName,
	          objectId: id };
	      };
	      var pointers = null;
	      if (this.relationsToAdd.length > 0) {
	        pointers = _.map(this.relationsToAdd, idToPointer);
	        adds = { "__op": "AddRelation", "objects": pointers };
	      }

	      if (this.relationsToRemove.length > 0) {
	        pointers = _.map(this.relationsToRemove, idToPointer);
	        removes = { "__op": "RemoveRelation", "objects": pointers };
	      }

	      if (adds && removes) {
	        return { "__op": "Batch", "ops": [adds, removes] };
	      }

	      return adds || removes || {};
	    },

	    _mergeWithPrevious: function _mergeWithPrevious(previous) {
	      if (!previous) {
	        return this;
	      } else if (previous instanceof AV.Op.Unset) {
	        throw new Error('You can\'t modify a relation after deleting it.');
	      } else if (previous instanceof AV.Op.Relation) {
	        if (previous._targetClassName && previous._targetClassName !== this._targetClassName) {
	          throw new Error("Related object must be of class " + previous._targetClassName + ", but " + this._targetClassName + " was passed in.");
	        }
	        var newAdd = _.union(_.difference(previous.relationsToAdd, this.relationsToRemove), this.relationsToAdd);
	        var newRemove = _.union(_.difference(previous.relationsToRemove, this.relationsToAdd), this.relationsToRemove);

	        var newRelation = new AV.Op.Relation(newAdd, newRemove);
	        newRelation._targetClassName = this._targetClassName;
	        return newRelation;
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    },

	    _estimate: function _estimate(oldValue, object, key) {
	      if (!oldValue) {
	        var relation = new AV.Relation(object, key);
	        relation.targetClassName = this._targetClassName;
	      } else if (oldValue instanceof AV.Relation) {
	        if (this._targetClassName) {
	          if (oldValue.targetClassName) {
	            if (oldValue.targetClassName !== this._targetClassName) {
	              throw new Error("Related object must be a " + oldValue.targetClassName + ", but a " + this._targetClassName + " was passed in.");
	            }
	          } else {
	            oldValue.targetClassName = this._targetClassName;
	          }
	        }
	        return oldValue;
	      } else {
	        throw new Error('Op is invalid after previous op.');
	      }
	    }
	  });

	  AV.Op._registerDecoder("AddRelation", function (json) {
	    return new AV.Op.Relation(AV._decode(json.objects), []);
	  });
	  AV.Op._registerDecoder("RemoveRelation", function (json) {
	    return new AV.Op.Relation([], AV._decode(json.objects));
	  });
	};

	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var AVRequest = __webpack_require__(1).request;

	module.exports = function (AV) {
	  AV.Installation = AV.Object.extend("_Installation");

	  /**
	   * @namespace
	   */
	  AV.Push = AV.Push || {};

	  /**
	   * Sends a push notification.
	   * @param {Object} data The data of the push notification.
	   * @param {String[]} [data.channels] An Array of channels to push to.
	   * @param {Date} [data.push_time] A Date object for when to send the push.
	   * @param {Date} [data.expiration_time]  A Date object for when to expire
	   *         the push.
	   * @param {Number} [data.expiration_interval] The seconds from now to expire the push.
	   * @param {AV.Query} [data.where] An AV.Query over AV.Installation that is used to match
	   *         a set of installations to push to.
	   * @param {String} [data.cql] A CQL statement over AV.Installation that is used to match
	   *         a set of installations to push to.
	   * @param {Date} data.data The data to send as part of the push
	   * @param {AuthOptions} [options]
	   * @return {Promise}
	   */
	  AV.Push.send = function (data, options) {
	    if (data.where) {
	      data.where = data.where.toJSON().where;
	    }

	    if (data.where && data.cql) {
	      throw new Error("Both where and cql can't be set");
	    }

	    if (data.push_time) {
	      data.push_time = data.push_time.toJSON();
	    }

	    if (data.expiration_time) {
	      data.expiration_time = data.expiration_time.toJSON();
	    }

	    if (data.expiration_time && data.expiration_time_interval) {
	      throw new Error("Both expiration_time and expiration_time_interval can't be set");
	    }

	    var request = AVRequest('push', null, null, 'POST', data, options);
	    return request;
	  };
	};

	/***/ }),
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVError = __webpack_require__(3);
	var AVRequest = __webpack_require__(1).request;

	var _require = __webpack_require__(5),
	    ensureArray = _require.ensureArray;

	var requires = function requires(value, message) {
	  if (value === undefined) {
	    throw new Error(message);
	  }
	};

	// AV.Query is a way to create a list of AV.Objects.
	module.exports = function (AV) {
	  /**
	   * Creates a new AV.Query for the given AV.Object subclass.
	   * @param {Class|String} objectClass An instance of a subclass of AV.Object, or a AV className string.
	   * @class
	   *
	   * <p>AV.Query defines a query that is used to fetch AV.Objects. The
	   * most common use case is finding all objects that match a query through the
	   * <code>find</code> method. For example, this sample code fetches all objects
	   * of class <code>MyClass</code>. It calls a different function depending on
	   * whether the fetch succeeded or not.
	   *
	   * <pre>
	   * var query = new AV.Query(MyClass);
	   * query.find().then(function(results) {
	   *   // results is an array of AV.Object.
	   * }, function(error) {
	   *   // error is an instance of AVError.
	   * });</pre></p>
	   *
	   * <p>An AV.Query can also be used to retrieve a single object whose id is
	   * known, through the get method. For example, this sample code fetches an
	   * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
	   * different function depending on whether the fetch succeeded or not.
	   *
	   * <pre>
	   * var query = new AV.Query(MyClass);
	   * query.get(myId).then(function(object) {
	   *   // object is an instance of AV.Object.
	   * }, function(error) {
	   *   // error is an instance of AVError.
	   * });</pre></p>
	   *
	   * <p>An AV.Query can also be used to count the number of objects that match
	   * the query without retrieving all of those objects. For example, this
	   * sample code counts the number of objects of the class <code>MyClass</code>
	   * <pre>
	   * var query = new AV.Query(MyClass);
	   * query.count().then(function(number) {
	   *   // There are number instances of MyClass.
	   * }, function(error) {
	   *   // error is an instance of AVError.
	   * });</pre></p>
	   */
	  AV.Query = function (objectClass) {
	    if (_.isString(objectClass)) {
	      objectClass = AV.Object._getSubclass(objectClass);
	    }

	    this.objectClass = objectClass;

	    this.className = objectClass.prototype.className;

	    this._where = {};
	    this._include = [];
	    this._select = [];
	    this._limit = -1; // negative limit means, do not send a limit
	    this._skip = 0;
	    this._extraOptions = {};
	  };

	  /**
	   * Constructs a AV.Query that is the OR of the passed in queries.  For
	   * example:
	   * <pre>var compoundQuery = AV.Query.or(query1, query2, query3);</pre>
	   *
	   * will create a compoundQuery that is an or of the query1, query2, and
	   * query3.
	   * @param {...AV.Query} var_args The list of queries to OR.
	   * @return {AV.Query} The query that is the OR of the passed in queries.
	   */
	  AV.Query.or = function () {
	    var queries = _.toArray(arguments);
	    var className = null;
	    AV._arrayEach(queries, function (q) {
	      if (_.isNull(className)) {
	        className = q.className;
	      }

	      if (className !== q.className) {
	        throw new Error('All queries must be for the same class');
	      }
	    });
	    var query = new AV.Query(className);
	    query._orQuery(queries);
	    return query;
	  };

	  /**
	   * Constructs a AV.Query that is the AND of the passed in queries.  For
	   * example:
	   * <pre>var compoundQuery = AV.Query.and(query1, query2, query3);</pre>
	   *
	   * will create a compoundQuery that is an 'and' of the query1, query2, and
	   * query3.
	   * @param {...AV.Query} var_args The list of queries to AND.
	   * @return {AV.Query} The query that is the AND of the passed in queries.
	   */
	  AV.Query.and = function () {
	    var queries = _.toArray(arguments);
	    var className = null;
	    AV._arrayEach(queries, function (q) {
	      if (_.isNull(className)) {
	        className = q.className;
	      }

	      if (className !== q.className) {
	        throw new Error('All queries must be for the same class');
	      }
	    });
	    var query = new AV.Query(className);
	    query._andQuery(queries);
	    return query;
	  };

	  /**
	   * Retrieves a list of AVObjects that satisfy the CQL.
	   * CQL syntax please see {@link https://leancloud.cn/docs/cql_guide.html CQL Guide}.
	   *
	   * @param {String} cql A CQL string, see {@link https://leancloud.cn/docs/cql_guide.html CQL Guide}.
	   * @param {Array} pvalues An array contains placeholder values.
	   * @param {AuthOptions} options
	   * @return {Promise} A promise that is resolved with the results when
	   * the query completes.
	   */
	  AV.Query.doCloudQuery = function (cql, pvalues, options) {
	    var params = { cql: cql };
	    if (_.isArray(pvalues)) {
	      params.pvalues = pvalues;
	    } else {
	      options = pvalues;
	    }

	    var request = AVRequest('cloudQuery', null, null, 'GET', params, options);
	    return request.then(function (response) {
	      //query to process results.
	      var query = new AV.Query(response.className);
	      var results = _.map(response.results, function (json) {
	        var obj = query._newObject(response);
	        if (obj._finishFetch) {
	          obj._finishFetch(query._processResult(json), true);
	        }
	        return obj;
	      });
	      return {
	        results: results,
	        count: response.count,
	        className: response.className
	      };
	    });
	  };

	  AV.Query._extend = AV._extend;

	  AV.Query.prototype = {
	    //hook to iterate result. Added by dennis<xzhuang@avoscloud.com>.
	    _processResult: function _processResult(obj) {
	      return obj;
	    },

	    /**
	     * Constructs an AV.Object whose id is already known by fetching data from
	     * the server.
	     *
	     * @param {String} objectId The id of the object to be fetched.
	     * @param {AuthOptions} options
	     * @return {Promise.<AV.Object>}
	     */
	    get: function get(objectId, options) {
	      if (!objectId) {
	        var errorObject = new AVError(AVError.OBJECT_NOT_FOUND, "Object not found.");
	        throw errorObject;
	      }

	      var self = this;

	      var obj = self._newObject();
	      obj.id = objectId;

	      var queryJSON = self.toJSON();
	      var fetchOptions = {};

	      if (queryJSON.keys) fetchOptions.keys = queryJSON.keys;
	      if (queryJSON.include) fetchOptions.include = queryJSON.include;

	      return obj.fetch(fetchOptions, options);
	    },

	    /**
	     * Returns a JSON representation of this query.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      var params = {
	        where: this._where
	      };

	      if (this._include.length > 0) {
	        params.include = this._include.join(",");
	      }
	      if (this._select.length > 0) {
	        params.keys = this._select.join(",");
	      }
	      if (this._limit >= 0) {
	        params.limit = this._limit;
	      }
	      if (this._skip > 0) {
	        params.skip = this._skip;
	      }
	      if (this._order !== undefined) {
	        params.order = this._order;
	      }

	      AV._objectEach(this._extraOptions, function (v, k) {
	        params[k] = v;
	      });

	      return params;
	    },

	    _newObject: function _newObject(response) {
	      var obj;
	      if (response && response.className) {
	        obj = new AV.Object(response.className);
	      } else {
	        obj = new this.objectClass();
	      }
	      return obj;
	    },
	    _createRequest: function _createRequest(params, options) {
	      return AVRequest('classes', this.className, null, "GET", params || this.toJSON(), options);
	    },

	    /**
	     * Retrieves a list of AVObjects that satisfy this query.
	     *
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is resolved with the results when
	     * the query completes.
	     */
	    find: function find(options) {
	      var self = this;

	      var request = this._createRequest(null, options);

	      return request.then(function (response) {
	        return _.map(response.results, function (json) {
	          var obj = self._newObject(response);
	          if (obj._finishFetch) {
	            obj._finishFetch(self._processResult(json), true);
	          }
	          return obj;
	        });
	      });
	    },

	    /**
	     * Delete objects retrieved by this query.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the save
	     *     completes.
	     */
	    destroyAll: function destroyAll(options) {
	      var self = this;
	      return self.find(options).then(function (objects) {
	        return AV.Object.destroyAll(objects);
	      });
	    },

	    /**
	     * Counts the number of objects that match this query.
	     *
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is resolved with the count when
	     * the query completes.
	     */
	    count: function count(options) {
	      var params = this.toJSON();
	      params.limit = 0;
	      params.count = 1;
	      var request = this._createRequest(params, options);

	      return request.then(function (response) {
	        return response.count;
	      });
	    },

	    /**
	     * Retrieves at most one AV.Object that satisfies this query.
	     *
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is resolved with the object when
	     * the query completes.
	     */
	    first: function first(options) {
	      var self = this;

	      var params = this.toJSON();
	      params.limit = 1;
	      var request = this._createRequest(params, options);

	      return request.then(function (response) {
	        return _.map(response.results, function (json) {
	          var obj = self._newObject();
	          if (obj._finishFetch) {
	            obj._finishFetch(self._processResult(json), true);
	          }
	          return obj;
	        })[0];
	      });
	    },

	    /**
	     * Sets the number of results to skip before returning any results.
	     * This is useful for pagination.
	     * Default is to skip zero results.
	     * @param {Number} n the number of results to skip.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    skip: function skip(n) {
	      requires(n, 'undefined is not a valid skip value');
	      this._skip = n;
	      return this;
	    },

	    /**
	     * Sets the limit of the number of results to return. The default limit is
	     * 100, with a maximum of 1000 results being returned at a time.
	     * @param {Number} n the number of results to limit to.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    limit: function limit(n) {
	      requires(n, 'undefined is not a valid limit value');
	      this._limit = n;
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that the AV.Object must contain.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    equalTo: function equalTo(key, value) {
	      requires(key, 'undefined is not a valid key');
	      requires(value, 'undefined is not a valid value');
	      this._where[key] = AV._encode(value);
	      return this;
	    },

	    /**
	     * Helper for condition queries
	     * @private
	     */
	    _addCondition: function _addCondition(key, condition, value) {
	      requires(key, 'undefined is not a valid condition key');
	      requires(condition, 'undefined is not a valid condition');
	      requires(value, 'undefined is not a valid condition value');

	      // Check if we already have a condition
	      if (!this._where[key]) {
	        this._where[key] = {};
	      }
	      this._where[key][condition] = AV._encode(value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular
	     * <strong>array</strong> key's length to be equal to the provided value.
	     * @param {String} key The array key to check.
	     * @param value The length value.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    sizeEqualTo: function sizeEqualTo(key, value) {
	      this._addCondition(key, "$size", value);
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be not equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that must not be equalled.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    notEqualTo: function notEqualTo(key, value) {
	      this._addCondition(key, "$ne", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be less than the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an upper bound.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    lessThan: function lessThan(key, value) {
	      this._addCondition(key, "$lt", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be greater than the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an lower bound.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    greaterThan: function greaterThan(key, value) {
	      this._addCondition(key, "$gt", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be less than or equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an upper bound.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    lessThanOrEqualTo: function lessThanOrEqualTo(key, value) {
	      this._addCondition(key, "$lte", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be greater than or equal to the provided value.
	     * @param {String} key The key to check.
	     * @param value The value that provides an lower bound.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    greaterThanOrEqualTo: function greaterThanOrEqualTo(key, value) {
	      this._addCondition(key, "$gte", value);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * be contained in the provided list of values.
	     * @param {String} key The key to check.
	     * @param {Array} values The values that will match.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    containedIn: function containedIn(key, values) {
	      this._addCondition(key, "$in", values);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * not be contained in the provided list of values.
	     * @param {String} key The key to check.
	     * @param {Array} values The values that will not match.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    notContainedIn: function notContainedIn(key, values) {
	      this._addCondition(key, "$nin", values);
	      return this;
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's value to
	     * contain each one of the provided list of values.
	     * @param {String} key The key to check.  This key's value must be an array.
	     * @param {Array} values The values that will match.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    containsAll: function containsAll(key, values) {
	      this._addCondition(key, "$all", values);
	      return this;
	    },

	    /**
	     * Add a constraint for finding objects that contain the given key.
	     * @param {String} key The key that should exist.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    exists: function exists(key) {
	      this._addCondition(key, "$exists", true);
	      return this;
	    },

	    /**
	     * Add a constraint for finding objects that do not contain a given key.
	     * @param {String} key The key that should not exist
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    doesNotExist: function doesNotExist(key) {
	      this._addCondition(key, "$exists", false);
	      return this;
	    },

	    /**
	     * Add a regular expression constraint for finding string values that match
	     * the provided regular expression.
	     * This may be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {RegExp} regex The regular expression pattern to match.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    matches: function matches(key, regex, modifiers) {
	      this._addCondition(key, "$regex", regex);
	      if (!modifiers) {
	        modifiers = "";
	      }
	      // Javascript regex options support mig as inline options but store them
	      // as properties of the object. We support mi & should migrate them to
	      // modifiers
	      if (regex.ignoreCase) {
	        modifiers += 'i';
	      }
	      if (regex.multiline) {
	        modifiers += 'm';
	      }

	      if (modifiers && modifiers.length) {
	        this._addCondition(key, "$options", modifiers);
	      }
	      return this;
	    },

	    /**
	     * Add a constraint that requires that a key's value matches a AV.Query
	     * constraint.
	     * @param {String} key The key that the contains the object to match the
	     *                     query.
	     * @param {AV.Query} query The query that should match.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    matchesQuery: function matchesQuery(key, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$inQuery", queryJSON);
	      return this;
	    },

	    /**
	      * Add a constraint that requires that a key's value not matches a
	      * AV.Query constraint.
	      * @param {String} key The key that the contains the object to match the
	      *                     query.
	      * @param {AV.Query} query The query that should not match.
	      * @return {AV.Query} Returns the query, so you can chain this call.
	      */
	    doesNotMatchQuery: function doesNotMatchQuery(key, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$notInQuery", queryJSON);
	      return this;
	    },

	    /**
	     * Add a constraint that requires that a key's value matches a value in
	     * an object returned by a different AV.Query.
	     * @param {String} key The key that contains the value that is being
	     *                     matched.
	     * @param {String} queryKey The key in the objects returned by the query to
	     *                          match against.
	     * @param {AV.Query} query The query to run.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    matchesKeyInQuery: function matchesKeyInQuery(key, queryKey, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$select", { key: queryKey, query: queryJSON });
	      return this;
	    },

	    /**
	     * Add a constraint that requires that a key's value not match a value in
	     * an object returned by a different AV.Query.
	     * @param {String} key The key that contains the value that is being
	     *                     excluded.
	     * @param {String} queryKey The key in the objects returned by the query to
	     *                          match against.
	     * @param {AV.Query} query The query to run.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    doesNotMatchKeyInQuery: function doesNotMatchKeyInQuery(key, queryKey, query) {
	      var queryJSON = query.toJSON();
	      queryJSON.className = query.className;
	      this._addCondition(key, "$dontSelect", { key: queryKey, query: queryJSON });
	      return this;
	    },

	    /**
	     * Add constraint that at least one of the passed in queries matches.
	     * @param {Array} queries
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     * @private
	     */
	    _orQuery: function _orQuery(queries) {
	      var queryJSON = _.map(queries, function (q) {
	        return q.toJSON().where;
	      });

	      this._where.$or = queryJSON;
	      return this;
	    },

	    /**
	     * Add constraint that both of the passed in queries matches.
	     * @param {Array} queries
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     * @private
	     */
	    _andQuery: function _andQuery(queries) {
	      var queryJSON = _.map(queries, function (q) {
	        return q.toJSON().where;
	      });

	      this._where.$and = queryJSON;
	      return this;
	    },

	    /**
	     * Converts a string into a regex that matches it.
	     * Surrounding with \Q .. \E does this, we just need to escape \E's in
	     * the text separately.
	     * @private
	     */
	    _quote: function _quote(s) {
	      return "\\Q" + s.replace("\\E", "\\E\\\\E\\Q") + "\\E";
	    },

	    /**
	     * Add a constraint for finding string values that contain a provided
	     * string.  This may be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} substring The substring that the value must contain.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    contains: function contains(key, value) {
	      this._addCondition(key, "$regex", this._quote(value));
	      return this;
	    },

	    /**
	     * Add a constraint for finding string values that start with a provided
	     * string.  This query will use the backend index, so it will be fast even
	     * for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} prefix The substring that the value must start with.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    startsWith: function startsWith(key, value) {
	      this._addCondition(key, "$regex", "^" + this._quote(value));
	      return this;
	    },

	    /**
	     * Add a constraint for finding string values that end with a provided
	     * string.  This will be slow for large datasets.
	     * @param {String} key The key that the string to match is stored in.
	     * @param {String} suffix The substring that the value must end with.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    endsWith: function endsWith(key, value) {
	      this._addCondition(key, "$regex", this._quote(value) + "$");
	      return this;
	    },

	    /**
	     * Sorts the results in ascending order by the given key.
	     *
	     * @param {String} key The key to order by.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    ascending: function ascending(key) {
	      requires(key, 'undefined is not a valid key');
	      this._order = key;
	      return this;
	    },

	    /**
	     * Also sorts the results in ascending order by the given key. The previous sort keys have
	     * precedence over this key.
	     *
	     * @param {String} key The key to order by
	     * @return {AV.Query} Returns the query so you can chain this call.
	     */
	    addAscending: function addAscending(key) {
	      requires(key, 'undefined is not a valid key');
	      if (this._order) this._order += ',' + key;else this._order = key;
	      return this;
	    },

	    /**
	     * Sorts the results in descending order by the given key.
	     *
	     * @param {String} key The key to order by.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    descending: function descending(key) {
	      requires(key, 'undefined is not a valid key');
	      this._order = "-" + key;
	      return this;
	    },

	    /**
	    * Also sorts the results in descending order by the given key. The previous sort keys have
	    * precedence over this key.
	    *
	    * @param {String} key The key to order by
	    * @return {AV.Query} Returns the query so you can chain this call.
	    */
	    addDescending: function addDescending(key) {
	      requires(key, 'undefined is not a valid key');
	      if (this._order) this._order += ',-' + key;else this._order = '-' + key;
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given.
	     * @param {String} key The key that the AV.GeoPoint is stored in.
	     * @param {AV.GeoPoint} point The reference AV.GeoPoint that is used.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    near: function near(key, point) {
	      if (!(point instanceof AV.GeoPoint)) {
	        // Try to cast it to a GeoPoint, so that near("loc", [20,30]) works.
	        point = new AV.GeoPoint(point);
	      }
	      this._addCondition(key, "$nearSphere", point);
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * @param {String} key The key that the AV.GeoPoint is stored in.
	     * @param {AV.GeoPoint} point The reference AV.GeoPoint that is used.
	     * @param maxDistance Maximum distance (in radians) of results to return.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    withinRadians: function withinRadians(key, point, distance) {
	      this.near(key, point);
	      this._addCondition(key, "$maxDistance", distance);
	      return this;
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * Radius of earth used is 3958.8 miles.
	     * @param {String} key The key that the AV.GeoPoint is stored in.
	     * @param {AV.GeoPoint} point The reference AV.GeoPoint that is used.
	     * @param {Number} maxDistance Maximum distance (in miles) of results to
	     *     return.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    withinMiles: function withinMiles(key, point, distance) {
	      return this.withinRadians(key, point, distance / 3958.8);
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given and within the maximum distance given.
	     * Radius of earth used is 6371.0 kilometers.
	     * @param {String} key The key that the AV.GeoPoint is stored in.
	     * @param {AV.GeoPoint} point The reference AV.GeoPoint that is used.
	     * @param {Number} maxDistance Maximum distance (in kilometers) of results
	     *     to return.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    withinKilometers: function withinKilometers(key, point, distance) {
	      return this.withinRadians(key, point, distance / 6371.0);
	    },

	    /**
	     * Add a constraint to the query that requires a particular key's
	     * coordinates be contained within a given rectangular geographic bounding
	     * box.
	     * @param {String} key The key to be constrained.
	     * @param {AV.GeoPoint} southwest
	     *     The lower-left inclusive corner of the box.
	     * @param {AV.GeoPoint} northeast
	     *     The upper-right inclusive corner of the box.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    withinGeoBox: function withinGeoBox(key, southwest, northeast) {
	      if (!(southwest instanceof AV.GeoPoint)) {
	        southwest = new AV.GeoPoint(southwest);
	      }
	      if (!(northeast instanceof AV.GeoPoint)) {
	        northeast = new AV.GeoPoint(northeast);
	      }
	      this._addCondition(key, '$within', { '$box': [southwest, northeast] });
	      return this;
	    },

	    /**
	     * Include nested AV.Objects for the provided key.  You can use dot
	     * notation to specify which fields in the included object are also fetch.
	     * @param {String[]} keys The name of the key to include.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    include: function include(keys) {
	      var _this = this;

	      requires(keys, 'undefined is not a valid key');
	      _(arguments).forEach(function (keys) {
	        _this._include = _this._include.concat(ensureArray(keys));
	      });
	      return this;
	    },

	    /**
	     * Restrict the fields of the returned AV.Objects to include only the
	     * provided keys.  If this is called multiple times, then all of the keys
	     * specified in each of the calls will be included.
	     * @param {String[]} keys The names of the keys to include.
	     * @return {AV.Query} Returns the query, so you can chain this call.
	     */
	    select: function select(keys) {
	      var _this2 = this;

	      requires(keys, 'undefined is not a valid key');
	      _(arguments).forEach(function (keys) {
	        _this2._select = _this2._select.concat(ensureArray(keys));
	      });
	      return this;
	    },

	    /**
	     * Iterates over each result of a query, calling a callback for each one. If
	     * the callback returns a promise, the iteration will not continue until
	     * that promise has been fulfilled. If the callback returns a rejected
	     * promise, then iteration will stop with that error. The items are
	     * processed in an unspecified order. The query may not have any sort order,
	     * and may not use limit or skip.
	     * @param callback {Function} Callback that will be called with each result
	     *     of the query.
	     * @return {Promise} A promise that will be fulfilled once the
	     *     iteration has completed.
	     */
	    each: function each(callback) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	      if (this._order || this._skip || this._limit >= 0) {
	        var error = new Error("Cannot iterate on a query with sort, skip, or limit.");
	        return AV.Promise.reject(error);
	      }

	      var query = new AV.Query(this.objectClass);
	      // We can override the batch size from the options.
	      // This is undocumented, but useful for testing.
	      query._limit = options.batchSize || 100;
	      query._where = _.clone(this._where);
	      query._include = _.clone(this._include);

	      query.ascending('objectId');

	      var finished = false;
	      return AV.Promise._continueWhile(function () {
	        return !finished;
	      }, function () {
	        return query.find(options).then(function (results) {
	          var callbacksDone = AV.Promise.resolve();
	          _.each(results, function (result) {
	            callbacksDone = callbacksDone.then(function () {
	              return callback(result);
	            });
	          });

	          return callbacksDone.then(function () {
	            if (results.length >= query._limit) {
	              query.greaterThan("objectId", results[results.length - 1].id);
	            } else {
	              finished = true;
	            }
	          });
	        });
	      });
	    }
	  };

	  AV.FriendShipQuery = AV.Query._extend({
	    _objectClass: AV.User,
	    _newObject: function _newObject() {
	      return new AV.User();
	    },
	    _processResult: function _processResult(json) {
	      if (json && json[this._friendshipTag]) {
	        var user = json[this._friendshipTag];
	        if (user.__type === 'Pointer' && user.className === '_User') {
	          delete user.__type;
	          delete user.className;
	        }
	        return user;
	      } else {
	        return null;
	      }
	    }
	  });
	};

	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);

	module.exports = function (AV) {
	  /**
	   * Creates a new Relation for the given parent object and key. This
	   * constructor should rarely be used directly, but rather created by
	   * {@link AV.Object#relation}.
	   * @param {AV.Object} parent The parent of this relation.
	   * @param {String} key The key for this relation on the parent.
	   * @see AV.Object#relation
	   * @class
	   *
	   * <p>
	   * A class that is used to access all of the children of a many-to-many
	   * relationship.  Each instance of AV.Relation is associated with a
	   * particular parent object and key.
	   * </p>
	   */
	  AV.Relation = function (parent, key) {
	    if (!_.isString(key)) {
	      throw new TypeError('key must be a string');
	    }
	    this.parent = parent;
	    this.key = key;
	    this.targetClassName = null;
	  };

	  /**
	   * Creates a query that can be used to query the parent objects in this relation.
	   * @param {String} parentClass The parent class or name.
	   * @param {String} relationKey The relation field key in parent.
	   * @param {AV.Object} child The child object.
	   * @return {AV.Query}
	   */
	  AV.Relation.reverseQuery = function (parentClass, relationKey, child) {
	    var query = new AV.Query(parentClass);
	    query.equalTo(relationKey, child._toPointer());
	    return query;
	  };

	  AV.Relation.prototype = {
	    /**
	     * Makes sure that this relation has the right parent and key.
	     * @private
	     */
	    _ensureParentAndKey: function _ensureParentAndKey(parent, key) {
	      this.parent = this.parent || parent;
	      this.key = this.key || key;
	      if (this.parent !== parent) {
	        throw new Error("Internal Error. Relation retrieved from two different Objects.");
	      }
	      if (this.key !== key) {
	        throw new Error("Internal Error. Relation retrieved from two different keys.");
	      }
	    },

	    /**
	     * Adds a AV.Object or an array of AV.Objects to the relation.
	     * @param {AV.Object|AV.Object[]} objects The item or items to add.
	     */
	    add: function add(objects) {
	      if (!_.isArray(objects)) {
	        objects = [objects];
	      }

	      var change = new AV.Op.Relation(objects, []);
	      this.parent.set(this.key, change);
	      this.targetClassName = change._targetClassName;
	    },

	    /**
	     * Removes a AV.Object or an array of AV.Objects from this relation.
	     * @param {AV.Object|AV.Object[]} objects The item or items to remove.
	     */
	    remove: function remove(objects) {
	      if (!_.isArray(objects)) {
	        objects = [objects];
	      }

	      var change = new AV.Op.Relation([], objects);
	      this.parent.set(this.key, change);
	      this.targetClassName = change._targetClassName;
	    },

	    /**
	     * Returns a JSON version of the object suitable for saving to disk.
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return { "__type": "Relation", "className": this.targetClassName };
	    },

	    /**
	     * Returns a AV.Query that is limited to objects in this
	     * relation.
	     * @return {AV.Query}
	     */
	    query: function query() {
	      var targetClass;
	      var query;
	      if (!this.targetClassName) {
	        targetClass = AV.Object._getSubclass(this.parent.className);
	        query = new AV.Query(targetClass);
	        query._extraOptions.redirectClassNameForKey = this.key;
	      } else {
	        targetClass = AV.Object._getSubclass(this.targetClassName);
	        query = new AV.Query(targetClass);
	      }
	      query._addCondition("$relatedTo", "object", this.parent._toPointer());
	      query._addCondition("$relatedTo", "key", this.key);

	      return query;
	    }
	  };
	};

	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVError = __webpack_require__(3);

	module.exports = function (AV) {
	  AV.Role = AV.Object.extend("_Role", /** @lends AV.Role.prototype */{
	    // Instance Methods

	    /**
	    * Represents a Role on the AV server. Roles represent groupings of
	    * Users for the purposes of granting permissions (e.g. specifying an ACL
	    * for an Object). Roles are specified by their sets of child users and
	    * child roles, all of which are granted any permissions that the parent
	    * role has.
	    *
	    * <p>Roles must have a name (which cannot be changed after creation of the
	    * role), and must specify an ACL.</p>
	    * An AV.Role is a local representation of a role persisted to the AV
	    * cloud.
	     * @class AV.Role
	     * @param {String} name The name of the Role to create.
	     * @param {AV.ACL} [acl] The ACL for this role. if absent, the default ACL
	     *    `{'*': { read: true }}` will be used.
	     */
	    constructor: function constructor(name, acl) {
	      if (_.isString(name)) {
	        AV.Object.prototype.constructor.call(this, null, null);
	        this.setName(name);
	      } else {
	        AV.Object.prototype.constructor.call(this, name, acl);
	      }
	      if (acl === undefined) {
	        var defaultAcl = new AV.ACL();
	        defaultAcl.setPublicReadAccess(true);
	        if (!this.getACL()) {
	          this.setACL(defaultAcl);
	        }
	      } else if (!(acl instanceof AV.ACL)) {
	        throw new TypeError('acl must be an instance of AV.ACL');
	      } else {
	        this.setACL(acl);
	      }
	    },

	    /**
	     * Gets the name of the role.  You can alternatively call role.get("name")
	     *
	     * @return {String} the name of the role.
	     */
	    getName: function getName() {
	      return this.get("name");
	    },

	    /**
	     * Sets the name for a role. This value must be set before the role has
	     * been saved to the server, and cannot be set once the role has been
	     * saved.
	     *
	     * <p>
	     *   A role's name can only contain alphanumeric characters, _, -, and
	     *   spaces.
	     * </p>
	     *
	     * <p>This is equivalent to calling role.set("name", name)</p>
	     *
	     * @param {String} name The name of the role.
	     */
	    setName: function setName(name, options) {
	      return this.set("name", name, options);
	    },

	    /**
	     * Gets the AV.Relation for the AV.Users that are direct
	     * children of this role. These users are granted any privileges that this
	     * role has been granted (e.g. read or write access through ACLs). You can
	     * add or remove users from the role through this relation.
	     *
	     * <p>This is equivalent to calling role.relation("users")</p>
	     *
	     * @return {AV.Relation} the relation for the users belonging to this
	     *     role.
	     */
	    getUsers: function getUsers() {
	      return this.relation("users");
	    },

	    /**
	     * Gets the AV.Relation for the AV.Roles that are direct
	     * children of this role. These roles' users are granted any privileges that
	     * this role has been granted (e.g. read or write access through ACLs). You
	     * can add or remove child roles from this role through this relation.
	     *
	     * <p>This is equivalent to calling role.relation("roles")</p>
	     *
	     * @return {AV.Relation} the relation for the roles belonging to this
	     *     role.
	     */
	    getRoles: function getRoles() {
	      return this.relation("roles");
	    },

	    /**
	     * @ignore
	     */
	    validate: function validate(attrs, options) {
	      if ("name" in attrs && attrs.name !== this.getName()) {
	        var newName = attrs.name;
	        if (this.id && this.id !== attrs.objectId) {
	          // Check to see if the objectId being set matches this.id.
	          // This happens during a fetch -- the id is set before calling fetch.
	          // Let the name be set in this case.
	          return new AVError(AVError.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
	        }
	        if (!_.isString(newName)) {
	          return new AVError(AVError.OTHER_CAUSE, "A role's name must be a String.");
	        }
	        if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
	          return new AVError(AVError.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _," + " -, and spaces.");
	        }
	      }
	      if (AV.Object.prototype.validate) {
	        return AV.Object.prototype.validate.call(this, attrs, options);
	      }
	      return false;
	    }
	  });
	};

	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVRequest = __webpack_require__(1).request;

	module.exports = function (AV) {
	  /**
	   * A builder to generate sort string for app searching.For example:
	   * @class
	   * @since 0.5.1
	   * @example
	   *   var builder = new AV.SearchSortBuilder();
	   *   builder.ascending('key1').descending('key2','max');
	   *   var query = new AV.SearchQuery('Player');
	   *   query.sortBy(builder);
	   *   query.find().then();
	   */
	  AV.SearchSortBuilder = function () {
	    this._sortFields = [];
	  };

	  AV.SearchSortBuilder.prototype = {
	    _addField: function _addField(key, order, mode, missing) {
	      var field = {};
	      field[key] = {
	        order: order || 'asc',
	        mode: mode || 'avg',
	        missing: '_' + (missing || 'last')
	      };
	      this._sortFields.push(field);
	      return this;
	    },

	    /**
	     * Sorts the results in ascending order by the given key and options.
	     *
	     * @param {String} key The key to order by.
	     * @param {String} mode The sort mode, default is 'avg', you can choose
	     *                  'max' or 'min' too.
	     * @param {String} missing The missing key behaviour, default is 'last',
	     *                  you can choose 'first' too.
	     * @return {AV.SearchSortBuilder} Returns the builder, so you can chain this call.
	     */
	    ascending: function ascending(key, mode, missing) {
	      return this._addField(key, 'asc', mode, missing);
	    },

	    /**
	     * Sorts the results in descending order by the given key and options.
	     *
	     * @param {String} key The key to order by.
	     * @param {String} mode The sort mode, default is 'avg', you can choose
	     *                  'max' or 'min' too.
	     * @param {String} missing The missing key behaviour, default is 'last',
	     *                  you can choose 'first' too.
	     * @return {AV.SearchSortBuilder} Returns the builder, so you can chain this call.
	     */
	    descending: function descending(key, mode, missing) {
	      return this._addField(key, 'desc', mode, missing);
	    },

	    /**
	     * Add a proximity based constraint for finding objects with key point
	     * values near the point given.
	     * @param {String} key The key that the AV.GeoPoint is stored in.
	     * @param {AV.GeoPoint} point The reference AV.GeoPoint that is used.
	     * @param {Object} options The other options such as mode,order, unit etc.
	     * @return {AV.SearchSortBuilder} Returns the builder, so you can chain this call.
	     */
	    whereNear: function whereNear(key, point, options) {
	      options = options || {};
	      var field = {};
	      var geo = {
	        lat: point.latitude,
	        lon: point.longitude
	      };
	      var m = {
	        order: options.order || 'asc',
	        mode: options.mode || 'avg',
	        unit: options.unit || 'km'
	      };
	      m[key] = geo;
	      field['_geo_distance'] = m;

	      this._sortFields.push(field);
	      return this;
	    },

	    /**
	     * Build a sort string by configuration.
	     * @return {String} the sort string.
	     */
	    build: function build() {
	      return JSON.stringify(AV._encode(this._sortFields));
	    }
	  };

	  /**
	   * App searching query.Use just like AV.Query:
	   *
	   * Visit <a href='https://leancloud.cn/docs/app_search_guide.html'>App Searching Guide</a>
	   * for more details.
	   * @class
	   * @since 0.5.1
	   * @example
	   *   var query = new AV.SearchQuery('Player');
	   *   query.queryString('*');
	   *   query.find().then(function(results) {
	   *     console.log('Found %d objects', query.hits());
	   *     //Process results
	   *   });
	   */
	  AV.SearchQuery = AV.Query._extend( /** @lends AV.SearchQuery.prototype */{
	    _sid: null,
	    _hits: 0,
	    _queryString: null,
	    _highlights: null,
	    _sortBuilder: null,
	    _createRequest: function _createRequest(params, options) {
	      return AVRequest('search/select', null, null, 'GET', params || this.toJSON(), options);
	    },

	    /**
	     * Sets the sid of app searching query.Default is null.
	     * @param {String} sid  Scroll id for searching.
	     * @return {AV.SearchQuery} Returns the query, so you can chain this call.
	     */
	    sid: function sid(_sid) {
	      this._sid = _sid;
	      return this;
	    },

	    /**
	     * Sets the query string of app searching.
	     * @param {String} q  The query string.
	     * @return {AV.SearchQuery} Returns the query, so you can chain this call.
	     */
	    queryString: function queryString(q) {
	      this._queryString = q;
	      return this;
	    },

	    /**
	     * Sets the highlight fields. Such as
	     * <pre><code>
	     *   query.highlights('title');
	     *   //or pass an array.
	     *   query.highlights(['title', 'content'])
	     * </code></pre>
	     * @param {String[]} highlights a list of fields.
	     * @return {AV.SearchQuery} Returns the query, so you can chain this call.
	     */
	    highlights: function highlights(_highlights) {
	      var objects;
	      if (_highlights && _.isString(_highlights)) {
	        objects = arguments;
	      } else {
	        objects = _highlights;
	      }
	      this._highlights = objects;
	      return this;
	    },

	    /**
	     * Sets the sort builder for this query.
	     * @see AV.SearchSortBuilder
	     * @param { AV.SearchSortBuilder} builder The sort builder.
	     * @return {AV.SearchQuery} Returns the query, so you can chain this call.
	     *
	     */
	    sortBy: function sortBy(builder) {
	      this._sortBuilder = builder;
	      return this;
	    },

	    /**
	     * Returns the number of objects that match this query.
	     * @return {Number}
	     */
	    hits: function hits() {
	      if (!this._hits) {
	        this._hits = 0;
	      }
	      return this._hits;
	    },

	    _processResult: function _processResult(json) {
	      delete json['className'];
	      delete json['_app_url'];
	      delete json['_deeplink'];
	      return json;
	    },

	    /**
	     * Returns true when there are more documents can be retrieved by this
	     * query instance, you can call find function to get more results.
	     * @see AV.SearchQuery#find
	     * @return {Boolean}
	     */
	    hasMore: function hasMore() {
	      return !this._hitEnd;
	    },

	    /**
	     * Reset current query instance state(such as sid, hits etc) except params
	     * for a new searching. After resetting, hasMore() will return true.
	     */
	    reset: function reset() {
	      this._hitEnd = false;
	      this._sid = null;
	      this._hits = 0;
	    },

	    /**
	     * Retrieves a list of AVObjects that satisfy this query.
	     * Either options.success or options.error is called when the find
	     * completes.
	     *
	     * @see AV.Query#find
	     * @return {AV.Promise} A promise that is resolved with the results when
	     * the query completes.
	     */
	    find: function find() {
	      var self = this;

	      var request = this._createRequest();

	      return request.then(function (response) {
	        //update sid for next querying.
	        if (response.sid) {
	          self._oldSid = self._sid;
	          self._sid = response.sid;
	        } else {
	          self._sid = null;
	          self._hitEnd = true;
	        }
	        self._hits = response.hits || 0;

	        return _.map(response.results, function (json) {
	          if (json.className) {
	            response.className = json.className;
	          }
	          var obj = self._newObject(response);
	          obj.appURL = json['_app_url'];
	          obj._finishFetch(self._processResult(json), true);
	          return obj;
	        });
	      });
	    },

	    toJSON: function toJSON() {
	      var params = AV.SearchQuery.__super__.toJSON.call(this);
	      delete params.where;
	      if (this.className) {
	        params.clazz = this.className;
	      }
	      if (this._sid) {
	        params.sid = this._sid;
	      }
	      if (!this._queryString) {
	        throw new Error('Please set query string.');
	      } else {
	        params.q = this._queryString;
	      }
	      if (this._highlights) {
	        params.highlights = this._highlights.join(',');
	      }
	      if (this._sortBuilder && params.order) {
	        throw new Error('sort and order can not be set at same time.');
	      }
	      if (this._sortBuilder) {
	        params.sort = this._sortBuilder.build();
	      }

	      return params;
	    }
	  });
	};

	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _ = __webpack_require__(0);
	var AVRequest = __webpack_require__(1).request;

	module.exports = function (AV) {
	  var getUser = function getUser() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    return AV.User.currentAsync().then(function (currUser) {
	      return currUser || AV.User._fetchUserBySessionToken(options.sessionToken);
	    });
	  };

	  var getUserPointer = function getUserPointer(options) {
	    return getUser(options).then(function (currUser) {
	      return AV.Object.createWithoutData('_User', currUser.id)._toPointer();
	    });
	  };

	  /**
	   * Contains functions to deal with Status in LeanCloud.
	   * @class
	   */
	  AV.Status = function (imageUrl, message) {
	    this.data = {};
	    this.inboxType = 'default';
	    this.query = null;
	    if (imageUrl && (typeof imageUrl === 'undefined' ? 'undefined' : _typeof(imageUrl)) === 'object') {
	      this.data = imageUrl;
	    } else {
	      if (imageUrl) {
	        this.data.image = imageUrl;
	      }
	      if (message) {
	        this.data.message = message;
	      }
	    }
	    return this;
	  };

	  AV.Status.prototype = {
	    /**
	     * Gets the value of an attribute in status data.
	     * @param {String} attr The string name of an attribute.
	     */
	    get: function get(attr) {
	      return this.data[attr];
	    },
	    /**
	     * Sets a hash of model attributes on the status data.
	     * @param {String} key The key to set.
	     * @param {} value The value to give it.
	     */
	    set: function set(key, value) {
	      this.data[key] = value;
	      return this;
	    },
	    /**
	     * Destroy this status,then it will not be avaiable in other user's inboxes.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the destroy
	     *     completes.
	     */
	    destroy: function destroy(options) {
	      if (!this.id) return AV.Promise.reject(new Error('The status id is not exists.'));
	      var request = AVRequest('statuses', null, this.id, 'DELETE', options && options.sessionToken);
	      return request;
	    },
	    /**
	      * Cast the AV.Status object to an AV.Object pointer.
	      * @return {AV.Object} A AV.Object pointer.
	      */
	    toObject: function toObject() {
	      if (!this.id) return null;
	      return AV.Object.createWithoutData('_Status', this.id);
	    },
	    _getDataJSON: function _getDataJSON() {
	      var json = _.clone(this.data);
	      return AV._encode(json);
	    },
	    /**
	     * Send a status by a AV.Query object.
	     * @since 0.3.0
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the send
	     *     completes.
	     * @example
	     *     // send a status to male users
	     *     var status = new AVStatus('image url', 'a message');
	     *     status.query = new AV.Query('_User');
	     *     status.query.equalTo('gender', 'male');
	     *     status.send().then(function(){
	     *              //send status successfully.
	     *      }, function(err){
	     *             //an error threw.
	     *             console.dir(err);
	     *      });
	     */
	    send: function send() {
	      var _this = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (!options.sessionToken && !AV.User.current()) {
	        throw new Error('Please signin an user.');
	      }
	      if (!this.query) {
	        return AV.Status.sendStatusToFollowers(this, options);
	      }

	      return getUserPointer(options).then(function (currUser) {
	        var query = _this.query.toJSON();
	        query.className = _this.query.className;
	        var data = {};
	        data.query = query;
	        _this.data = _this.data || {};
	        _this.data.source = _this.data.source || currUser;
	        data.data = _this._getDataJSON();
	        data.inboxType = _this.inboxType || 'default';

	        return AVRequest('statuses', null, null, 'POST', data, options.sessionToken);
	      }).then(function (response) {
	        _this.id = response.objectId;
	        _this.createdAt = AV._parseDate(response.createdAt);
	        return _this;
	      });
	    },

	    _finishFetch: function _finishFetch(serverData) {
	      this.id = serverData.objectId;
	      this.createdAt = AV._parseDate(serverData.createdAt);
	      this.updatedAt = AV._parseDate(serverData.updatedAt);
	      this.messageId = serverData.messageId;
	      delete serverData.messageId;
	      delete serverData.objectId;
	      delete serverData.createdAt;
	      delete serverData.updatedAt;
	      this.data = AV._decode(serverData);
	    }
	  };

	  /**
	   * Send a status to current signined user's followers.
	   * @since 0.3.0
	   * @param {AV.Status} status  A status object to be send to followers.
	   * @param {AuthOptions} options
	   * @return {Promise} A promise that is fulfilled when the send
	   *     completes.
	   * @example
	   *     var status = new AVStatus('image url', 'a message');
	   *     AV.Status.sendStatusToFollowers(status).then(function(){
	   *              //send status successfully.
	   *      }, function(err){
	   *             //an error threw.
	   *             console.dir(err);
	   *      });
	   */
	  AV.Status.sendStatusToFollowers = function (status) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (!options.sessionToken && !AV.User.current()) {
	      throw new Error('Please signin an user.');
	    }
	    return getUserPointer(options).then(function (currUser) {
	      var query = {};
	      query.className = '_Follower';
	      query.keys = 'follower';
	      query.where = { user: currUser };
	      var data = {};
	      data.query = query;
	      status.data = status.data || {};
	      status.data.source = status.data.source || currUser;
	      data.data = status._getDataJSON();
	      data.inboxType = status.inboxType || 'default';

	      var request = AVRequest('statuses', null, null, 'POST', data, options.sessionToken);
	      return request.then(function (response) {
	        status.id = response.objectId;
	        status.createdAt = AV._parseDate(response.createdAt);
	        return status;
	      });
	    });
	  };

	  /**
	   * <p>Send  a status from current signined user to other user's private status inbox.</p>
	   * @since 0.3.0
	   * @param {AV.Status} status  A status object to be send to followers.
	   * @param {String} target The target user or user's objectId.
	   * @param {AuthOptions} options
	   * @return {Promise} A promise that is fulfilled when the send
	   *     completes.
	   * @example
	   *     // send a private status to user '52e84e47e4b0f8de283b079b'
	   *     var status = new AVStatus('image url', 'a message');
	   *     AV.Status.sendPrivateStatus(status, '52e84e47e4b0f8de283b079b').then(function(){
	   *              //send status successfully.
	   *      }, function(err){
	   *             //an error threw.
	   *             console.dir(err);
	   *      });
	   */
	  AV.Status.sendPrivateStatus = function (status, target) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (!options.sessionToken && !AV.User.current()) {
	      throw new Error('Please signin an user.');
	    }
	    if (!target) {
	      throw new Error("Invalid target user.");
	    }
	    var userObjectId = _.isString(target) ? target : target.id;
	    if (!userObjectId) {
	      throw new Error("Invalid target user.");
	    }
	    return getUserPointer(options).then(function (currUser) {
	      var query = {};
	      query.className = '_User';
	      query.where = { objectId: userObjectId };
	      var data = {};
	      data.query = query;
	      status.data = status.data || {};
	      status.data.source = status.data.source || currUser;
	      data.data = status._getDataJSON();
	      data.inboxType = 'private';
	      status.inboxType = 'private';

	      var request = AVRequest('statuses', null, null, 'POST', data, options.sessionToken);
	      return request.then(function (response) {
	        status.id = response.objectId;
	        status.createdAt = AV._parseDate(response.createdAt);
	        return status;
	      });
	    });
	  };

	  /**
	   * Count unread statuses in someone's inbox.
	   * @since 0.3.0
	   * @param {Object} source The status source.
	   * @param {String} inboxType The inbox type,'default' by default.
	   * @param {AuthOptions} options
	   * @return {Promise} A promise that is fulfilled when the count
	   *     completes.
	   * @example
	   *  AV.Status.countUnreadStatuses(AV.User.current()).then(function(response){
	   *    console.log(response.unread); //unread statuses number.
	   *    console.log(response.total);  //total statuses number.
	   *  });
	   */
	  AV.Status.countUnreadStatuses = function (owner) {
	    var options = (!_.isString(arguments[1]) ? arguments[1] : arguments[2]) || {};
	    var inboxType = !_.isString(arguments[1]) ? 'default' : arguments[1];
	    if (!options.sessionToken && owner == null && !AV.User.current()) {
	      throw new Error('Please signin an user or pass the owner objectId.');
	    }
	    return getUser(options).then(function (owner) {
	      var params = {};
	      params.inboxType = AV._encode(inboxType);
	      params.owner = AV._encode(owner);
	      return AVRequest('subscribe/statuses/count', null, null, 'GET', params, options.sessionToken);
	    });
	  };

	  /**
	   * Create a status query to find someone's published statuses.
	   * @since 0.3.0
	   * @param {Object} source The status source.
	   * @return {AV.Query} The query object for status.
	   * @example
	   *   //Find current user's published statuses.
	   *   var query = AV.Status.statusQuery(AV.User.current());
	   *   query.find().then(function(statuses){
	   *      //process statuses
	   *   });
	   */
	  AV.Status.statusQuery = function (source) {
	    var query = new AV.Query('_Status');
	    if (source) {
	      query.equalTo('source', source);
	    }
	    return query;
	  };

	  /**
	   * <p>AV.InboxQuery defines a query that is used to fetch somebody's inbox statuses.</p>
	   * @class
	   */
	  AV.InboxQuery = AV.Query._extend( /** @lends AV.InboxQuery.prototype */{
	    _objectClass: AV.Status,
	    _sinceId: 0,
	    _maxId: 0,
	    _inboxType: 'default',
	    _owner: null,
	    _newObject: function _newObject() {
	      return new AV.Status();
	    },
	    _createRequest: function _createRequest(params, options) {
	      return AVRequest('subscribe/statuses', null, null, 'GET', params || this.toJSON(), options && options.sessionToken);
	    },

	    /**
	     * Sets the messageId of results to skip before returning any results.
	     * This is useful for pagination.
	     * Default is zero.
	     * @param {Number} n the mesage id.
	     * @return {AV.InboxQuery} Returns the query, so you can chain this call.
	     */
	    sinceId: function sinceId(id) {
	      this._sinceId = id;
	      return this;
	    },
	    /**
	     * Sets the maximal messageId of results。
	     * This is useful for pagination.
	     * Default is zero that is no limition.
	     * @param {Number} n the mesage id.
	     * @return {AV.InboxQuery} Returns the query, so you can chain this call.
	     */
	    maxId: function maxId(id) {
	      this._maxId = id;
	      return this;
	    },
	    /**
	     * Sets the owner of the querying inbox.
	     * @param {Object} owner The inbox owner.
	     * @return {AV.InboxQuery} Returns the query, so you can chain this call.
	     */
	    owner: function owner(_owner) {
	      this._owner = _owner;
	      return this;
	    },
	    /**
	     * Sets the querying inbox type.default is 'default'.
	     * @param {Object} owner The inbox type.
	     * @return {AV.InboxQuery} Returns the query, so you can chain this call.
	     */
	    inboxType: function inboxType(type) {
	      this._inboxType = type;
	      return this;
	    },
	    toJSON: function toJSON() {
	      var params = AV.InboxQuery.__super__.toJSON.call(this);
	      params.owner = AV._encode(this._owner);
	      params.inboxType = AV._encode(this._inboxType);
	      params.sinceId = AV._encode(this._sinceId);
	      params.maxId = AV._encode(this._maxId);
	      return params;
	    }
	  });

	  /**
	   * Create a inbox status query to find someone's inbox statuses.
	   * @since 0.3.0
	   * @param {Object} owner The inbox's owner
	   * @param {String} inboxType The inbox type,'default' by default.
	   * @return {AV.InboxQuery} The inbox query object.
	   * @see AV.InboxQuery
	   * @example
	   *   //Find current user's default inbox statuses.
	   *   var query = AV.Status.inboxQuery(AV.User.current());
	   *   //find the statuses after the last message id
	   *   query.sinceId(lastMessageId);
	   *   query.find().then(function(statuses){
	   *      //process statuses
	   *   });
	   */
	  AV.Status.inboxQuery = function (owner, inboxType) {
	    var query = new AV.InboxQuery(AV.Status);
	    if (owner) {
	      query._owner = owner;
	    }
	    if (inboxType) {
	      query._inboxType = inboxType;
	    }
	    return query;
	  };
	};

	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _ = __webpack_require__(0);
	var AVError = __webpack_require__(3);
	var AVRequest = __webpack_require__(1).request;
	var Promise = __webpack_require__(2);

	var getWeappLoginCode = function getWeappLoginCode() {
	  if (typeof wx === 'undefined' || typeof wx.login !== 'function') {
	    throw new Error('Weapp Login is only available in Weapp');
	  }
	  return new Promise(function (resolve, reject) {
	    wx.login({
	      success: function success(_ref) {
	        var code = _ref.code,
	            errMsg = _ref.errMsg;

	        if (code) {
	          resolve(code);
	        } else {
	          reject(new Error(errMsg));
	        }
	      }
	    });
	  });
	};

	module.exports = function (AV) {
	  /**
	   * @class
	   *
	   * <p>An AV.User object is a local representation of a user persisted to the
	   * LeanCloud server. This class is a subclass of an AV.Object, and retains the
	   * same functionality of an AV.Object, but also extends it with various
	   * user specific methods, like authentication, signing up, and validation of
	   * uniqueness.</p>
	   */
	  AV.User = AV.Object.extend("_User", /** @lends AV.User.prototype */{
	    // Instance Variables
	    _isCurrentUser: false,

	    // Instance Methods

	    /**
	     * Internal method to handle special fields in a _User response.
	     * @private
	     */
	    _mergeMagicFields: function _mergeMagicFields(attrs) {
	      if (attrs.sessionToken) {
	        this._sessionToken = attrs.sessionToken;
	        delete attrs.sessionToken;
	      }
	      AV.User.__super__._mergeMagicFields.call(this, attrs);
	    },

	    /**
	     * Removes null values from authData (which exist temporarily for
	     * unlinking)
	     * @private
	     */
	    _cleanupAuthData: function _cleanupAuthData() {
	      if (!this.isCurrent()) {
	        return;
	      }
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }
	      AV._objectEach(this.get('authData'), function (value, key) {
	        if (!authData[key]) {
	          delete authData[key];
	        }
	      });
	    },

	    /**
	     * Synchronizes authData for all providers.
	     * @private
	     */
	    _synchronizeAllAuthData: function _synchronizeAllAuthData() {
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }

	      var self = this;
	      AV._objectEach(this.get('authData'), function (value, key) {
	        self._synchronizeAuthData(key);
	      });
	    },

	    /**
	     * Synchronizes auth data for a provider (e.g. puts the access token in the
	     * right place to be used by the Facebook SDK).
	     * @private
	     */
	    _synchronizeAuthData: function _synchronizeAuthData(provider) {
	      if (!this.isCurrent()) {
	        return;
	      }
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	        provider = AV.User._authProviders[authType];
	      } else {
	        authType = provider.getAuthType();
	      }
	      var authData = this.get('authData');
	      if (!authData || !provider) {
	        return;
	      }
	      var success = provider.restoreAuthentication(authData[authType]);
	      if (!success) {
	        this._unlinkFrom(provider);
	      }
	    },

	    _handleSaveResult: function _handleSaveResult(makeCurrent) {
	      // Clean up and synchronize the authData object, removing any unset values
	      if (makeCurrent && !AV._config.disableCurrentUser) {
	        this._isCurrentUser = true;
	      }
	      this._cleanupAuthData();
	      this._synchronizeAllAuthData();
	      // Don't keep the password around.
	      delete this._serverData.password;
	      this._rebuildEstimatedDataForKey("password");
	      this._refreshCache();
	      if ((makeCurrent || this.isCurrent()) && !AV._config.disableCurrentUser) {
	        // Some old version of leanengine-node-sdk will overwrite
	        // AV.User._saveCurrentUser which returns no Promise.
	        // So we need a Promise wrapper.
	        return Promise.resolve(AV.User._saveCurrentUser(this));
	      } else {
	        return Promise.resolve();
	      }
	    },

	    /**
	     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
	     * call linkWith on the user (even if it doesn't exist yet on the server).
	     * @private
	     */
	    _linkWith: function _linkWith(provider, data) {
	      var _this = this;

	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	        provider = AV.User._authProviders[provider];
	      } else {
	        authType = provider.getAuthType();
	      }
	      if (data) {
	        var authData = this.get('authData') || {};
	        authData[authType] = data;
	        return this.save({ authData: authData }).then(function (model) {
	          return model._handleSaveResult(true).then(function () {
	            return model;
	          });
	        });
	      } else {
	        return provider.authenticate().then(function (result) {
	          return _this._linkWith(provider, result);
	        });
	      }
	    },

	    /**
	     * 将用户与小程序用户进行关联。适用于为已经在用户系统中存在的用户关联当前使用小程序的微信帐号。
	     * 仅在小程序中可用。
	     *
	     * @return {AV.User}
	     */
	    linkWithWeapp: function linkWithWeapp() {
	      var _this2 = this;

	      return getWeappLoginCode().then(function (code) {
	        return _this2._linkWith('lc_weapp', { code: code });
	      });
	    },


	    /**
	     * Unlinks a user from a service.
	     * @private
	     */
	    _unlinkFrom: function _unlinkFrom(provider) {
	      var _this3 = this;

	      if (_.isString(provider)) {
	        provider = AV.User._authProviders[provider];
	      }
	      return this._linkWith(provider, null).then(function (model) {
	        _this3._synchronizeAuthData(provider);
	        return model;
	      });
	    },

	    /**
	     * Checks whether a user is linked to a service.
	     * @private
	     */
	    _isLinked: function _isLinked(provider) {
	      var authType;
	      if (_.isString(provider)) {
	        authType = provider;
	      } else {
	        authType = provider.getAuthType();
	      }
	      var authData = this.get('authData') || {};
	      return !!authData[authType];
	    },

	    logOut: function logOut() {
	      this._logOutWithAll();
	      this._isCurrentUser = false;
	    },

	    /**
	     * Deauthenticates all providers.
	     * @private
	     */
	    _logOutWithAll: function _logOutWithAll() {
	      var authData = this.get('authData');
	      if (!authData) {
	        return;
	      }
	      var self = this;
	      AV._objectEach(this.get('authData'), function (value, key) {
	        self._logOutWith(key);
	      });
	    },

	    /**
	     * Deauthenticates a single provider (e.g. removing access tokens from the
	     * Facebook SDK).
	     * @private
	     */
	    _logOutWith: function _logOutWith(provider) {
	      if (!this.isCurrent()) {
	        return;
	      }
	      if (_.isString(provider)) {
	        provider = AV.User._authProviders[provider];
	      }
	      if (provider && provider.deauthenticate) {
	        provider.deauthenticate();
	      }
	    },

	    /**
	     * Signs up a new user. You should call this instead of save for
	     * new AV.Users. This will create a new AV.User on the server, and
	     * also persist the session on disk so that you can access the user using
	     * <code>current</code>.
	     *
	     * <p>A username and password must be set before calling signUp.</p>
	     *
	     * @param {Object} attrs Extra fields to set on the new user, or null.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the signup
	     *     finishes.
	     * @see AV.User.signUp
	     */
	    signUp: function signUp(attrs, options) {
	      var error;

	      var username = attrs && attrs.username || this.get("username");
	      if (!username || username === "") {
	        error = new AVError(AVError.OTHER_CAUSE, "Cannot sign up user with an empty name.");
	        throw error;
	      }

	      var password = attrs && attrs.password || this.get("password");
	      if (!password || password === "") {
	        error = new AVError(AVError.OTHER_CAUSE, "Cannot sign up user with an empty password.");
	        throw error;
	      }

	      return this.save(attrs, options).then(function (model) {
	        return model._handleSaveResult(true).then(function () {
	          return model;
	        });
	      });
	    },

	    /**
	     * Signs up a new user with mobile phone and sms code.
	     * You should call this instead of save for
	     * new AV.Users. This will create a new AV.User on the server, and
	     * also persist the session on disk so that you can access the user using
	     * <code>current</code>.
	     *
	     * <p>A username and password must be set before calling signUp.</p>
	     *
	     * @param {Object} attrs Extra fields to set on the new user, or null.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled when the signup
	     *     finishes.
	     * @see AV.User.signUpOrlogInWithMobilePhone
	     * @see AV.Cloud.requestSmsCode
	     */
	    signUpOrlogInWithMobilePhone: function signUpOrlogInWithMobilePhone(attrs) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var error;

	      var mobilePhoneNumber = attrs && attrs.mobilePhoneNumber || this.get("mobilePhoneNumber");
	      if (!mobilePhoneNumber || mobilePhoneNumber === "") {
	        error = new AVError(AVError.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber " + "with an empty mobilePhoneNumber.");
	        throw error;
	      }

	      var smsCode = attrs && attrs.smsCode || this.get("smsCode");
	      if (!smsCode || smsCode === "") {
	        error = new AVError(AVError.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  " + "with an empty smsCode.");
	        throw error;
	      }

	      options._makeRequest = function (route, className, id, method, json) {
	        return AVRequest('usersByMobilePhone', null, null, "POST", json);
	      };
	      return this.save(attrs, options).then(function (model) {
	        delete model.attributes.smsCode;
	        delete model._serverData.smsCode;
	        return model._handleSaveResult(true).then(function () {
	          return model;
	        });
	      });
	    },

	    /**
	     * Logs in a AV.User. On success, this saves the session to localStorage,
	     * so you can retrieve the currently logged in user using
	     * <code>current</code>.
	     *
	     * <p>A username and password must be set before calling logIn.</p>
	     *
	     * @see AV.User.logIn
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login is complete.
	     */
	    logIn: function logIn() {
	      var model = this;
	      var request = AVRequest('login', null, null, 'POST', this.toJSON());
	      return request.then(function (resp) {
	        var serverAttrs = model.parse(resp);
	        model._finishFetch(serverAttrs);
	        return model._handleSaveResult(true).then(function () {
	          if (!serverAttrs.smsCode) delete model.attributes['smsCode'];
	          return model;
	        });
	      });
	    },
	    /**
	     * @see AV.Object#save
	     */
	    save: function save(arg1, arg2, arg3) {
	      var i, attrs, current, options, saved;
	      if (_.isObject(arg1) || _.isNull(arg1) || _.isUndefined(arg1)) {
	        attrs = arg1;
	        options = arg2;
	      } else {
	        attrs = {};
	        attrs[arg1] = arg2;
	        options = arg3;
	      }
	      options = options || {};

	      return AV.Object.prototype.save.call(this, attrs, options).then(function (model) {
	        return model._handleSaveResult(false).then(function () {
	          return model;
	        });
	      });
	    },

	    /**
	     * Follow a user
	     * @since 0.3.0
	     * @param {AV.User | String} target The target user or user's objectId to follow.
	     * @param {AuthOptions} options
	     */
	    follow: function follow(target, options) {
	      if (!this.id) {
	        throw new Error('Please signin.');
	      }
	      if (!target) {
	        throw new Error('Invalid target user.');
	      }
	      var userObjectId = _.isString(target) ? target : target.id;
	      if (!userObjectId) {
	        throw new Error('Invalid target user.');
	      }
	      var route = 'users/' + this.id + '/friendship/' + userObjectId;
	      var request = AVRequest(route, null, null, 'POST', null, options);
	      return request;
	    },

	    /**
	     * Unfollow a user.
	     * @since 0.3.0
	     * @param {AV.User | String} target The target user or user's objectId to unfollow.
	     * @param {AuthOptions} options
	     */
	    unfollow: function unfollow(target, options) {
	      if (!this.id) {
	        throw new Error('Please signin.');
	      }
	      if (!target) {
	        throw new Error('Invalid target user.');
	      }
	      var userObjectId = _.isString(target) ? target : target.id;
	      if (!userObjectId) {
	        throw new Error('Invalid target user.');
	      }
	      var route = 'users/' + this.id + '/friendship/' + userObjectId;
	      var request = AVRequest(route, null, null, 'DELETE', null, options);
	      return request;
	    },

	    /**
	     *Create a follower query to query the user's followers.
	     * @since 0.3.0
	     * @see AV.User#followerQuery
	     */
	    followerQuery: function followerQuery() {
	      return AV.User.followerQuery(this.id);
	    },

	    /**
	     *Create a followee query to query the user's followees.
	     * @since 0.3.0
	     * @see AV.User#followeeQuery
	     */
	    followeeQuery: function followeeQuery() {
	      return AV.User.followeeQuery(this.id);
	    },

	    /**
	     * @see AV.Object#fetch
	     */
	    fetch: function fetch(fetchOptions, options) {
	      return AV.Object.prototype.fetch.call(this, fetchOptions, options).then(function (model) {
	        return model._handleSaveResult(false).then(function () {
	          return model;
	        });
	      });
	    },

	    /**
	     * Update user's new password safely based on old password.
	     * @param {String} oldPassword the old password.
	     * @param {String} newPassword the new password.
	     * @param {AuthOptions} options
	     */
	    updatePassword: function updatePassword(oldPassword, newPassword, options) {
	      var route = 'users/' + this.id + '/updatePassword';
	      var params = {
	        old_password: oldPassword,
	        new_password: newPassword
	      };
	      var request = AVRequest(route, null, null, 'PUT', params, options);
	      return request;
	    },

	    /**
	     * Returns true if <code>current</code> would return this user.
	     * @see AV.User#current
	     */
	    isCurrent: function isCurrent() {
	      return this._isCurrentUser;
	    },

	    /**
	     * Returns get("username").
	     * @return {String}
	     * @see AV.Object#get
	     */
	    getUsername: function getUsername() {
	      return this.get("username");
	    },

	    /**
	     * Returns get("mobilePhoneNumber").
	     * @return {String}
	     * @see AV.Object#get
	     */
	    getMobilePhoneNumber: function getMobilePhoneNumber() {
	      return this.get("mobilePhoneNumber");
	    },

	    /**
	     * Calls set("mobilePhoneNumber", phoneNumber, options) and returns the result.
	     * @param {String} mobilePhoneNumber
	     * @param {AuthOptions} options
	     * @return {Boolean}
	     * @see AV.Object#set
	     */
	    setMobilePhoneNumber: function setMobilePhoneNumber(phone, options) {
	      return this.set("mobilePhoneNumber", phone, options);
	    },

	    /**
	     * Calls set("username", username, options) and returns the result.
	     * @param {String} username
	     * @param {AuthOptions} options
	     * @return {Boolean}
	     * @see AV.Object#set
	     */
	    setUsername: function setUsername(username, options) {
	      return this.set("username", username, options);
	    },

	    /**
	     * Calls set("password", password, options) and returns the result.
	     * @param {String} password
	     * @param {AuthOptions} options
	     * @return {Boolean}
	     * @see AV.Object#set
	     */
	    setPassword: function setPassword(password, options) {
	      return this.set("password", password, options);
	    },

	    /**
	     * Returns get("email").
	     * @return {String}
	     * @see AV.Object#get
	     */
	    getEmail: function getEmail() {
	      return this.get("email");
	    },

	    /**
	     * Calls set("email", email, options) and returns the result.
	     * @param {String} email
	     * @param {AuthOptions} options
	     * @return {Boolean}
	     * @see AV.Object#set
	     */
	    setEmail: function setEmail(email, options) {
	      return this.set("email", email, options);
	    },

	    /**
	     * Checks whether this user is the current user and has been authenticated.
	     * @deprecated 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，
	     * 如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id
	     * @return (Boolean) whether this user is the current user and is logged in.
	     */
	    authenticated: function authenticated() {
	      console.warn('DEPRECATED: 如果要判断当前用户的登录状态是否有效，请使用 currentUser.isAuthenticated().then()，如果要判断该用户是否是当前登录用户，请使用 user.id === currentUser.id。');
	      return !!this._sessionToken && !AV._config.disableCurrentUser && AV.User.current() && AV.User.current().id === this.id;
	    },

	    /**
	     * 检查该用户的登录状态是否有效，请注意该方法会校验 sessionToken 的有效性，是个异步方法。
	     *
	     * @since 2.0.0
	     * @return Promise.<Boolean>
	     */
	    isAuthenticated: function isAuthenticated() {
	      var _this4 = this;

	      return Promise.resolve().then(function () {
	        return !!_this4._sessionToken && AV.User._fetchUserBySessionToken(_this4._sessionToken).then(function () {
	          return true;
	        }, function (error) {
	          if (error.code === 211) {
	            return false;
	          }
	          throw error;
	        });
	      });
	    },


	    /**
	     * Get sessionToken of current user.
	     * @return {String} sessionToken
	     */
	    getSessionToken: function getSessionToken() {
	      return this._sessionToken;
	    },

	    /**
	     * Get this user's Roles.
	     * @param {AuthOptions} [options]
	     * @return {Promise} A promise that is fulfilled with the roles when
	     *     the query is complete.
	     */
	    getRoles: function getRoles(options) {
	      return AV.Relation.reverseQuery("_Role", "users", this).find(options);
	    }
	  }, /** @lends AV.User */{
	    // Class Variables

	    // The currently logged-in user.
	    _currentUser: null,

	    // Whether currentUser is known to match the serialized version on disk.
	    // This is useful for saving a localstorage check if you try to load
	    // _currentUser frequently while there is none stored.
	    _currentUserMatchesDisk: false,

	    // The localStorage key suffix that the current user is stored under.
	    _CURRENT_USER_KEY: "currentUser",

	    // The mapping of auth provider names to actual providers
	    _authProviders: {},

	    // Class Methods

	    /**
	     * Signs up a new user with a username (or email) and password.
	     * This will create a new AV.User on the server, and also persist the
	     * session in localStorage so that you can access the user using
	     * {@link #current}.
	     *
	     * @param {String} username The username (or email) to sign up with.
	     * @param {String} password The password to sign up with.
	     * @param {Object} attrs Extra fields to set on the new user.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the signup completes.
	     * @see AV.User#signUp
	     */
	    signUp: function signUp(username, password, attrs, options) {
	      attrs = attrs || {};
	      attrs.username = username;
	      attrs.password = password;
	      var user = AV.Object._create("_User");
	      return user.signUp(attrs, options);
	    },

	    /**
	     * Logs in a user with a username (or email) and password. On success, this
	     * saves the session to disk, so you can retrieve the currently logged in
	     * user using <code>current</code>.
	     *
	     * @param {String} username The username (or email) to log in with.
	     * @param {String} password The password to log in with.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @see AV.User#logIn
	     */
	    logIn: function logIn(username, password, options) {
	      var user = AV.Object._create("_User");
	      user._finishFetch({ username: username, password: password });
	      return user.logIn(options);
	    },

	    /**
	     * Logs in a user with a session token. On success, this saves the session
	     * to disk, so you can retrieve the currently logged in user using
	     * <code>current</code>.
	     *
	     * @param {String} sessionToken The sessionToken to log in with.
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     */
	    become: function become(sessionToken) {
	      return this._fetchUserBySessionToken(sessionToken).then(function (user) {
	        return user._handleSaveResult(true).then(function () {
	          return user;
	        });
	      });
	    },

	    _fetchUserBySessionToken: function _fetchUserBySessionToken(sessionToken) {
	      var user = AV.Object._create("_User");
	      return AVRequest("users", "me", null, "GET", {
	        session_token: sessionToken
	      }).then(function (resp) {
	        var serverAttrs = user.parse(resp);
	        user._finishFetch(serverAttrs);
	        return user;
	      });
	    },

	    /**
	     * Logs in a user with a mobile phone number and sms code sent by
	     * AV.User.requestLoginSmsCode.On success, this
	     * saves the session to disk, so you can retrieve the currently logged in
	     * user using <code>current</code>.
	     *
	     * @param {String} mobilePhone The user's mobilePhoneNumber
	     * @param {String} smsCode The sms code sent by AV.User.requestLoginSmsCode
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @see AV.User#logIn
	     */
	    logInWithMobilePhoneSmsCode: function logInWithMobilePhoneSmsCode(mobilePhone, smsCode, options) {
	      var user = AV.Object._create("_User");
	      user._finishFetch({ mobilePhoneNumber: mobilePhone, smsCode: smsCode });
	      return user.logIn(options);
	    },

	    /**
	     * Sign up or logs in a user with a mobilePhoneNumber and smsCode.
	     * On success, this saves the session to disk, so you can retrieve the currently
	     * logged in user using <code>current</code>.
	     *
	     * @param {String} mobilePhoneNumber The user's mobilePhoneNumber.
	     * @param {String} smsCode The sms code sent by AV.Cloud.requestSmsCode
	     * @param {Object} attributes  The user's other attributes such as username etc.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @see AV.User#signUpOrlogInWithMobilePhone
	     * @see AV.Cloud.requestSmsCode
	     */
	    signUpOrlogInWithMobilePhone: function signUpOrlogInWithMobilePhone(mobilePhoneNumber, smsCode, attrs, options) {
	      attrs = attrs || {};
	      attrs.mobilePhoneNumber = mobilePhoneNumber;
	      attrs.smsCode = smsCode;
	      var user = AV.Object._create("_User");
	      return user.signUpOrlogInWithMobilePhone(attrs, options);
	    },

	    /**
	     * Logs in a user with a mobile phone number and password. On success, this
	     * saves the session to disk, so you can retrieve the currently logged in
	     * user using <code>current</code>.
	     *
	     * @param {String} mobilePhone The user's mobilePhoneNumber
	     * @param {String} password The password to log in with.
	     * @param {AuthOptions} options
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @see AV.User#logIn
	     */
	    logInWithMobilePhone: function logInWithMobilePhone(mobilePhone, password, options) {
	      var user = AV.Object._create("_User");
	      user._finishFetch({ mobilePhoneNumber: mobilePhone, password: password });
	      return user.logIn(options);
	    },

	    /**
	     * Sign up or logs in a user with a third party auth data(AccessToken).
	     * On success, this saves the session to disk, so you can retrieve the currently
	     * logged in user using <code>current</code>.
	     *
	     * @param {Object} authData The response json data returned from third party token, maybe like { openid: 'abc123', access_token: '123abc', expires_in: 1382686496 }
	     * @param {string} platform Available platform for sign up.
	     * @return {Promise} A promise that is fulfilled with the user when
	     *     the login completes.
	     * @example AV.User.signUpOrlogInWithAuthData(authData, platform).then(function(user) {
	     *   //Access user here
	     * }).catch(function(error) {
	     *   //console.error("error: ", error);
	     * });
	     * @see {@link https://leancloud.cn/docs/js_guide.html#绑定第三方平台账户}
	     */
	    signUpOrlogInWithAuthData: function signUpOrlogInWithAuthData(authData, platform) {
	      return AV.User._logInWith(platform, authData);
	    },


	    /**
	     * 使用当前使用小程序的微信用户身份注册或登录，成功后用户的 session 会在设备上持久化保存，之后可以使用 AV.User.current() 获取当前登录用户。
	     * 仅在小程序中可用。
	     *
	     * @since 2.0.0
	     * @return {AV.User}
	     */
	    loginWithWeapp: function loginWithWeapp() {
	      var _this5 = this;

	      return getWeappLoginCode().then(function (code) {
	        return _this5.signUpOrlogInWithAuthData({ code: code }, 'lc_weapp');
	      });
	    },


	    /**
	     * Associate a user with a third party auth data(AccessToken).
	     *
	     * @param {AV.User} userObj A user which you want to associate.
	     * @param {string} platform Available platform for sign up.
	     * @param {Object} authData The response json data returned from third party token, maybe like { openid: 'abc123', access_token: '123abc', expires_in: 1382686496 }
	     * @return {Promise} A promise that is fulfilled with the user when completed.
	     * @example AV.User.associateWithAuthData(loginUser, 'weixin', {
	     *   openid: 'abc123',
	     *   access_token: '123abc',
	     *   expires_in: 1382686496
	     * }).then(function(user) {
	     *   //Access user here
	     * }).catch(function(error) {
	     *   //console.error("error: ", error);
	     * });
	     */
	    associateWithAuthData: function associateWithAuthData(userObj, platform, authData) {
	      return userObj._linkWith(platform, authData);
	    },

	    /**
	     * Logs out the currently logged in user session. This will remove the
	     * session from disk, log out of linked services, and future calls to
	     * <code>current</code> will return <code>null</code>.
	     * @return {Promise}
	     */
	    logOut: function logOut() {
	      if (AV._config.disableCurrentUser) {
	        console.warn('AV.User.current() was disabled in multi-user environment, call logOut() from user object instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html');
	        return Promise.resolve(null);
	      }

	      if (AV.User._currentUser !== null) {
	        AV.User._currentUser._logOutWithAll();
	        AV.User._currentUser._isCurrentUser = false;
	      }
	      AV.User._currentUserMatchesDisk = true;
	      AV.User._currentUser = null;
	      return AV.localStorage.removeItemAsync(AV._getAVPath(AV.User._CURRENT_USER_KEY));
	    },

	    /**
	     *Create a follower query for special user to query the user's followers.
	     * @param {String} userObjectId The user object id.
	     * @return {AV.FriendShipQuery}
	     * @since 0.3.0
	     */
	    followerQuery: function followerQuery(userObjectId) {
	      if (!userObjectId || !_.isString(userObjectId)) {
	        throw new Error('Invalid user object id.');
	      }
	      var query = new AV.FriendShipQuery('_Follower');
	      query._friendshipTag = 'follower';
	      query.equalTo('user', AV.Object.createWithoutData('_User', userObjectId));
	      return query;
	    },

	    /**
	     *Create a followee query for special user to query the user's followees.
	     * @param {String} userObjectId The user object id.
	     * @return {AV.FriendShipQuery}
	     * @since 0.3.0
	     */
	    followeeQuery: function followeeQuery(userObjectId) {
	      if (!userObjectId || !_.isString(userObjectId)) {
	        throw new Error('Invalid user object id.');
	      }
	      var query = new AV.FriendShipQuery('_Followee');
	      query._friendshipTag = 'followee';
	      query.equalTo('user', AV.Object.createWithoutData('_User', userObjectId));
	      return query;
	    },

	    /**
	     * Requests a password reset email to be sent to the specified email address
	     * associated with the user account. This email allows the user to securely
	     * reset their password on the AV site.
	     *
	     * @param {String} email The email address associated with the user that
	     *     forgot their password.
	     * @return {Promise}
	     */
	    requestPasswordReset: function requestPasswordReset(email) {
	      var json = { email: email };
	      var request = AVRequest("requestPasswordReset", null, null, "POST", json);
	      return request;
	    },

	    /**
	     * Requests a verify email to be sent to the specified email address
	     * associated with the user account. This email allows the user to securely
	     * verify their email address on the AV site.
	     *
	     * @param {String} email The email address associated with the user that
	     *     doesn't verify their email address.
	     * @return {Promise}
	     */
	    requestEmailVerify: function requestEmailVerify(email) {
	      var json = { email: email };
	      var request = AVRequest("requestEmailVerify", null, null, "POST", json);
	      return request;
	    },

	    /**
	     * Requests a verify sms code to be sent to the specified mobile phone
	     * number associated with the user account. This sms code allows the user to
	     * verify their mobile phone number by calling AV.User.verifyMobilePhone
	     *
	     * @param {String} mobilePhone The mobile phone number  associated with the
	     *                  user that doesn't verify their mobile phone number.
	     * @return {Promise}
	     */
	    requestMobilePhoneVerify: function requestMobilePhoneVerify(mobilePhone) {
	      var json = { mobilePhoneNumber: mobilePhone };
	      var request = AVRequest("requestMobilePhoneVerify", null, null, "POST", json);
	      return request;
	    },

	    /**
	     * Requests a reset password sms code to be sent to the specified mobile phone
	     * number associated with the user account. This sms code allows the user to
	     * reset their account's password by calling AV.User.resetPasswordBySmsCode
	     *
	     * @param {String} mobilePhone The mobile phone number  associated with the
	     *                  user that doesn't verify their mobile phone number.
	     * @return {Promise}
	     */
	    requestPasswordResetBySmsCode: function requestPasswordResetBySmsCode(mobilePhone) {
	      var json = { mobilePhoneNumber: mobilePhone };
	      var request = AVRequest("requestPasswordResetBySmsCode", null, null, "POST", json);
	      return request;
	    },

	    /**
	     * Makes a call to reset user's account password by sms code and new password.
	     * The sms code is sent by AV.User.requestPasswordResetBySmsCode.
	     * @param {String} code The sms code sent by AV.User.Cloud.requestSmsCode
	     * @param {String} password The new password.
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    resetPasswordBySmsCode: function resetPasswordBySmsCode(code, password) {
	      var json = { password: password };
	      var request = AVRequest("resetPasswordBySmsCode", null, code, "PUT", json);
	      return request;
	    },

	    /**
	     * Makes a call to verify sms code that sent by AV.User.Cloud.requestSmsCode
	     * If verify successfully,the user mobilePhoneVerified attribute will be true.
	     * @param {String} code The sms code sent by AV.User.Cloud.requestSmsCode
	     * @return {Promise} A promise that will be resolved with the result
	     * of the function.
	     */
	    verifyMobilePhone: function verifyMobilePhone(code) {
	      var request = AVRequest("verifyMobilePhone", null, code, "POST", null);
	      return request;
	    },

	    /**
	     * Requests a logIn sms code to be sent to the specified mobile phone
	     * number associated with the user account. This sms code allows the user to
	     * login by AV.User.logInWithMobilePhoneSmsCode function.
	     *
	     * @param {String} mobilePhone The mobile phone number  associated with the
	     *           user that want to login by AV.User.logInWithMobilePhoneSmsCode
	     * @return {Promise}
	     */
	    requestLoginSmsCode: function requestLoginSmsCode(mobilePhone) {
	      var json = { mobilePhoneNumber: mobilePhone };
	      var request = AVRequest("requestLoginSmsCode", null, null, "POST", json);
	      return request;
	    },

	    /**
	     * Retrieves the currently logged in AVUser with a valid session,
	     * either from memory or localStorage, if necessary.
	     * @return {Promise.<AV.User>} resolved with the currently logged in AV.User.
	     */
	    currentAsync: function currentAsync() {
	      if (AV._config.disableCurrentUser) {
	        console.warn('AV.User.currentAsync() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html');
	        return Promise.resolve(null);
	      }

	      if (AV.User._currentUser) {
	        return Promise.resolve(AV.User._currentUser);
	      }

	      if (AV.User._currentUserMatchesDisk) {

	        return Promise.resolve(AV.User._currentUser);
	      }

	      return AV.localStorage.getItemAsync(AV._getAVPath(AV.User._CURRENT_USER_KEY)).then(function (userData) {
	        if (!userData) {
	          return null;
	        }

	        // Load the user from local storage.
	        AV.User._currentUserMatchesDisk = true;

	        AV.User._currentUser = AV.Object._create("_User");
	        AV.User._currentUser._isCurrentUser = true;

	        var json = JSON.parse(userData);
	        AV.User._currentUser.id = json._id;
	        delete json._id;
	        AV.User._currentUser._sessionToken = json._sessionToken;
	        delete json._sessionToken;
	        AV.User._currentUser._finishFetch(json);
	        //AV.User._currentUser.set(json);

	        AV.User._currentUser._synchronizeAllAuthData();
	        AV.User._currentUser._refreshCache();
	        AV.User._currentUser._opSetQueue = [{}];
	        return AV.User._currentUser;
	      });
	    },

	    /**
	     * Retrieves the currently logged in AVUser with a valid session,
	     * either from memory or localStorage, if necessary.
	     * @return {AV.User} The currently logged in AV.User.
	     */
	    current: function current() {
	      if (AV._config.disableCurrentUser) {
	        console.warn('AV.User.current() was disabled in multi-user environment, access user from request instead https://leancloud.cn/docs/leanengine-node-sdk-upgrade-1.html');
	        return null;
	      }

	      if (AV.User._currentUser) {
	        return AV.User._currentUser;
	      }

	      if (AV.User._currentUserMatchesDisk) {

	        return AV.User._currentUser;
	      }

	      // Load the user from local storage.
	      AV.User._currentUserMatchesDisk = true;

	      var userData = AV.localStorage.getItem(AV._getAVPath(AV.User._CURRENT_USER_KEY));
	      if (!userData) {

	        return null;
	      }
	      AV.User._currentUser = AV.Object._create("_User");
	      AV.User._currentUser._isCurrentUser = true;

	      var json = JSON.parse(userData);
	      AV.User._currentUser.id = json._id;
	      delete json._id;
	      AV.User._currentUser._sessionToken = json._sessionToken;
	      delete json._sessionToken;
	      AV.User._currentUser._finishFetch(json);
	      //AV.User._currentUser.set(json);

	      AV.User._currentUser._synchronizeAllAuthData();
	      AV.User._currentUser._refreshCache();
	      AV.User._currentUser._opSetQueue = [{}];
	      return AV.User._currentUser;
	    },

	    /**
	     * Persists a user as currentUser to localStorage, and into the singleton.
	     * @private
	     */
	    _saveCurrentUser: function _saveCurrentUser(user) {
	      var promise;
	      if (AV.User._currentUser !== user) {
	        promise = AV.User.logOut();
	      } else {
	        promise = Promise.resolve();
	      }
	      return promise.then(function () {
	        user._isCurrentUser = true;
	        AV.User._currentUser = user;

	        var json = user.toJSON();
	        json._id = user.id;
	        json._sessionToken = user._sessionToken;
	        return AV.localStorage.setItemAsync(AV._getAVPath(AV.User._CURRENT_USER_KEY), JSON.stringify(json)).then(function () {
	          AV.User._currentUserMatchesDisk = true;
	        });
	      });
	    },

	    _registerAuthenticationProvider: function _registerAuthenticationProvider(provider) {
	      AV.User._authProviders[provider.getAuthType()] = provider;
	      // Synchronize the current user with the auth provider.
	      if (!AV._config.disableCurrentUser && AV.User.current()) {
	        AV.User.current()._synchronizeAuthData(provider.getAuthType());
	      }
	    },

	    _logInWith: function _logInWith(provider, options) {
	      var user = AV.Object._create("_User");
	      return user._linkWith(provider, options);
	    }

	  });
	};

	/***/ }),
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	module.exports = [];

	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var version = __webpack_require__(12);
	var comments = ["Browser" || 'Node.js'].concat(__webpack_require__(30));

	module.exports = 'LeanCloud-JS-SDK/' + version + ' (' + comments.join('; ') + ')';

	/***/ }),
	/* 32 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var request = __webpack_require__(6);
	var debug = __webpack_require__(7)('cos');
	var Promise = __webpack_require__(2);

	module.exports = function upload(uploadInfo, data, file) {
	  var saveOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  file.attributes.url = uploadInfo.url;
	  file._bucket = uploadInfo.bucket;
	  file.id = uploadInfo.objectId;
	  var uploadUrl = uploadInfo.upload_url + "?sign=" + encodeURIComponent(uploadInfo.token);

	  return new Promise(function (resolve, reject) {
	    var req = request('POST', uploadUrl).field('fileContent', data).field('op', 'upload');
	    if (saveOptions.onprogress) {
	      req.on('progress', saveOptions.onprogress);
	    }
	    req.end(function (err, res) {
	      if (res) {
	        debug(res.status, res.body, res.text);
	      }
	      if (err) {
	        if (res) {
	          err.statusCode = res.status;
	          err.responseText = res.text;
	          err.response = res.body;
	        }
	        return reject(err);
	      }
	      resolve(file);
	    });
	  });
	};

	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var request = __webpack_require__(6);
	var Promise = __webpack_require__(2);
	var debug = __webpack_require__(7)('qiniu');

	module.exports = function upload(uploadInfo, data, file) {
	  var saveOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  file.attributes.url = uploadInfo.url;
	  file._bucket = uploadInfo.bucket;
	  file.id = uploadInfo.objectId;
	  // Get the uptoken to upload files to qiniu.
	  var uptoken = uploadInfo.token;
	  return new Promise(function (resolve, reject) {
	    var req = request('POST', 'https://up.qbox.me').field('file', data).field('name', file.attributes.name).field('key', file._qiniu_key).field('token', uptoken);
	    if (saveOptions.onprogress) {
	      req.on('progress', saveOptions.onprogress);
	    }
	    req.end(function (err, res) {
	      if (res) {
	        debug(res.status, res.body, res.text);
	      }
	      if (err) {
	        if (res) {
	          err.statusCode = res.status;
	          err.responseText = res.text;
	          err.response = res.body;
	        }
	        return reject(err);
	      }
	      resolve(file);
	    });
	  });
	};

	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var request = __webpack_require__(6);
	var AVPromise = __webpack_require__(2);

	module.exports = function upload(uploadInfo, data, file) {
	  var saveOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  file.attributes.url = uploadInfo.url;
	  file._bucket = uploadInfo.bucket;
	  file.id = uploadInfo.objectId;
	  return new Promise(function (resolve, reject) {
	    // 海外节点，针对 S3 才会返回 upload_url
	    var req = request('PUT', uploadInfo.upload_url).set('Content-Type', file.get('mime_type')).send(data);
	    if (saveOptions.onprogress) {
	      req.on('progress', saveOptions.onprogress);
	    }
	    req.end(function (err, res) {
	      if (err) {
	        if (res) {
	          err.statusCode = res.status;
	          err.responseText = res.text;
	          err.response = res.body;
	        }
	        return reject(err);
	      }
	      resolve(file);
	    });
	  });
	};

	/***/ }),
	/* 35 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(global) {

	var _ = __webpack_require__(0);
	var Promise = __webpack_require__(2);

	// interface Storage {
	//   readonly attribute boolean async;
	//   string getItem(string key);
	//   void setItem(string key, string value);
	//   void removeItem(string key);
	//   void clear();
	//   Promise getItemAsync(string key);
	//   Promise setItemAsync(string key, string value);
	//   Promise removeItemAsync(string key);
	//   Promise clearAsync();
	// }
	var Storage = {};
	var apiNames = ['getItem', 'setItem', 'removeItem', 'clear'];

	var localStorage = global.localStorage;

	try {
	  var testKey = '__storejs__';
	  localStorage.setItem(testKey, testKey);
	  if (localStorage.getItem(testKey) != testKey) {
	    throw new Error();
	  }
	  localStorage.removeItem(testKey);
	} catch (e) {
	  localStorage = __webpack_require__(42);
	}

	// in browser, `localStorage.async = false` will excute `localStorage.setItem('async', false)`
	_(apiNames).each(function (apiName) {
	  Storage[apiName] = function () {
	    return global.localStorage[apiName].apply(global.localStorage, arguments);
	  };
	});
	Storage.async = false;

	module.exports = Storage;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var dataURItoBlob = function dataURItoBlob(dataURI, type) {
	  var byteString;

	  // 传入的 base64，不是 dataURL
	  if (dataURI.indexOf('base64') < 0) {
	    byteString = atob(dataURI);
	  } else if (dataURI.split(',')[0].indexOf('base64') >= 0) {
	    type = type || dataURI.split(',')[0].split(':')[1].split(';')[0];
	    byteString = atob(dataURI.split(',')[1]);
	  } else {
	    byteString = unescape(dataURI.split(',')[1]);
	  }
	  var ia = new Uint8Array(byteString.length);
	  for (var i = 0; i < byteString.length; i++) {
	    ia[i] = byteString.charCodeAt(i);
	  }
	  return new Blob([ia], { type: type });
	};

	module.exports = dataURItoBlob;

	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


	/***/ }),
	/* 38 */
	/***/ (function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();


	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug.default = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(44);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var require;/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(49);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

	/***/ }),
	/* 41 */
	/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	(function(root) {
	  var localStorageMemory = {};
	  var cache = {};

	  /**
	   * number of stored items.
	   */
	  localStorageMemory.length = 0;

	  /**
	   * returns item for passed key, or null
	   *
	   * @para {String} key
	   *       name of item to be returned
	   * @returns {String|null}
	   */
	  localStorageMemory.getItem = function(key) {
	    return cache[key] || null;
	  };

	  /**
	   * sets item for key to passed value, as String
	   *
	   * @para {String} key
	   *       name of item to be set
	   * @para {String} value
	   *       value, will always be turned into a String
	   * @returns {undefined}
	   */
	  localStorageMemory.setItem = function(key, value) {
	    if (typeof value === 'undefined') {
	      localStorageMemory.removeItem(key);
	    } else {
	      if (!(cache.hasOwnProperty(key))) {
	        localStorageMemory.length++;
	      }

	      cache[key] = '' + value;
	    }
	  };

	  /**
	   * removes item for passed key
	   *
	   * @para {String} key
	   *       name of item to be removed
	   * @returns {undefined}
	   */
	  localStorageMemory.removeItem = function(key) {
	    if (cache.hasOwnProperty(key)) {
	      delete cache[key];
	      localStorageMemory.length--;
	    }
	  };

	  /**
	   * returns name of key at passed index
	   *
	   * @para {Number} index
	   *       Position for key to be returned (starts at 0)
	   * @returns {String|null}
	   */
	  localStorageMemory.key = function(index) {
	    return Object.keys(cache)[index] || null;
	  };

	  /**
	   * removes all stored items and sets length to 0
	   *
	   * @returns {undefined}
	   */
	  localStorageMemory.clear = function() {
	    cache = {};
	    localStorageMemory.length = 0;
	  };

	  if (true) {
	    module.exports = localStorageMemory;
	  } else {
	    root.localStorageMemory = localStorageMemory;
	  }
	})(this);


	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(38),
	      utf8 = __webpack_require__(13).utf8,
	      isBuffer = __webpack_require__(41),
	      bin = __webpack_require__(13).bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


	/***/ }),
	/* 44 */
	/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Check if `fn` is a function.
	 *
	 * @param {Function} fn
	 * @return {Boolean}
	 * @api private
	 */
	var isObject = __webpack_require__(8);

	function isFunction(fn) {
	  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
	  return tag === '[object Function]';
	}

	module.exports = isFunction;


	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(8);

	/**
	 * Expose `RequestBase`.
	 */

	module.exports = RequestBase;

	/**
	 * Initialize a new `RequestBase`.
	 *
	 * @api public
	 */

	function RequestBase(obj) {
	  if (obj) return mixin(obj);
	}

	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in RequestBase.prototype) {
	    obj[key] = RequestBase.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  this._responseTimeout = 0;
	  clearTimeout(this._timer);
	  clearTimeout(this._responseTimeoutTimer);
	  return this;
	};

	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */

	RequestBase.prototype.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Set format of binary response body.
	 * In browser valid formats are 'blob' and 'arraybuffer',
	 * which return Blob and ArrayBuffer, respectively.
	 *
	 * In Node all values result in Buffer.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};

	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */

	RequestBase.prototype.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};

	/**
	 * Set timeouts.
	 *
	 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
	 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
	 *
	 * Value of 0 or false means no timeout.
	 *
	 * @param {Number|Object} ms or {response, read, deadline}
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.timeout = function timeout(options){
	  if (!options || 'object' !== typeof options) {
	    this._timeout = options;
	    this._responseTimeout = 0;
	    return this;
	  }

	  if ('undefined' !== typeof options.deadline) {
	    this._timeout = options.deadline;
	  }
	  if ('undefined' !== typeof options.response) {
	    this._responseTimeout = options.response;
	  }
	  return this;
	};

	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} [reject]
	 * @return {Request}
	 */

	RequestBase.prototype.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    if (this._endCalled) {
	      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
	    }
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}

	RequestBase.prototype.catch = function(cb) {
	  return this.then(undefined, cb);
	};

	/**
	 * Allow for extension
	 */

	RequestBase.prototype.use = function use(fn) {
	  fn(this);
	  return this;
	}

	RequestBase.prototype.ok = function(cb) {
	  if ('function' !== typeof cb) throw Error("Callback required");
	  this._okCallback = cb;
	  return this;
	};

	RequestBase.prototype._isResponseOK = function(res) {
	  if (!res) {
	    return false;
	  }

	  if (this._okCallback) {
	    return this._okCallback(res);
	  }

	  return res.status >= 200 && res.status < 300;
	};


	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	RequestBase.prototype.get = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */

	RequestBase.prototype.getHeader = RequestBase.prototype.get;

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	RequestBase.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Write the field `name` and `val`, or multiple fields with one object
	 * for "multipart/form-data" request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 *
	 * request.post('/upload')
	 *   .field({ foo: 'bar', baz: 'qux' })
	 *   .end(callback);
	 * ```
	 *
	 * @param {String|Object} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	RequestBase.prototype.field = function(name, val) {

	  // name should be either a string or an object.
	  if (null === name ||  undefined === name) {
	    throw new Error('.field(name, val) name can not be empty');
	  }

	  if (this._data) {
	    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObject(name)) {
	    for (var key in name) {
	      this.field(key, name[key]);
	    }
	    return this;
	  }

	  if (Array.isArray(val)) {
	    for (var i in val) {
	      this.field(name, val[i]);
	    }
	    return this;
	  }

	  // val should be defined now
	  if (null === val || undefined === val) {
	    throw new Error('.field(name, val) val can not be empty');
	  }
	  if ('boolean' === typeof val) {
	    val = '' + val;
	  }
	  this._getFormData().append(name, val);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	RequestBase.prototype.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	RequestBase.prototype.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};

	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */

	RequestBase.prototype.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};


	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.send = function(data){
	  var isObj = isObject(data);
	  var type = this._header['content-type'];

	  if (this._formData) {
	    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
	  }

	  if (isObj && !this._data) {
	    if (Array.isArray(data)) {
	      this._data = [];
	    } else if (!this._isHost(data)) {
	      this._data = {};
	    }
	  } else if (data && this._data && this._isHost(this._data)) {
	    throw Error("Can't merge these send calls");
	  }

	  // merge
	  if (isObj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!isObj || this._isHost(data)) {
	    return this;
	  }

	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


	/**
	 * Sort `querystring` by the sort function
	 *
	 *
	 * Examples:
	 *
	 *       // default order
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery()
	 *         .end(callback)
	 *
	 *       // customized sort function
	 *       request.get('/user')
	 *         .query('name=Nick')
	 *         .query('search=Manny')
	 *         .sortQuery(function(a, b){
	 *           return a.length - b.length;
	 *         })
	 *         .end(callback)
	 *
	 *
	 * @param {Function} sort
	 * @return {Request} for chaining
	 * @api public
	 */

	RequestBase.prototype.sortQuery = function(sort) {
	  // _sort default to true but otherwise can be a function or boolean
	  this._sort = typeof sort === 'undefined' ? true : sort;
	  return this;
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	RequestBase.prototype._timeoutError = function(reason, timeout){
	  if (this._aborted) {
	    return;
	  }
	  var err = new Error(reason + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  err.code = 'ECONNABORTED';
	  this.timedout = true;
	  this.abort();
	  this.callback(err);
	};

	RequestBase.prototype._setTimeouts = function() {
	  var self = this;

	  // deadline
	  if (this._timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self._timeoutError('Timeout of ', self._timeout);
	    }, this._timeout);
	  }
	  // response timeout
	  if (this._responseTimeout && !this._responseTimeoutTimer) {
	    this._responseTimeoutTimer = setTimeout(function(){
	      self._timeoutError('Response timeout of ', self._responseTimeout);
	    }, this._responseTimeout);
	  }
	}


	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Module dependencies.
	 */

	var utils = __webpack_require__(48);

	/**
	 * Expose `ResponseBase`.
	 */

	module.exports = ResponseBase;

	/**
	 * Initialize a new `ResponseBase`.
	 *
	 * @api public
	 */

	function ResponseBase(obj) {
	  if (obj) return mixin(obj);
	}

	/**
	 * Mixin the prototype properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in ResponseBase.prototype) {
	    obj[key] = ResponseBase.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	ResponseBase.prototype.get = function(field){
	    return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	ResponseBase.prototype._setHeaderProperties = function(header){
	    // TODO: moar!
	    // TODO: make this a util

	    // content-type
	    var ct = header['content-type'] || '';
	    this.type = utils.type(ct);

	    // params
	    var params = utils.params(ct);
	    for (var key in params) this[key] = params[key];

	    this.links = {};

	    // links
	    try {
	        if (header.link) {
	            this.links = utils.parseLinks(header.link);
	        }
	    } catch (err) {
	        // ignore
	    }
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	ResponseBase.prototype._setStatusProperties = function(status){
	    var type = status / 100 | 0;

	    // status / class
	    this.status = this.statusCode = status;
	    this.statusType = type;

	    // basics
	    this.info = 1 == type;
	    this.ok = 2 == type;
	    this.redirect = 3 == type;
	    this.clientError = 4 == type;
	    this.serverError = 5 == type;
	    this.error = (4 == type || 5 == type)
	        ? this.toError()
	        : false;

	    // sugar
	    this.accepted = 202 == status;
	    this.noContent = 204 == status;
	    this.badRequest = 400 == status;
	    this.unauthorized = 401 == status;
	    this.notAcceptable = 406 == status;
	    this.forbidden = 403 == status;
	    this.notFound = 404 == status;
	};


	/***/ }),
	/* 48 */
	/***/ (function(module, exports) {


	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	exports.type = function(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	exports.params = function(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */);
	    var key = parts.shift();
	    var val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Parse Link header fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	exports.parseLinks = function(str){
	  return str.split(/ *, */).reduce(function(obj, str){
	    var parts = str.split(/ *; */);
	    var url = parts[0].slice(1, -1);
	    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
	    obj[rel] = url;
	    return obj;
	  }, {});
	};

	/**
	 * Strip content related fields from `header`.
	 *
	 * @param {Object} header
	 * @return {Object} header
	 * @api private
	 */

	exports.cleanHeader = function(header, shouldStripCookie){
	  delete header['content-type'];
	  delete header['content-length'];
	  delete header['transfer-encoding'];
	  delete header['host'];
	  if (shouldStripCookie) {
	    delete header['cookie'];
	  }
	  return header;
	};


	/***/ }),
	/* 49 */
	/***/ (function(module, exports) {

	/* (ignored) */

	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/*!
	 * LeanCloud JavaScript SDK
	 * https://leancloud.cn
	 *
	 * Copyright 2016 LeanCloud.cn, Inc.
	 * The LeanCloud JavaScript SDK is freely distributable under the MIT license.
	 */

	var AV = __webpack_require__(4);

	AV._ = __webpack_require__(0);
	AV.version = __webpack_require__(12);
	AV.Promise = __webpack_require__(2);
	AV.localStorage = __webpack_require__(11);
	AV.Cache = __webpack_require__(10);
	AV.Error = __webpack_require__(3);

	__webpack_require__(19);
	__webpack_require__(16)(AV);
	__webpack_require__(18)(AV);
	__webpack_require__(14)(AV);
	__webpack_require__(22)(AV);
	__webpack_require__(25)(AV);
	__webpack_require__(17)(AV);
	__webpack_require__(21)(AV);
	__webpack_require__(26)(AV);
	__webpack_require__(29)(AV);
	__webpack_require__(24)(AV);
	__webpack_require__(15)(AV);
	__webpack_require__(23)(AV);
	__webpack_require__(28)(AV);
	__webpack_require__(27)(AV);
	__webpack_require__(20)(AV);

	module.exports = AV;

	/**
	 * Options to controll the authentication for an operation
	 * @typedef {Object} AuthOptions
	 * @property {String} [sessionToken] Specify a user to excute the operation as.
	 * @property {AV.User} [user] Specify a user to excute the operation as. The user must have _sessionToken. This option will be ignored if sessionToken option provided.
	 * @property {Boolean} [useMasterKey] Indicates whether masterKey is used for this operation. Only valid when masterKey is set.
	 */

	/***/ })
	/******/ ]);
	});
	//# sourceMappingURL=av.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(4).Buffer))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(5)
	var ieee754 = __webpack_require__(6)
	var isArray = __webpack_require__(7)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }
/******/ ]);