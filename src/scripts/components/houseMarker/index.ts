import {BaseComponent} from "../baseComponent.ts";
import template from "./template.precompiled.js";
import balloonTemplate from "../balloon/template.precompiled.js";
import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import {YMapMarker} from "../../lib/ymaps.ts";

interface houseMarkerInterface {
    page?: Page;
    layout?: BaseLayout;
    data?: Record<string, string>;
    hasBalloon?: boolean;
}

/**
 * @class HouseMarker
 * @description Компонент маркера дома на карте
 * @augments BaseComponent
 */
export default class HouseMarker extends BaseComponent {
    private balloon: HTMLElement | null = null;
    private balloonCloseButton: Element | null = null
    private houseMarker: HTMLElement | null = null
    private data: Record<string, string> | null | undefined;
    private hasBalloon: boolean | null;

    constructor({page, layout, data, hasBalloon = false}: houseMarkerInterface) {
        super({page, layout});
        this.data = data;
        this.hasBalloon = hasBalloon;
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {HTMLElement} корневой элемент компонента
     */
    render() {
        const parser = new DOMParser();
        const houseMarkerString = template(this.data);
        const doc = parser.parseFromString(houseMarkerString, 'text/html');
        this.houseMarker = doc.body.firstElementChild as HTMLElement;
        this.balloon = this.houseMarker.lastElementChild as HTMLElement;

        if (this.balloon !== null && this.hasBalloon) {
            this.balloon.innerHTML = balloonTemplate(this.data);
            this.balloon.addEventListener('click', (event) => this.balloonClickHandler(event));
            this.balloonCloseButton = this.balloon.getElementsByClassName('balloon__close')[0];
            this.balloonCloseButton?.addEventListener('click', (event) => this.toggleBalloon(event));
        }

        if (this.houseMarker && this.hasBalloon) {
            this.houseMarker.addEventListener('click', (event) => this.toggleBalloon(event));
            this.houseMarker.style.cursor = 'pointer';
        }
        return [this.houseMarker, this.balloon];
    }

    private balloonClickHandler(event: Event) {
        event.preventDefault();

        if (!this.data) {
            return null;
        }
        RouteManager.navigateTo(`/offer/details/${this.data.id}`)
    }

    getBalloon(): HTMLElement {
        return this.balloon as HTMLElement;
    }

    private toggleBalloon(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.balloon) {
            return null;
        }

        document.querySelectorAll('.balloon__wrapper.active').forEach((element) => {
            if (element !== this.balloon) {
                element.classList.remove('active');
            }
        });

        this.balloon.classList.toggle('active');
    }


    destroy() {
        super.destroy();
        if (this.houseMarker) {
            this.houseMarker.removeEventListener('click', this.toggleBalloon);
        }
        if (this.balloon) {
            this.balloon.removeEventListener('click', this.balloonClickHandler);
        }
        if (this.balloonCloseButton) {
            this.balloonCloseButton.removeEventListener('click', this.toggleBalloon);
        }
    }

}