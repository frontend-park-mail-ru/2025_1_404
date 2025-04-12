import {createOffer, publishOffer, uploadOfferImage} from "../util/apiUtil.ts";

const offerStatus: Record<number, string> = {
    1: 'Активный',
    2: 'Заблокированный',
    3: 'Завершенный',
}

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

export default class Offer {
    id?: number;
    status: number;
    price: number;
    description: string;
    floor: number;
    totalFloors: number;
    rooms: number;
    address: string;
    flat: number;
    area: number;
    ceilingHeight: number;
    offerType: string;
    rentType: string;
    purchaseType: string;
    propertyType: string;
    metroStation: string;
    metroLine: string;
    renovation: string;
    complexId: number;
    images: Array<File>;

    constructor(createOfferData: Record<string, Record<string, string>>, images: Record<string, File>) {
        console.log(images);

        this.id = undefined;
        this.status = 1;
        this.price = Number(createOfferData['price']['input-price']);
        this.description = createOfferData['description']['input-description'];
        this.floor = Number(createOfferData['address']['input-floor']);
        this.totalFloors = Number(createOfferData['address']['input-total-floors']);
        this.rooms = Number(createOfferData['params']['input-rooms']);
        this.address = createOfferData['address']['input-address'];
        this.flat = Number(createOfferData['address']['input-flat']);
        this.area = Number(createOfferData['params']['input-square']);
        this.ceilingHeight = Number(createOfferData['params']['input-ceiling-height']);
        this.offerType = createOfferData['type']['input-offer-type'];
        this.rentType = createOfferData['type']['input-rent-type'];
        this.purchaseType = createOfferData['type']['input-purchase-type'];
        this.propertyType = createOfferData['type']['input-property-type'];
        this.metroStation = createOfferData['address']['input-metroStation'];
        this.metroLine = createOfferData['address']['input-metroLine'];
        this.renovation = createOfferData['params']['input-renovation'];
        this.complexId = Number(createOfferData['address']['input-complexId']);
        this.images = Object.values(images);
    }

    async create() {
        const response = await createOffer({
            price: this.price,
            description: this.description,
            floor: this.floor,
            totalFloors: this.totalFloors,
            rooms: this.rooms,
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
            complexId: this.complexId,
            images: this.images
        })
        const offerId = response.id;
        for (const image of this.images) {
            await uploadOfferImage({
                offerId: offerId,
                image: image
            })
        }
        await publishOffer(offerId);
        return offerId;
    }
}