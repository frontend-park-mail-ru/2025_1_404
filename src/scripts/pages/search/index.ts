
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from "../page.ts";
import template from './template.precompiled.js';
import User from "../../models/user.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {getOffers} from "../../util/apiUtil.ts";
import searchOfferTemplate from "../../components/searchOffer/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil.ts";
import FilterModel from "../../models/filterModel.ts";

interface AddOfferInterface {
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
     * @property {string[]} photos Список URL изображений объекта недвижимости
     */
    photos: string[];
    /**
     * @property {string} metro_station Станция метро
     */
    metro_station: string;
    /**
     * @property {string} metro_line Ветка метро
     */
    metro_line: string;
    /**
     * @property {string} offer_type Тип предложения (например, "аренда" или "продажа")
     */
    offer_type: string;
    /**
     * @property {string} rent_type Тип аренды (например, "долгосрок" или "сутки"), используется только для аренды
     */
    rent_type: string;
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

    _addOffer({price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, photos: images, offer_type: offerType, rent_type: rentType}: AddOfferInterface) {
        if (!this._offerList) {
            return;
        }
        let title = `${price.toLocaleString('ru-RU')} ₽`;
        if (offerType === 'аренда') {
            title = 'Аренда: ' + title;
            title += `/${rentType === 'долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            title = 'Продажа: ' + title;
        }
        const [image] = images
        this._offerList.insertAdjacentHTML('beforeend', searchOfferTemplate({address, title, floor, image, metroColor: getMetroColorByLineName(metroLine), metroStation, rooms, square, totalFloors}));
    }

    /**
     * @function _getOffers
     * @description Получение предложений по фильтру
     * @private
     */
    async _getOffers(filterData: Record<string, Set<string> | string>) {
        if (!User.isLoaded() || !this._layout) {
            return;
        }
        await getOffers(filterData).then((offers) => {
            if (!offers || !Array.isArray(offers)) {
                return;
            }
            Array.from(offers).forEach((offer) => {
                this._addOffer(offer);
            });
        }).catch((error) => {
            console.error(error)
        })
    }
}