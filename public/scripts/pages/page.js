'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {

    _logoHrefHandler(event) {
        event.preventDefault();
        window.routeManager.navigateTo('/');
    }

    /**
     * @method render
     * @description Метод, который вызывается при рендере страницы.
     * @param _root {HTMLElement} - корневой элемент страницы
     */
    render(_root) {
        this.setHeaderStatus(window.currentUser !== null);

        this._logoHrefs = document.getElementsByClassName('logo-href');
        for (let logoHref of this._logoHrefs) {
            logoHref.addEventListener('click', (event) => this._logoHrefHandler(event))
        }
    }

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        for (let logoHref of this._logoHrefs) {
            logoHref.removeEventListener('click', this._logoHrefHandler)
        }
    }

    setHeaderStatus(isAuthorized) {
        let header = document.getElementById('header');
        let authorizedHeader = document.getElementById('header-authorized');
        if (header && authorizedHeader) {
            if (isAuthorized) {
                header.style.display = 'none';
                authorizedHeader.style.display = 'block';
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}