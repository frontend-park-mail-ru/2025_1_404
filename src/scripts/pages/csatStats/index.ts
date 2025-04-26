
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from "../page.ts";
import template from './template.precompiled.js';
import User from "../../models/user.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import CSATUtil from "../../util/csatUtil.ts";
import lightButtonTemplate from "../../components/lightButton/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil.ts";
import FilterModel from "../../models/filterModel.ts";
import Offer from "../../models/offer.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import csatStatsAvgTemplate from "../../components/csatStatsAvg/template.precompiled.js";

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
    /**
     * @property {string} propertyType Тип недвижимости (например, "квартира", "дом")
     */
    propertyType: string;
}

/**
 * @class CsatStatsPage
 * @description Страница статистики опросов csatStars
 * @augments Page
 */
export default class CsatStatsPage extends Page {
    private layout: BaseLayout | undefined;
    private eventsList: Element | null | undefined;
    private questionsList: Element | null | undefined;
    private statsList: Element | null | undefined;
    private answersList: Element | null | undefined;

    private currentEvent: string | null | undefined;
    private currentQuestion: string | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга компонента
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({root, layout});

        this.layout = layout;

        this.eventsList = document.getElementById("eventsList")
        this.questionsList = document.getElementById("questionsList")
        this.statsList = document.getElementById("statsList")
        this.answersList = document.getElementById("answersList")

        this.currentEvent = "";
        this.currentQuestion = "";

        if (this.eventsList !== null) {
            this.getCsatEvents();

        }

    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        //this.initListener('csatEventButton', 'click', this.handleEventButtonClick);
        //this.initListener('csatQuestionButton', 'click', this.handleQuestionButtonClick);
    }

    private handleEventButtonClick(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        console.log(target);
        const eventText = target.textContent;
        if (!eventText) {
            return
        }
        if (this.currentEvent !== eventText) {
            if (!this.questionsList) {
                return;
            }
            if (!this.statsList) {
                return;
            }
            this.statsList.innerHTML = "";
            this.questionsList.innerHTML = "";

            const chooseQuestionTitle = document.getElementById("chooseQuestionTitle");
            if (!chooseQuestionTitle) {
                return null;
            }
            chooseQuestionTitle.classList.remove("csatStats__menu-unactive");
            this.getCsatQuestions(eventText);
        }
    }

    private handleQuestionButtonClick(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        console.log(target);
        const questionId = target.dataset.id;
        console.log(questionId);
        if (!questionId) {
            return
        }
        if (this.currentQuestion !== questionId) {
            if (!this.statsList) {
                return;
            }
            this.statsList.innerHTML = "";
            this.getCsatAnswers(questionId);
        }
    }

    /**
     * @function getCsatEvents
     * @description Получение списка событий вызова CSAT опросов
     * @private
     */
    // eslint-disable-next-line max-lines-per-function
    private async getCsatEvents() {

        if (!User.isLoaded() || !this.layout) {
            return;
        }

        await CSATUtil.getEventsDetails().then((events) => {
            events = (events as any)["events"];
            if (!events || !Array.isArray(events)) {
                return;
            }

            console.log(events);
            const className = "csat__event-button";
            Array.from(events).forEach((name) => {
                if (!this.eventsList) {
                    return;
                }
                console.log(name);
                this.eventsList.insertAdjacentHTML('beforeend', lightButtonTemplate({class: className, name}));
            });

            const elements = document.getElementsByClassName("csat__event-button");
            console.log(elements);
            const eventsButtons = Array.from(
                elements
            ) as HTMLButtonElement[];
            console.log(eventsButtons);
            for (const event of eventsButtons) {
                event.addEventListener('click', this.handleEventButtonClick.bind(this));
            }

        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }

    /**
     * @function getCsatQuestions
     * @description Получение списка вопросов CSAT опроса
     * @private
     */
    // eslint-disable-next-line max-lines-per-function
    private async getCsatQuestions(event: string) {

        if (!User.isLoaded() || !this.layout) {
            return;
        }

        await CSATUtil.getQuestionsStats(event).then((questions) => {
            if (!questions|| !Array.isArray(questions)) {
                return;
            }

            console.log(questions);
            const className = "csat__question-button";
            Array.from(questions).forEach((questionData) => {
                if (!this.questionsList) {
                    return;
                }
                const data_id = questionData.id;
                const text = questionData.text;
                this.questionsList.insertAdjacentHTML('beforeend', lightButtonTemplate({dataId: data_id, name: text, class: className}));
            });

            const elements = document.getElementsByClassName("csat__question-button");
            console.log(elements);
            const questionsButtons = Array.from(
                elements
            ) as HTMLButtonElement[];
            console.log(questionsButtons);
            for (const event of questionsButtons) {
                event.addEventListener('click', this.handleQuestionButtonClick.bind(this));
            }
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }

    /**
     * @function getCsatAnswers
     * @description Получение списка вопросов CSAT опроса
     * @private
     */
    // eslint-disable-next-line max-lines-per-function
    private async getCsatAnswers(questionId: string) {
        console.log(questionId);
        if (!User.isLoaded() || !this.layout) {
            return;
        }

        await CSATUtil.getAnswersStats(questionId).then((answers) => {
            console.log(answers);
            if (!answers || !this.statsList) {
                return;
            }

            console.log(answers);
            const avgRating = parseFloat(answers.avg_rating).toFixed(2);

            const fiveStarStat = answers.five_star_stat;
            const fiveStarStatAmount = fiveStarStat.Amount;
            const fiveStarStatPercent = parseFloat(fiveStarStat.Percentage.toFixed(2));

            const fourStarStat = answers.four_star_stat;
            const fourStarStatAmount = fourStarStat.Amount;
            const fourStarStatPercent = parseFloat(fourStarStat.Percentage.toFixed(2));

            const threeStarStat = answers.three_star_stat;
            const threeStarStatAmount = threeStarStat.Amount;
            const threeStarStatPercent = parseFloat(threeStarStat.Percentage.toFixed(2));

            const twoStarStat = answers.two_star_stat;
            const twoStarStatAmount = twoStarStat.Amount;
            const twoStarStatPercent = parseFloat(twoStarStat.Percentage.toFixed(2));

            const oneStarStat = answers.one_star_stat;
            const oneStarStatAmount = oneStarStat.Amount;
            const oneStarStatPercent = parseFloat(oneStarStat.Percentage.toFixed(2));

            const totalAnswers = answers.total_answers;


            this.statsList.insertAdjacentHTML('beforeend', csatStatsAvgTemplate({avgRating, fiveStarStatAmount, fiveStarStatPercent, fourStarStatAmount, fourStarStatPercent, threeStarStatAmount, threeStarStatPercent, twoStarStatAmount, twoStarStatPercent, oneStarStatAmount, oneStarStatPercent, totalAnswers}));

        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }
}