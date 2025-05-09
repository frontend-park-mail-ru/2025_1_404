
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from "../page.ts";
import template from './template.precompiled.js';
import User from "../../models/user.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {searchOffers} from "../../util/apiUtil.ts";
import cardTemplate from "../../components/card/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil.ts";
import FilterModel from "../../models/filterModel.ts";
import Offer from "../../models/offer.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import Map from "../../models/map.ts";
import mapUtil from "../../util/mapUtil.ts";
import {LngLat} from "@yandex/ymaps3-types";
import primaryButtonTemplate from "../../components/primaryButton/template.precompiled.js";
import PrimaryButton from "../../components/primaryButton";
import Paginator from "../../components/paginator";

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
     * @property {string} rooms Количество комнат
     */
    rooms: string;
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
     * @property {string} offer_type Тип предложения (например, "аренда" или "продажа")
     */
    offer_type: string;
    /**
     * @property {string} rent_type Тип аренды (например, "долгосрок" или "сутки"), используется только для аренды
     */
    rent_type: string;
    /**
     * @property {string} propertyType Тип недвижимости (например, "квартира", "дом")
     */
    propertyType: string;
}

/**
 * @class searchMapPage
 * @description Страница поиска объявлений с картой
 * @augments Page
 */
export default class searchMapPage extends Page {
    private map: Map | undefined;
    private mapElement: HTMLElement | null | undefined;
    private filter: Filter | undefined;
    private layout: BaseLayout | undefined;
    private offerList: Element | null | undefined;
    // private paginator: Paginator | undefined;
    private fullscreenButton: Element | null | undefined;
    private listHrefButton: Element | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга компонента
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({root, layout});

        this.layout = layout;
        this.mapElement = document.getElementById("searchMapResultsMap");
        this.filter = new Filter({page: this, layout});
        this.filter.filterSetData();

        this.offerList = document.getElementById("searchMapResults")
        let coords: [number, number] = [37.313484, 55.557729];
        this.map = new Map({center: coords, id: 'searchMapResultsMap', zoom: 5});

        //this.paginator = new Paginator({page: this, layout, pageCount: 10});

        document.addEventListener("fullscreenchange", () => this.updateFullscreenButtonText());

        this.fullscreenButton = document.getElementById("searchMapResultsFullscreen");
        if (this.fullscreenButton !== null) {
            this.fullscreenButton.innerHTML = primaryButtonTemplate({name: "Во весь экран"});
            this.fullscreenButton.addEventListener('click', (event) => this.toggleFullscreen(event));
        }
        this.listHrefButton = document.getElementById("searchMapResultsListHref");
        if (this.listHrefButton !== null) {
            this.listHrefButton.innerHTML = primaryButtonTemplate({name: "Вернуться"});
            this.listHrefButton.addEventListener('click', (event) => this.backToList(event));
        }

        this.getOffers(FilterModel.getFilterData());

    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('searchMapResults', 'click', this.handleCardClick);
    }

    /**
     * @function handleCardClick
     * @description Метод обработки клика по карточке объявления.
     * @param {Event} event событие
     */
    private handleCardClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        let parent = target;
        while (parent && parent.parentElement && !parent.classList.contains('searchMap__results-offer')) {
            parent = parent.parentElement;
        }
        const offerId = parent.dataset.id;
        if (!offerId) {
            return;
        }
        event.preventDefault()
        if (target.id === 'searchMap-link') {
            RouteManager.navigateTo(`/offer/details/${offerId}`);
        }
    }

    private toggleFullscreen(event: Event) {
        event.preventDefault();
        if (!document.fullscreenElement) {
            if (!this.mapElement) {
                return;
            }
            this.mapElement.requestFullscreen().catch(err => {
                console.error('Ошибка при переходе в полный режим:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    private backToList(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo("/searchList")
    }

    private updateFullscreenButtonText() {
        if (!this.fullscreenButton) {
            return null;
        }
        this.fullscreenButton.children[0].textContent = document.fullscreenElement ? "Выйти из полного экрана" : "Во весь экран";
    }

    /**
     * @function addOffer
     * @description Метод добавления предложения в список предложений
     * @param {number} id ID объекта недвижимости
     * @param {string} propertyType Тип недвижимости (например, "квартира", "дом")
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
     */
    private addOffer({id, propertyType, price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, image, offer_type: offerType, rent_type: rentType}: AddOfferInterface) {
        if (!this.offerList) {
            return;
        }
        let cardTitle = `${price.toLocaleString('ru-RU')} ₽`;
        if (offerType === 'Аренда') {
            cardTitle = 'Аренда: ' + cardTitle;
            cardTitle += `/${rentType === 'Долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            cardTitle = 'Продажа: ' + cardTitle;
        }

        const className = "search__card"
        this.offerList.insertAdjacentHTML('beforeend', cardTemplate({id, address, cardTitle, floor, image, metroColor: getMetroColorByLineName(metroLine), metroStation: metroStation || "Нет", rooms, square, totalFloors, class: className}));
    }

    /**
     * @function getOffers
     * @description Получение предложений по фильтру
     * @param {Record<string, string>} filterData Данные фильтра
     * @private
     */
    // eslint-disable-next-line max-lines-per-function
    private async getOffers(filterData: Record<string, string>) {
        if (!User.isLoaded() || !this.layout) {
            return;
        }
        const {offerTypeId, propertyTypeId} = this.getFilterIds(filterData);
        await searchOffers({
            'min_area': filterData.filterSquareLeft__input,
            'max_area': filterData.filterSquareRight__input,
            'min_price': filterData.filterPriceLeft__input,
            'max_price': filterData.filterPriceRight__input,
            'offer_type_id': offerTypeId,
            'property_type_id': propertyTypeId,
            'address': filterData.filterInputAddress__input,
        }).then(async (offers) => {
            if (!offers || !Array.isArray(offers)) {
                return;
            }
            const title = document.getElementById('searchMap-result-title') as HTMLElement;
            const emptyTitle = document.getElementById('searchMapResultsEmpty') as HTMLElement;
            if (!title) {
                return;
            }
            if (offers.length > 0) {
                title.textContent = `Найдено ${offers.length} объявлений`;
                title.classList.add('active');
                emptyTitle.classList.remove('active')
            } else {
                emptyTitle.classList.add('active');
                title.classList.remove('active')
            }

            const points: LngLat[] = [];
            const props: Record<string, string>[] = [];
            this.map?.addClusterer();

            for (const offerData of Array.from(offers)) {
                const offer = new Offer();
                offer.parseJSON(offerData);
                let image = '';
                if (offer.images.length > 0 && typeof offer.images[0] === 'string') {
                    image = offer.images[0];
                }
                // const coords = await this.map?.getCoords(offer.address);
                // if (!coords) {
                //     continue;
                // }
                points.push([offer.logitude, offer.latitude]);
                props.push({
                    id: offer.id?.toString() || '0',
                    img: image,
                    title: `${offer.offerType} ${offer.propertyType}`,
                    price: offer.price.toString(),
                    area: offer.area.toString(),
                    address: offer.address,
                })

                this.addOffer({
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
                    propertyType: offer.propertyType
                });
            }
            this.map?.addClustererMarkers(points, props);
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })

        // document.querySelectorAll('.card__link').forEach(card => {
        //
        //     if (!this.mapElement) {
        //         return;
        //     }
        //     const id = card.getAttribute('data-id');
        //     const markerElements = this.map?.getAllMarkerElements()
        //
        //     if (!markerElements) {
        //         return;
        //     }
        //     const markerElement = markerElements.find(el => el.dataset.id === id);
        //
        //     if (!markerElement) {
        //         return;
        //     }
        //     card.addEventListener('mouseenter', () => this.toggleMarkerHighlight(markerElement));
        //     card.addEventListener('mouseleave', () => this.toggleMarkerHighlight(markerElement));
        // });
    }

    /**
     * @function getFilterIds
     * @description Метод получения ID типов предложения и недвижимости
     * @param {Record<string, string>} filterData Данные фильтра
     * @returns {Record<string, string>} ID типов предложения и недвижимости
     */
    private getFilterIds(filterData: Record<string, string>) {
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

    private toggleMarkerHighlight(markerElement: Element) {
        markerElement.classList.toggle('highlight');
    }

    destroy() {
        super.destroy();

        // document.querySelectorAll('.card__link').forEach(card => {
        //
        //     if (!this.mapElement) {
        //         return;
        //     }
        //     const id = card.getAttribute('data-id');
        //     const markerElements = this.map?.getAllMarkerElements()
        //
        //     if (!markerElements) {
        //         return;
        //     }
        //     const markerElement = markerElements.find(el => el.dataset.id === id);
        //
        //     if (!markerElement) {
        //         return;
        //     }
        //     card.removeEventListener('mouseenter', () => this.toggleMarkerHighlight(markerElement));
        //     card.removeEventListener('mouseleave', () => this.toggleMarkerHighlight(markerElement));
        // });
    }
}