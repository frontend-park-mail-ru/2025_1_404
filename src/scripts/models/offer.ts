import {createOffer, publishOffer, updateOffer, uploadOfferImage} from "../util/apiUtil.ts";
import {ImageData} from "./offerCreate.ts";
import OfferMock from "./offerMock.ts";
import User from "./user.ts";

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

interface Seller {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
}

export interface SellDetails {
    views: number;
    favorites: number;
    likes: number;
}

/**
 * @class Offer
 * @description Класс объявления
 */
export default class Offer {
    id?: number | null;
    seller: Seller = {
        id: 0,
        firstName: '',
        lastName: '',
        avatar: '',
        createdAt: new Date(),
    };
    sellDetails: SellDetails = {
        views: 0,
        favorites: 0,
        likes: 0
    };
    favorite: boolean = false;
    status: number = 1;
    price: number = 0;
    description: string = '';
    floor: number = 1;
    totalFloors: number = 1;
    rooms: string = '1';
    address: string = '';
    flat: number = 1;
    area: number = 1;
    ceilingHeight: number = 1;
    offerType: string = '';
    rentType: string = '';
    purchaseType: string = '';
    propertyType: string = '';
    metroStation: string = '';
    metroLine: string = '';
    renovation: string = '';
    complexId?: number;
    images: Array<File|string> = [];

    /**
     * @function parseOfferData
     * @description Метод парсинга данных объявления.
     * @param {Record<string, Record<string, string>>} createOfferData данные объявления
     * @param {Record<string, ImageData>} images изображения объявления
     */
    // eslint-disable-next-line max-statements
    parseOfferData(createOfferData: Record<string, Record<string, string>>, images: Record<string, ImageData>) {
        this.id = null;
        this.status = 1;
        this.price = Number(createOfferData.price['input-price']);
        this.description = createOfferData.description['input-description'];
        this.floor = Number(createOfferData.address['input-floorLeft__input']);
        this.totalFloors = Number(createOfferData.address['input-floorRight__input']);
        this.rooms = createOfferData.params['input-rooms'];
        this.address = createOfferData.address['input-address__input'];
        this.flat = 1;
        this.area = Number(createOfferData.params['input-square']);
        this.ceilingHeight = Number(createOfferData.params['input-ceiling-height']);
        this.offerType = createOfferData.type['input-offer-type'];
        this.rentType = createOfferData.type['input-rent-type'];
        this.purchaseType = createOfferData.type['input-purchase-type'];
        this.propertyType = createOfferData.type['input-property-type'];
        this.renovation = createOfferData.params['input-renovation'];
        this.complexId = Number(createOfferData.address['input-complexId']);
        this.images = [];
        for (const key in images) {
            if (Object.hasOwn(images, key)) {
                this.images.push(images[key].file);
            }
        }
    }

    /**
     * @function parseJSON
     * @description Метод парсинга json.
     * @param {any} json json.
     */
    // eslint-disable-next-line max-statements, @typescript-eslint/no-explicit-any
    parseJSON(json: any) {
        this.id = json.offer.id;
        this.seller.id = json.offer.seller_id;
        this.seller.firstName = json.offer_data.seller.seller_name;
        this.seller.lastName = json.offer_data.seller.seller_last_name;
        this.seller.avatar = json.offer_data.seller.avatar;
        this.seller.createdAt = new Date(json.offer_data.seller.created_at);

        if (this.id === null || this.id === undefined) {
            return;
        }
        const sellDetails = OfferMock.getSellDetails(this.id);
        this.sellDetails.views = sellDetails.views;
        this.sellDetails.likes = sellDetails.likes;
        this.sellDetails.favorites = sellDetails.favorites;

        const userData = User.getData();
        if (userData && userData.id !== null && userData.id !== undefined) {
            this.favorite = OfferMock.isOfferFavoritedByUser(userData.id, this.id);
        }

        this.status = json.offer.status_id;
        this.price = json.offer.price;
        this.description = json.offer.description;
        this.floor = json.offer.floor;
        this.totalFloors = json.offer.total_floors;
        this.rooms = json.offer.rooms.toString();
        if (this.rooms === '4') {
            this.rooms = 'много'
        }
        this.address = json.offer.address;
        this.flat = json.offer.flat;
        this.area = json.offer.area;
        this.ceilingHeight = json.offer.ceiling_height;
        this.offerType = offerTypes[json.offer.offer_type_id];
        this.rentType = rentTypes[json.offer.rent_type_id];
        this.purchaseType = purchaseTypes[json.offer.purchase_type_id];
        this.propertyType = propertyTypes[json.offer.property_type_id];
        this.metroStation = json.offer_data.metro.station;
        this.metroLine = json.offer_data.metro.line;
        this.renovation = offerRenovations[json.offer.renovation_id];
        if (!json.offer_data.offer_images) {
            this.images.push('/img/card/undefined.webp');
            return;
        }
        for (const image of json.offer_data.offer_images) {
            this.images.push(image.image);
        }
    }

    /**
     * @function create
     * @description Метод создания объявления.
     * @returns {Promise<number>} id объявления
     */
    async create() {
        let rooms = this.rooms;
        if (rooms === 'много') {
            rooms = '4';
        }
        const response = await createOffer({
            price: this.price,
            description: this.description,
            floor: this.floor,
            totalFloors: this.totalFloors,
            rooms: parseInt(rooms, 10),
            address: this.address,
            flat: this.flat,
            area: this.area,
            ceilingHeight: this.ceilingHeight,
            offerType: Number(Object.keys(offerTypes).find((key) => offerTypes[Number(key)] === this.offerType)),
            rentType: Number(Object.keys(rentTypes).find((key) => rentTypes[Number(key)] === this.rentType)),
            purchaseType: Number(Object.keys(purchaseTypes).find((key) => purchaseTypes[Number(key)] === this.purchaseType)),
            propertyType: Number(Object.keys(propertyTypes).find((key) => propertyTypes[Number(key)] === this.propertyType)),
            metroStation: this.metroStation,
            metroLine: this.metroLine,
            renovation: Number(Object.keys(offerRenovations).find((key) => offerRenovations[Number(key)] === this.renovation)),
            complexId: Number(this.complexId),
            images: this.images.filter(image => typeof image !== 'string'),
        })
        const offerId = response.id;
        for (const image of this.images) {
            if (typeof image !== 'string') {
                // eslint-disable-next-line no-await-in-loop
                await uploadOfferImage({
                    offerId,
                    image
                })
            }
        }
        await publishOffer(offerId);
        return offerId;
    }

    /**
     * @function save
     * @description Метод сохранения объявления.
     * @returns {Promise<number>} id объявления
     */
    async save() {
        if (this.id === null) {
            return null;
        }
        await updateOffer({
            id: this.id,
            price: this.price,
            description: this.description,
            floor: this.floor,
            totalFloors: this.totalFloors,
            rooms: parseInt(this.rooms, 10),
            address: this.address,
            flat: this.flat,
            area: this.area,
            ceilingHeight: this.ceilingHeight,
            offerType: Number(Object.keys(offerTypes).find((key) => offerTypes[Number(key)] === this.offerType)),
            rentType: Number(Object.keys(rentTypes).find((key) => rentTypes[Number(key)] === this.rentType)),
            purchaseType: Number(Object.keys(purchaseTypes).find((key) => purchaseTypes[Number(key)] === this.purchaseType)),
            propertyType: Number(Object.keys(propertyTypes).find((key) => propertyTypes[Number(key)] === this.propertyType)),
            metroStation: this.metroStation,
            metroLine: this.metroLine,
            renovation: Number(Object.keys(offerRenovations).find((key) => offerRenovations[Number(key)] === this.renovation)),
            complexId: Number(this.complexId),
            images: this.images.filter(image => typeof image !== 'string'),
        });
        return this.id;
    }
}