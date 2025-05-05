import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {

    private emptyStageClass = "fa-regular fa-circle"
    private currentStageClass = "fa-regular fa-circle-dot";
    private filledStageClass = "fa-solid fa-circle-check";

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('typePageButton', 'click', this.typePageButtonHandler);
        this.initListener('addressPageButton', 'click', this.addressPageButtonHandler);
        this.initListener('paramsPageButton', 'click', this.paramsPageButtonHandler);
        this.initListener('pricePageButton', 'click', this.pricePageButtonHandler);
        this.initListener('photosPageButton', 'click', this.photosPageButtonHandler);
        this.initListener('descriptionPageButton', 'click', this.descriptionPageButtonHandler);
    }

    /**
     * @function typePageButtonHandler
     * @description Обработчик события перехода на страницу выбора типа сделки
     * @private
     */
    private typePageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'type');
    }

    /**
     * @function addressPageButtonHandler
     * @description Обработчик события перехода на страницу выбора адреса
     * @private
     */
    private addressPageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'address');
    }

    /**
     * @function paramsPageButtonHandler
     * @description Обработчик события перехода на страницу выбора параметров
     * @private
     */
    private paramsPageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'params');
    }

    /**
     * @function pricePageButtonHandler
     * @description Обработчик события перехода на страницу выбора цены
     * @private
     */
    private pricePageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'price');
    }

    /**
     * @function photosPageButtonHandler
     * @description Обработчик события перехода на страницу выбора фотографий
     * @private
     */
    private photosPageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'photos');
    }

    /**
     * @function descriptionPageButtonHandler
     * @description Обработчик события перехода на страницу с полем описания
     * @private
     */
    private descriptionPageButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('goToPage', 'description');
    }

    /**
     * @function addCurrentStageClass
     * @description Метод добавления класса текущей стадии.
     * @param {string} id идентификатор стадии.
     */
    addCurrentStageClass(id: string) {
        const buttonId = id.concat("PageButton");
        const button = document.getElementById(buttonId) as HTMLElement;
        const stage = button.firstElementChild;
        if (!stage) {
            return;
        }
        this.emptyStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this.filledStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this.currentStageClass.split(" ").forEach(stageClass => {
            stage.classList.add(stageClass);
        })
    }

    /**
     * @function addFilledStageClass
     * @description Метод добавления класса заполненной стадии.
     * @param {Array} ids массив идентификаторов стадий.
     */
    addFilledStageClass(ids: Array<string>) {
        this.fillRectangles(ids.length);
        ids.forEach(id => {
            const buttonId = id.concat("PageButton");
            const button = document.getElementById(buttonId) as HTMLElement;
            const stage = button.firstElementChild;
            if (!stage) {
                return;
            }
            this.currentStageClass.split(" ").forEach(stageClass => {
                stage.classList.remove(stageClass);
            })
            this.emptyStageClass.split(" ").forEach(stageClass => {
                stage.classList.remove(stageClass);
            })
            this.filledStageClass.split(" ").forEach(stageClass => {
                stage.classList.add(stageClass);
            })
        })
    }

    /**
     * @function addEmptyStageClass
     * @description Метод добавления класса пустой стадии.
     * @param {string} id идентификатор стадии.
     */
    addEmptyStageClass(id: string) {
        const buttonId = id.concat("PageButton");
        const button = document.getElementById(buttonId) as HTMLElement;
        const stage = button.firstElementChild;
        if (!stage) {
            return;
        }
        this.filledStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this.currentStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this.emptyStageClass.split(" ").forEach(stageClass => {
            stage.classList.add(stageClass);
        })
    }

    /**
     * @function fillRectangles
     * @description Метод заполнения прямоугольников на панели навигации.
     * @param {number} amount количество заполненных прямоугольников.
     * @private
     */
    private fillRectangles(amount: number) {
        const minAmount = 5;
        const correctedAmount = Math.min(amount, minAmount);
        const rectangles = document.getElementsByClassName("offerCreate__nav-rect");
        for (let i = 0; i < correctedAmount; i++) {
            rectangles[i].classList.add("offerCreate__nav-rect-fill");
        }
    }
}