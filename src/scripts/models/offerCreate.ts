import Offer from "./offer.ts";
import {uploadOfferImage} from "../util/apiUtil.ts";

export interface ImageData {
    id?: number,
    file: File,
}

/**
 * @class OfferCreate
 * @description Модель создания объявления.
 */
class OfferCreate {
    private offerData: Record<string, Record<string, string>> = {
        'type': {},
        'address': {},
        'params': {},
        'price': {},
        'photos': {},
        'description': {},
    };
    private uploadedImages: Record<string, ImageData> = {}
    private filledPages: Record<string, boolean> = {};
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.reset();
    }

    /**
     * @function getOfferData
     * @description Метод получения данных объявления.
     * @returns {*|{}} Данные объявления.
     */
    getOfferData() {
        return this.offerData;
    }

    /**
     * @function getImages
     * @description Метод получения загруженных фото.
     * @returns {Record<string, ImageData>} Данные фото.
     */
    getImages() {
        return this.uploadedImages;
    }

    /**
     * @function setData
     * @description Метод установки данных объявления.
     * @param {string} pageName имя страницы.
     * @param {object} data данные страницы.
     */
    setData(pageName: string, data: Record<string, string>) {
        this.offerData[pageName] = data;
    }

    /**
     * @function setImages
     * @description Метод установки данных фото.
     * @param {Record<string, ImageData>} images данные фото.
     */
    setImages(images: Record<string, ImageData>) {
        this.uploadedImages = images;
    }

    /**
     * @function setPageFilled
     * @description Метод установки статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @param {boolean} isFilled статус заполненности страницы.
     */
    setPageFilled(pageName: string, isFilled: boolean) {
        this.filledPages[pageName] = isFilled;
    }

    /**
     * @function isPageFilled
     * @description Метод получения статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности страницы.
     */
    isPageFilled(pageName: string) {return this.filledPages[pageName];}

    /**
     * @function isPreviousPageFilled
     * @description Метод получения статуса заполненности предыдущей страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности предыдущей страницы.
     */
    isPreviousPageFilled(pageName: string) {
        const pageNames = Object.keys(this.filledPages);
        const currentPageIndex = pageNames.indexOf(pageName);
        if (currentPageIndex === 0) {
            return true;
        }
        const previousPageName = pageNames[currentPageIndex - 1];
        return this.filledPages[previousPageName];
    }

    /**
     * @function getFilledPages
     * @description Метод получения статуса заполненности страниц.
     * @returns {string} имя страницы.
     */
    getLastFilledPage() {
        return Object.keys(this.filledPages).reverse().find((pageName) => this.filledPages[pageName]) || 'type';
    }


    /**
     * @function create
     * @description Метод с запросом на создание объявления после его заполнения.
     * @returns {Promise<any>}.
     */
    async create() {
        const offer = new Offer();
        offer.parseOfferData(this.offerData, this.uploadedImages);
        return await offer.create();
    }

    /**
     * @function save
     * @description Метод с запросом на сохранение объявления.
     * @param {number} offerId ID объявления.
     * @returns {Promise<any>}.
     */
    async save(offerId: number) {
        const offer = new Offer();
        offer.parseOfferData(this.offerData, this.uploadedImages);
        offer.id = offerId
        return await offer.save();
    }

    /**
     * @function fileToString
     * @description Метод преобразования файла в строку.
     * @param {File | Blob} file файл.
     * @returns {Promise<any>}.
     */
    fileToString(file: File | Blob): Promise<string> {
        if (!(file instanceof Blob)) {
            throw new Error("Expected a Blob or File");
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error || new Error("FileReader failed"));
            reader.readAsDataURL(file);
        });
    }

    /**
     * @function urlToFile
     * @description Метод преобразования URL в файл.
     * @param {string} url URL файла.
     * @param {string} filename имя файла.
     * @param {string} mimeType MIME-тип файла.
     * @returns {Promise<File>} файл.
     */
    async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    }

    /**
     * @function addImage
     * @description Метод добавления изображения в объявление.
     * @param {number} offerId ID объявления.
     * @param {string} localId локальный ID изображения.
     * @param {File} file файл изображения.
     */
    async addImage(offerId: number, localId: string, file: File): Promise<void> {
        await uploadOfferImage({
            offerId,
            image: file
        }).then((response) => {
            this.uploadedImages[localId] = {
                id: response.id,
                file
            };
        }).catch((err) => {
            console.error(err)
        })
    }

    /**
     * @function reset
     * @description Метод сброса данных объявления.
     */
    reset() {
        this.filledPages = {
            'type': true,
            'address': false,
            'params': false,
            'price': false,
            'photos': false,
            'description': false,
        };
        this.offerData = {
            'type': {
                'input-offer-type': 'Аренда',
                'input-rent-type': 'Долгосрок',
                'input-purchase-type': 'Новостройка',
                'input-property-type': 'Апартаменты'
            },
            'address': {},
            'params': {},
            'price': {},
            'photos': {},
            'description': {},
        };
        this.uploadedImages = {};
    }

    /**
     * @function parseJSON
     * @description Метод парсинга данных объявления из JSON.
     * @param {any} data данные объявления.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async parseJSON(data: any) {
        await this.parseBasicData(data);
        await this.parseTypeData(data);
        await this.parseAddressData(data);
        await this.parseParamsData(data);
        await this.parsePhotos(data);

        this.filledPages = {
            'type': true,
            'address': true,
            'params': true,
            'price': true,
            'photos': true,
            'description': true,
        };
    }

    /**
     * @function parseBasicData
     * @description Метод парсинга базовых данных объявления.
     * @param {any} data данные объявления.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseBasicData(data: any) {
        this.offerData.price['input-price'] = data.offer.price.toString();
        this.offerData.description['input-description'] = data.offer.description;
    }

    /**
     * @function parseTypeData
     * @description Метод парсинга данных типа объявления.
     * @param {any} data данные объявления.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseTypeData(data: any) {
        const offerTypes: Record<number, string> = {
            1: 'Продажа', 2: 'Аренда'
        };
        const propertyTypes: Record<number, string> = {
            1: 'Апартаменты', 2: 'Дом', 3: 'Квартира'
        };
        const purchaseTypes: Record<number, string> = {
            1: 'Новостройка', 2: 'Вторичка'
        };
        const rentTypes: Record<number, string> = {
            1: 'Посуточно', 2: 'Долгосрок'
        };

        this.offerData.type['input-offer-type'] = offerTypes[data.offer.offer_type_id];
        this.offerData.type['input-rent-type'] = rentTypes[data.offer.rent_type_id];
        this.offerData.type['input-purchase-type'] = purchaseTypes[data.offer.purchase_type_id];
        this.offerData.type['input-property-type'] = propertyTypes[data.offer.property_type_id];
    }

    /**
     * @function parseAddressData
     * @description Метод парсинга данных адреса объявления.
     * @param {any} data данные объявления.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseAddressData(data: any) {
        this.offerData.address['input-floorLeft__input'] = data.offer.floor.toString();
        this.offerData.address['input-floorRight__input'] = data.offer.total_floors.toString();
        this.offerData.address['input-address__input'] = data.offer.address;
        this.offerData.address['input-flat'] = '1';
    }

    /**
     * @function parseParamsData
     * @description Метод парсинга данных параметров объявления.
     * @param {any} data данные объявления.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parseParamsData(data: any) {
        const offerRenovations: Record<number, string> = {
            1: 'Современный ремонт', 2: 'Косметический ремонт',
            3: 'Черновая отделка', 4: 'Нужен полный ремонт',
            5: 'Нужен частичный ремонт', 6: 'Улучшенная черновая'
        };

        this.offerData.params['input-rooms'] = data.offer.rooms.toString();
        this.offerData.params['input-square'] = data.offer.area.toString();
        this.offerData.params['input-ceiling-height'] = data.offer.ceiling_height.toString();
        this.offerData.params['input-renovation'] = offerRenovations[data.offer.renovation_id];
    }

    /**
     * @function parsePhotos
     * @description Метод парсинга данных фотографий объявления.
     * @param {any} data данные объявления.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async parsePhotos(data: any) {
        this.uploadedImages = {};
        this.offerData.photos = {};

        if (!data.offer_data.offer_images) {
            return;
        }
        for (let i = 0; i < data.offer_data.offer_images.length; i++) {
            try {
                // eslint-disable-next-line no-await-in-loop
                const file = await this.urlToFile(
                    data.offer_data.offer_images[i].image,
                    `image-${i}`,
                    'image/jpg'
                );

                this.uploadedImages[i.toString()] = {
                    id: data.offer_data.offer_images[i].id,
                    file
                };

                // eslint-disable-next-line no-await-in-loop
                const result = await this.fileToString(file);
                this.offerData.photos[i.toString()] = result;
            } catch (err) {
                console.error(err);
            }
        }
    }

}

export default new OfferCreate();