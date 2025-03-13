'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {

    /**
     * @method _logoHrefHandler
     * @description Обработчик клика по логотипу в шапке
     * @param event
     * @private
     */
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
        for (const logoHref of this._logoHrefs) {
            logoHref.addEventListener('click', (event) => this._logoHrefHandler(event))
        }
    }

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        for (const logoHref of this._logoHrefs) {
            logoHref.removeEventListener('click', this._logoHrefHandler)
        }
    }

    /**
     * @method setHeaderStatus
     * @description Установка статуса шапки (для авторизованного пользователя или нет)
     * @param isAuthorized
     */
    setHeaderStatus(isAuthorized) {
        const header = document.getElementById('header');
        const authorizedHeader = document.getElementById('header-authorized');
        if (header && authorizedHeader) {
            if (isAuthorized) {
                header.style.display = 'none';
                authorizedHeader.style.display = 'block';
                authorizedHeader.querySelector('.header__name').textContent = `${window.currentUser.first_name}`;
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}