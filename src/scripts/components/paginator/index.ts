import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import backgroundlessButtonTemplate from '../backgroundlessButton/template.precompiled.js'
import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

export interface PaginatorInterface {
    page?: Page;
    layout?: BaseLayout;
    pageCount: number;
}

/**
 * @class Paginator
 * @description Компонент пагинатора.
 * @augments BaseComponent
 */
export default class Paginator extends BaseComponent {
    private currentPage: number = 5;
    private pagesCount: number | undefined;
    private eventListeners: { element: HTMLElement, handler: EventListener }[] = [];

    constructor({page, layout, pageCount}: PaginatorInterface) {
        super({page, layout});
        this.pagesCount = pageCount;
        this.renderPaginator();
    }

    renderPaginator() {
        const paginatorElement = document.getElementById('paginator');
        if (!paginatorElement || !this.pagesCount) {
            return;
        }
        const ulElement = document.createElement('ul');
        ulElement.classList.add('paginator__list');

        const pagesNums = this.getPagesNums();

        if (this.currentPage > 1) {
            const liElement = this.renderPaginatorButton("Предыдущая");
            const handler = () => RouteManager.navigateTo('/searchMap');
            liElement.addEventListener('click', handler);
            this.eventListeners.push({element: liElement, handler});
            ulElement.appendChild(liElement);
        }

        for (const item of pagesNums) {
            const liElement = document.createElement('li');
            liElement.classList.add('paginator__list-item');
            let dots = false;

            if (item === '...') {
                dots = true;
            }

            const isCurrent = item === this.currentPage;
            liElement.innerHTML = backgroundlessButtonTemplate({
                name: item,
                class: `paginator__list-button${isCurrent || dots ? ' current' : ''}`,
                disabled: isCurrent || dots,
            });

            if (!dots) {
                const handler = () => RouteManager.navigateTo('/searchMap');
                liElement.addEventListener('click', handler);
                this.eventListeners.push({element: liElement, handler});
            }

            ulElement.appendChild(liElement);
        }

        if (this.currentPage < this.pagesCount) {
            const liElement = this.renderPaginatorButton("Следующая");
            const handler = () => RouteManager.navigateTo('/searchMap');
            liElement.addEventListener('click', handler);
            this.eventListeners.push({element: liElement, handler});
            ulElement.appendChild(liElement);
        }
        console.log(this.eventListeners);

        paginatorElement.appendChild(ulElement);
    }

    renderPaginatorButton(name: string) {
        const liElement = document.createElement('li');
        liElement.classList.add('paginator__list-item');
        liElement.innerHTML = backgroundlessButtonTemplate({name, class: 'paginator__list-button'});
        return liElement;
    }

    getPagesNums(): (number | string)[] {
        if (!this.pagesCount) return [];

        const pages: (number | string)[] = [];

        pages.push(1);

        if (this.currentPage > 4) {
            pages.push('...');
        }

        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            if (i > 1 && i < this.pagesCount) {
                pages.push(i);
            }
        }

        if (this.currentPage < this.pagesCount - 3) {
            pages.push('...');
        }

        if (this.pagesCount > 1) {
            pages.push(this.pagesCount);
        }

        return pages;
    }

    destroy() {
        this.eventListeners.forEach(({element, handler}) => {
            element.removeEventListener('click', handler);
        });
    }
}