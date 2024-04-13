
import coreuiBreadcrumbInstance from './coreui.breadcrumb.instance';
import coreuiBreadcrumbUtils from "./coreui.breadcrumb.utils";

let coreuiBreadcrumb = {

    _instances: {},
    _settings: {
        divider: null,
    },


    /**
     * Создание экземпляра
     * @param {object} options
     * @returns {object}
     */
    create: function (options) {
        let instance = $.extend(true, {}, coreuiBreadcrumbInstance);

        if ( ! options.hasOwnProperty('divider')) {
            options.divider = coreuiBreadcrumb.getSetting('divider');
        }

        instance._init(coreuiBreadcrumbUtils.isObject(options) ? options : {});

        let id = instance.getId();
        this._instances[id] = instance;

        return instance;
    },


    /**
     * Получение экземпляра по id
     * @param {string} id
     * @returns {object|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ( ! $('#coreui-breadcrumb-' + id)[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function(settings) {

        this._settings = $.extend({}, this._settings, settings);
    },


    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function(name) {

        let value = null;

        if (this._settings.hasOwnProperty(name)) {
            value = this._settings[name];
        }

        return value;
    }
}


export default coreuiBreadcrumb;