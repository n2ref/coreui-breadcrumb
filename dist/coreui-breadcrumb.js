(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.CoreUI = global.CoreUI || {}, global.CoreUI.breadcrumb = factory()));
})(this, (function () { 'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var BreadcrumbUtils = {
    /**
     * Проверка на объект
     * @param value
     */
    isObject: function isObject(value) {
      return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
    },
    /**
     * @returns {string}
     * @private
     */
    hashCode: function hashCode() {
      return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },
    /**
     * Hash crc32
     * @param str
     * @returns {number}
     * @private
     */
    crc32: function crc32(str) {
      for (var a, o = [], c = 0; c < 256; c++) {
        a = c;
        for (var f = 0; f < 8; f++) {
          a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
        }
        o[c] = a;
      }
      for (var n = -1, t = 0; t < str.length; t++) {
        n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))];
      }
      return (-1 ^ n) >>> 0;
    }
  };

  var BreadcrumbInstance = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {object} options
     * @private
     */
    function BreadcrumbInstance(options) {
      _classCallCheck(this, BreadcrumbInstance);
      _defineProperty(this, "_id", null);
      _defineProperty(this, "_options", {
        id: null,
        options: {
          divider: null,
          items: []
        }
      });
      this._options = $.extend(true, {}, this._options, options);
      this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id ? this._options.id : BreadcrumbUtils.hashCode();
    }

    /**
     * Формирование html компонента
     * @param {jQuery|HTMLElement|string} element
     * @return {string|*|string|Promise<void>}
     */
    return _createClass(BreadcrumbInstance, [{
      key: "render",
      value: function render(element) {
        var that = this;
        var items = [];
        var divider = '';
        if (this._options.hasOwnProperty('divider') && typeof this._options.divider === 'string' && this._options.divider) {
          divider = this._options.divider.substring(0, 4) === 'url(' ? ' style="--bs-breadcrumb-divider: ' + this._options.divider + '"' : ' style="--bs-breadcrumb-divider: \'' + this._options.divider + '\'"';
        }
        if (Array.isArray(this._options.items)) {
          $.each(this._options.items, function (key, item) {
            if (BreadcrumbUtils.isObject(item) && item.hasOwnProperty('text') && typeof item.text === 'string') {
              if (item.hasOwnProperty('url') && typeof item.url === 'string') {
                items.push('<li class="breadcrumb-item"><a href="' + item.url + '">' + item.text + '</a></li>');
              } else {
                var active = item.hasOwnProperty('active') && item.active || that._options.items.length - 1 === key ? ' active' : '';
                items.push('<li class="breadcrumb-item' + active + '">' + item.text + '</li>');
              }
            }
          });
        }
        var container = '<nav id="coreui-braedcrumb-' + this.getId() + '" class="coreui-breadcrumb"' + divider + '>' + '<ol class="breadcrumb">' + items.join('') + '</ol>' + '</div>';
        if (element === undefined) {
          return container;
        }
        var domElement = null;
        if (typeof element === 'string') {
          domElement = document.getElementById(element);
          if (!domElement) {
            return;
          }
        } else if (element instanceof HTMLElement) {
          domElement = element;
        }
        if (domElement) {
          $(domElement).append(container);
        }
      }

      /**
       * Инициализация событий компонента
       */
    }, {
      key: "initEvents",
      value: function initEvents() {}

      /**
       * Получение id графика
       * @return {string|null}
       */
    }, {
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * Получение параметров
       * @returns {object}
       */
    }, {
      key: "getOptions",
      value: function getOptions() {
        return $.extend(true, {}, this._options);
      }
    }]);
  }();

  var Breadcrumb = {
    _instances: {},
    _settings: {
      divider: null
    },
    /**
     * Создание экземпляра
     * @param {object} options
     * @returns {object}
     */
    create: function create(options) {
      if (!options.hasOwnProperty('divider')) {
        options.divider = Breadcrumb.getSetting('divider');
      }
      var instance = new BreadcrumbInstance(BreadcrumbUtils.isObject(options) ? options : {});
      var id = instance.getId();
      this._instances[id] = instance;
      return instance;
    },
    /**
     * Получение экземпляра по id
     * @param {string} id
     * @returns {object|null}
     */
    get: function get(id) {
      if (!this._instances.hasOwnProperty(id)) {
        return null;
      }
      if (!$('#coreui-breadcrumb-' + id)[0]) {
        delete this._instances[id];
        return null;
      }
      return this._instances[id];
    },
    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function setSettings(settings) {
      this._settings = $.extend({}, this._settings, settings);
    },
    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function getSetting(name) {
      var value = null;
      if (this._settings.hasOwnProperty(name)) {
        value = this._settings[name];
      }
      return value;
    }
  };

  return Breadcrumb;

}));
