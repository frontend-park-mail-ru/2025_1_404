import {SellDetails} from "./offer.ts";

class OfferMock {
    private sellDetails: Record<number, SellDetails> = {};
    private userOfferVisits: Record<number, number[]> = {};
    private userFavorites: Record<number, number[]> = {};

    public getSellDetails(offerId: number) : SellDetails {
        const data = this.sellDetails[offerId];
        if (!data) {
            this.setSellDetails(offerId, {
                favorites: 0,
                views: 0,
                likes: 0
            });
            return this.getSellDetails(offerId);
        }
        return data;
    }

    public setSellDetails(offerId: number, details: SellDetails) {
        this.sellDetails[offerId] = details;
    }

    public updateVisit(userId: number | undefined | null, offerId: number) {
        if (!(offerId in this.userOfferVisits)) {
            this.userOfferVisits[offerId] = [];
        }
        /* Если нужны уникальные просмотры
        if (!(userId in this.userOfferVisits[offerId])) {
            this.userOfferVisits[offerId].push(userId);
        }
        */
        this.userOfferVisits[offerId].push(1);
        this.sellDetails[offerId].views = this.userOfferVisits[offerId].length;
    }

    public toggleFavorite(userId: number, offerId: number) {
        if (!(userId in this.userFavorites)) {
            this.userFavorites[userId] = [];
        }
        const index = this.userFavorites[userId].indexOf(offerId);
        if (index > -1) {
            this.userFavorites[userId].splice(index, 1);
            this.sellDetails[offerId].favorites--;
            return {'status': false};
        }
        this.userFavorites[userId].push(offerId);
        this.sellDetails[offerId].favorites++;
        return {'status': true};
    }

    public isOfferFavoritedByUser(userId: number, offerId: number) {
        if (!(userId in this.userFavorites)) {
            this.userFavorites[userId] = [];
        }
        const index = this.userFavorites[userId].indexOf(offerId);
        return index > -1;
    }

}

export default new OfferMock();