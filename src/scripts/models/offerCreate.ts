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
    private _offerData: Record<string, Record<string, string>> = {
        'type': {},
        'address': {},
        'params': {},
        'price': {},
        'photos': {},
        'description': {},
    };
    private _uploadedImages: Record<string, ImageData> = {}
    private _filledPages: Record<string, boolean> = {};
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this._filledPages = {
            'type': true,
            'address': false,
            'params': false,
            'price': false,
            'photos': false,
            'description': false,
        };
    }

    /**
     * @function getOfferData
     * @description Метод получения данных объявления.
     * @returns {*|{}} Данные объявления.
     */
    getOfferData() {
        return this._offerData;
    }

    /**
     * @function getImages
     * @description Метод получения загруженных фото.
     * @returns {Record<string, ImageData>} Данные фото.
     */
    getImages() {
        return this._uploadedImages;
    }

    /**
     * @function setData
     * @description Метод установки данных объявления.
     * @param {string} pageName имя страницы.
     * @param {object} data данные страницы.
     */
    setData(pageName: string, data: Record<string, string>) {
        this._offerData[pageName] = data;
    }

    /**
     * @function setImages
     * @description Метод установки данных фото.
     * @param {Record<string, ImageData>} images данные фото.
     */
    setImages(images: Record<string, ImageData>) {
        this._uploadedImages = images;
    }

    /**
     * @function setPageFilled
     * @description Метод установки статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @param {boolean} isFilled статус заполненности страницы.
     */
    setPageFilled(pageName: string, isFilled: boolean) {
        this._filledPages[pageName] = isFilled;
    }

    /**
     * @function isPageFilled
     * @description Метод получения статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности страницы.
     */
    isPageFilled(pageName: string) {return this._filledPages[pageName];}

    /**
     * @function isPreviousPageFilled
     * @description Метод получения статуса заполненности предыдущей страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности предыдущей страницы.
     */
    isPreviousPageFilled(pageName: string) {
        const pageNames = Object.keys(this._filledPages);
        const currentPageIndex = pageNames.indexOf(pageName);
        if (currentPageIndex === 0) {
            return true;
        }
        const previousPageName = pageNames[currentPageIndex - 1];
        return this._filledPages[previousPageName];
    }

    /**
     * @function getFilledPages
     * @description Метод получения статуса заполненности страниц.
     * @returns {string} имя страницы.
     */
    getLastFilledPage() {
        return Object.keys(this._filledPages).reverse().find((pageName) => this._filledPages[pageName]) || 'type';
    }


    /**
     * @function create
     * @description Метод с запросом на создание объявления после его заполнения.
     * @returns {Promise<any>}.
     */
    async create() {
        const offer = new Offer();
        offer.parseOfferData(this._offerData, this._uploadedImages);
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
        offer.parseOfferData(this._offerData, this._uploadedImages);
        offer.id = offerId
        return await offer.save();
    }

    /**
     * @function fileToString
     * @description Метод преобразования файла в строку.
     * @param {File | Blob} file файл.
     * @returns {Promise<any>}.
     */
    async fileToString(file: File | Blob): Promise<string> {
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

    async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    }

    async addImage(offerId: number, localId: string, file: File): Promise<void> {
        uploadOfferImage({
            offerId,
            image: file
        }).then((response) => {
            this._uploadedImages[localId] = {
                id: response.id,
                file
            };
        }).catch((err) => {
            console.log(err)
        })
    }

    reset() {
        this._filledPages = {
            'type': true,
            'address': false,
            'params': false,
            'price': false,
            'photos': false,
            'description': false,
        };

        this._offerData = {
            'type': {},
            'address': {},
            'params': {},
            'price': {},
            'photos': {},
            'description': {},
        };
    }

    async parseJSON(data) {
        // const offerStatus: Record<number, string> = {
        //     1: 'Черновик',
        //     2: 'Активный',
        //     3: 'Завершенный',
        // }

        const offerTypes: Record<number, string> = {
            1: 'Продажа',
            2: 'Аренда'
        };

        const propertyTypes: Record<number, string> = {
            1: 'Апартаменты',
            2: 'Дом',
            3: 'Квартира'
        };

        const purchaseTypes: Record<number, string> = {
            1: 'Новостройка',
            2: 'Вторичка'
        };

        const rentTypes: Record<number, string> = {
            1: 'Посуточно',
            2: 'Долгосрок'
        };

        const offerRenovations: Record<number, string> = {
            1: 'Современный ремонт',
            2: 'Косметический ремонт',
            3: 'Черновая отделка',
            4: 'Нужен полный ремонт',
            5: 'Нужен частичный ремонт',
            6: 'Улучшенная черновая',
        };

        this._offerData.price['input-price'] = data.offer.price.toString();
        this._offerData.description['input-description'] = data.offer.description;
        this._offerData.address['input-floor'] = data.offer.floor.toString();
        this._offerData.address['input-total-floors'] = data.offer.total_floors.toString();
        this._offerData.params['input-rooms'] = data.offer.rooms.toString();
        this._offerData.address['input-address'] = data.offer.address;
        this._offerData.address['input-flat'] = data.offer.flat.toString();
        this._offerData.params['input-square'] = data.offer.area.toString();
        this._offerData.params['input-ceiling-height'] = data.offer.ceiling_height.toString();
        this._offerData.type['input-offer-type'] = offerTypes[data.offer.offer_type_id];
        this._offerData.type['input-rent-type'] = rentTypes[data.offer.rent_type_id];
        this._offerData.type['input-purchase-type'] = purchaseTypes[data.offer.purchase_type_id];
        this._offerData.type['input-property-type'] = propertyTypes[data.offer.property_type_id];
        this._offerData.address['input-metroStation'] = data.offer_data.metro.station;
        this._offerData.address['input-metroLine'] = data.offer_data.metro.line;
        this._offerData.params['input-renovation'] = offerRenovations[data.offer.renovation_id];

        this._filledPages = {
            'type': true,
            'address': true,
            'params': true,
            'price': true,
            'photos': true,
            'description': true,
        }

        this._uploadedImages = {};
        for (let i = 0; i < data.offer_data.offer_images.length; i++) {
            await this.urlToFile(data.offer_data.offer_images[i].image, `image-${i}`, 'image/jpg').then(async (file) => {
                this._uploadedImages[i.toString()] = {
                    id: data.offer_data.offer_images[i].id,
                    file
                };
                await this.fileToString(file).then((result) => {
                    this._offerData.photos[i.toString()] = result;
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            });
        }
    }

}

export default new OfferCreate();