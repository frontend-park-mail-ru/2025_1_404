
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from "../page.ts";
import template from './template.precompiled.js';
import User from "../../models/user.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {searchOffers} from "../../util/apiUtil.ts";
import searchOfferTemplate from "../../components/searchOffer/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil.ts";
import FilterModel from "../../models/filterModel.ts";
import Offer from "../../models/offer.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

interface AddOfferInterface {
    /**
     * @property {number} id ID объекта недвижимости
     */
    id: number;
    /**
     * @property {string} address Адрес объекта недвижимости
     */
    price: number;
    /**
     * @property {string} address Адрес объекта недвижимости
     */
    address: string;
    /**
     * @property {number} rooms Количество комнат
     */
    rooms: number;
    /**
     * @property {number} floor Этаж
     */
    floor: number;
    /**
     * @property {number} totalFloors Максимальное количество этажей в здании
     */
    total_floors: number;
    /**
     * @property {number} area Площадь объекта недвижимости
     */
    area: number;
    /**
     * @property {string[]} image URL изображение недвижимости
     */
    image: string
    /**
     * @property {string} metro_station Станция метро
     */
    metro_station: string;
    /**
     * @property {string} metro_line Ветка метро
     */
    metro_line: string;
    /**
     * @property {string} description Описание
     */
    description: string;
    /**
     * @property {string} offer_type Тип предложения (например, "аренда" или "продажа")
     */
    offer_type: string;
    /**
     * @property {string} rent_type Тип аренды (например, "долгосрок" или "сутки"), используется только для аренды
     */
    rent_type: string;
    /**
     * @property {string} seller_name Имя продавца
     */
    seller_name: string;
    /**
     * @property {string} seller_last_name Фамилия продавца
     */
    seller_last_name: string;
}

/**
 * @class SearchPage
 * @description Страница поиска объявлений
 * @augments Page
 */
export default class SearchPage extends Page {
    private _filter: Filter | undefined;
    private _layout: BaseLayout | undefined;
    private _offerList: Element | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга компонента
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({root, layout});

        this._layout = layout;
        this._filter = new Filter({page: this, layout});
        this._filter._filterSetData();

        this._offerList = document.getElementById("searchResults")

        this._getOffers(FilterModel.getFilterData());
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('searchResults', 'click', this._handleCardClick);
    }

    /**
     * @function _handleCardClick
     * @description Метод обработки клика по карточке объявления.
     * @param {Event} event событие
     */
    _handleCardClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        let parent = target;
        while (parent && parent.parentElement && !parent.classList.contains('search__results-offer')) {
            parent = parent.parentElement;
        }
        const offerId = parent.dataset.id;
        if (!offerId) {
            return;
        }
        event.preventDefault()
        if (target.id === 'search-link') {
            RouteManager.navigateTo(`/offer/details/${offerId}`);
        }
    }

    /**
     * @function _addOffer
     * @description Метод добавления предложения в список предложений
     * @param {number} id ID объекта недвижимости
     * @param {number} price Цена объекта недвижимости
     * @param {string} address Адрес объекта недвижимости
     * @param {number} rooms Количество комнат
     * @param {number} floor Этаж
     * @param {number} totalFloors Максимальное количество этажей в здании
     * @param {number} square Площадь объекта недвижимости
     * @param {string} metroStation Станция метро
     * @param {string} metroLine Ветка метро
     * @param {string} image URL изображение недвижимости
     * @param {string} offerType Тип предложения (например, "аренда" или "продажа")
     * @param {string} rentType Тип аренды (например, "долгосрок" или "сутки"), используется только для аренды
     * @param {string} description Описание
     * @param {string} firstName Имя продавца
     * @param {string} lastName Фамилия продавца
     */
     _addOffer({id, price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, image, offer_type: offerType, rent_type: rentType, description, seller_name: firstName, seller_last_name: lastName}: AddOfferInterface) {
         if (!this._offerList) {
             return;
         }

        let title = `${rooms}-комн. квартира, ${square} м²`;
        const priceTitle = `${price.toLocaleString('ru-RU')} ₽`;
        if (offerType === 'аренда') {
            title = 'Сдается в аренду: ' + title;
            title += `/${rentType === 'долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            title = 'Продается: ' + title;
        }
        this._offerList.insertAdjacentHTML('beforeend', searchOfferTemplate({id, priceTitle, address, title, floor, image, metroColor: getMetroColorByLineName(metroLine), metroStation, rooms, square, totalFloors, description, firstName, lastName}));
    }

    /**
     * @function _getOffers
     * @description Получение предложений по фильтру
     * @param {Record<string, string>} filterData Данные фильтра
     * @private
     */
    async _getOffers(filterData: Record<string, string>) {
        if (!User.isLoaded() || !this._layout) {
            return;
        }
        const {offerTypeId, propertyTypeId} = this._getFilterIds(filterData);
        await searchOffers({
            'min_area': filterData.filterSquareLeft,
            'max_area': filterData.filterSquareRight,
            'min_price': filterData.filterPriceLeft,
            'max_price': filterData.filterPriceRight,
            'offer_type_id': offerTypeId,
            'property_type_id': propertyTypeId,
            'address': filterData.filterInputAddress,
        }).then((offers) => {
            if (!offers || !Array.isArray(offers)) {
                return;
            }
            const title = document.getElementById('search-result-title') as HTMLElement;
            if (!title) {
                return;
            }
            title.textContent = `Найдено ${offers.length} объявлений`;
            Array.from(offers).forEach((offerData) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                let image = '';
                if (offer.images.length > 0 && typeof offer.images[0] === 'string') {
                    image = offer.images[0];
                }
                this._addOffer({
                    id: offer.id || 0,
                    price: offer.price,
                    address: offer.address,
                    area: offer.area,
                    floor: offer.floor,
                    metro_line: offer.metroLine,
                    metro_station: offer.metroStation || 'Нет',
                    offer_type: offer.offerType,
                    image,
                    rent_type: offer.rentType,
                    rooms: offer.rooms,
                    total_floors: offer.totalFloors,
                    seller_last_name: offer.seller.lastName,
                    seller_name: offer.seller.firstName,
                    description: offer.description,
                });
            });
        }).catch((error) => {
            console.error(error)
        })
    }

    /**
     * @function _getFilterIds
     * @description Метод получения ID типов предложения и недвижимости
     * @param {Record<string, string>} filterData Данные фильтра
     * @returns {Record<string, string>} ID типов предложения и недвижимости
     */
    _getFilterIds(filterData: Record<string, string>) {
        const offerTypes: Record<string, number> = {
            'Продажа': 1,
            'Аренда': 2
        };

        const propertyTypes: Record<string, number> = {
            'Апартаменты': 1,
            'Дом': 2,
            'Квартира': 3
        };

        const offerTypeId = filterData.filterOfferType in offerTypes
            ? offerTypes[filterData.filterOfferType].toString()
            : '';

        const propertyTypeId = filterData.filterPropertyType in propertyTypes
            ? propertyTypes[filterData.filterPropertyType].toString()
            : '';

        return { offerTypeId, propertyTypeId };
    }
}