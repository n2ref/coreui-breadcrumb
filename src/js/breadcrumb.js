
import Utils from './utils';


class Breadcrumb {

    _id = null;

    _options = {
        id: null,
        divider: null,
        items: []
    };


    /**
     * Инициализация
     * @param {object} options
     * @private
     */
    constructor(options) {

        if (Utils.isObject(options)) {
            this._options = $.extend(true, this._options, options);
        }

        this._id = this._options.hasOwnProperty('id') && typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : Utils.hashCode();
    }


    /**
     * Установка параметров
     * @param {Object} options
     */
    setOptions(options) {

        if (Utils.isObject(options)) {
            this._options = $.extend(true, this._options, options);
        }
    }


    /**
     * Добавление элемента навигации
     * @param {string} text
     * @param {string} url
     */
    addItem(text, url) {

        let item = { text: text };

        if (url && typeof url === 'string') {
            item.url = url;
        }

        this._options.items.push(item);
    }


    /**
     * Формирование html компонента
     * @param {jQuery|HTMLElement|string} element
     * @return {string|*|string|Promise<void>}
     */
    render(element) {

        let that    = this;
        let items   = [];
        let divider = '';

        if (this._options.hasOwnProperty('divider') &&
            typeof this._options.divider === 'string' &&
            this._options.divider
        ) {
            divider = this._options.divider.substring(0, 4) === 'url('
                ? ' style="--bs-breadcrumb-divider: ' + this._options.divider + '"'
                : ' style="--bs-breadcrumb-divider: \'' + this._options.divider + '\'"';
        }

        if (Array.isArray(this._options.items)) {
            $.each(this._options.items, function (key, item) {

                if (Utils.isObject(item) &&
                    item.hasOwnProperty('text') &&
                    typeof item.text === 'string'
                ) {
                    if (item.hasOwnProperty('url') && typeof item.url === 'string') {
                        items.push('<li class="breadcrumb-item"><a href="' + item.url + '">' + item.text + '</a></li>');

                    } else {
                        let active = (item.hasOwnProperty('active') && item.active) || that._options.items.length - 1 === key
                            ? ' active'
                            : '';

                        items.push('<li class="breadcrumb-item' + active + '">' + item.text + '</li>');
                    }
                }
            });
        }

        let container =
            '<nav id="coreui-braedcrumb-' + this.getId() + '" class="coreui-breadcrumb"' + divider + '>' +
                '<ol class="breadcrumb">' +
                    items.join('') +
                '</ol>' +
            '</div>';

        if (element === undefined) {
            return container;
        }

        let domElement = null;

        if (typeof element === 'string') {
            domElement = document.getElementById(element);

            if ( ! domElement) {
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
    initEvents() {}


    /**
     * Получение id графика
     * @return {string|null}
     */
    getId() {

        return this._id;
    }


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions() {

        return $.extend(true, {}, this._options);
    }
}

export default Breadcrumb;