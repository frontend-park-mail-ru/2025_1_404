'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import offerCreatePhotosPreviewTemplate from "../../../components/offerCreatePhotosPreview/template.precompiled.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @augments OfferPage
 */
export default class OfferCreatePhotosPage extends OfferPage {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}) {
        root.innerHTML = template();
        
        this._photosPreviewsCounter = 0;
        this._dropArea = document.getElementById('offerCreatePhotosInputBlock');
        this._photosPreviewsList = document.getElementById('offerCreatePhotosPreviews');

        super.render({layout, root});
        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreatePhotosInputBlock', 'dragenter', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragover', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragleave', this._dragRemoveClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'drop', this._dragDropHandler);
        this.initListener('offerCreatePhotosButton', 'click', this._chooseFilesButtonClickHandler);
        this.initListener('offerCreatePhotosInput', 'change', this._getFilesAfterChooseClickHandler);
        this.initListener('offerCreatePhotosPreviews', 'click', this._photoPreviewClickHandler);
    }

    /**
     * @function _addPhotoPreview
     * @description Метод добавления превью фото в список
     * @param {string} source адрес фото
     * @private
     */
    _addPhotoPreview(source) {
        this._photosPreviewsCounter += 1;
        this._offerData[this._photosPreviewsCounter] = source;
        this._photosPreviewsList.insertAdjacentHTML('beforeend', offerCreatePhotosPreviewTemplate({index: this._photosPreviewsCounter, src: source}));
    }

    /**
     * @function _dragAddClassHandler
     * @description Метод добавления класса при перетаскивании файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    _dragAddClassHandler(event) {
        event.preventDefault();
        this._dropArea.classList.add('offerCreate__photos-hover');
    }

    /**
     * @function _dragRemoveClassHandler
     * @description Метод удаления класса при перетаскивании файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    _dragRemoveClassHandler(event) {
        event.preventDefault();
        this._dropArea.classList.remove('offerCreate__photos-hover');
    }

    /**
     * @function _dragDropHandler
     * @description Метод обработки события перетаскивания файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    _dragDropHandler(event) {
        event.preventDefault();
        this._dropArea.classList.remove('offerCreate__photos-hover');

        const files = Array.from(event.dataTransfer.files)
        this._uploadFiles(files);
    }

    /**
     * @function _uploadFiles
     * @param {Array} files массив файлов
     * @private
     */
    _uploadFiles(files) {
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this._addPhotoPreview(event.target.result.toString());
                    OfferCreate.setData(this._pageName, this._offerData);
                    this._markAsFullfilled(Object.keys(this._offerData).length > 0);
                };
                reader.readAsDataURL(file);
            }
        })
    }

    /**
     * @function _chooseFilesButtonClickHandler
     * @description Метод обработки события клика на кнопку выбора файлов
     * @private
     */
    _chooseFilesButtonClickHandler() {
        document.getElementById('offerCreatePhotosInput').click();
    }

    /**
     * @function _getFilesAfterChooseClickHandler
     * @description Метод обработки события выбора файлов
     * @param {Event} event событие выбора файлов
     * @private
     */
    _getFilesAfterChooseClickHandler(event) {
        const files = Array.from(event.target.files);
        this._uploadFiles(files);
    }

    /**
     * @function _photoPreviewClickHandler
     * @description Обработчик события клика на превью фото
     * @param {Event} event событие клика
     * @param {HTMLElement} target элемент, на который кликнули
     * @private
     */
    _photoPreviewClickHandler(event, {target} = event) {
        let currentTarget = target;
        while (currentTarget.tagName === 'path' || currentTarget.tagName === 'I') {
            currentTarget = currentTarget.parentElement;
        }

        if (currentTarget.classList.contains('delete__cross')) {
            currentTarget = currentTarget.parentElement.parentElement;
            event.preventDefault();

            const photoPreview = currentTarget.id
            delete this._offerData[photoPreview];

            OfferCreate.setData(this._pageName, this._offerData);
            this._markAsFullfilled(Object.keys(this._offerData).length > 0);
            currentTarget.remove();
        }
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        Object.keys(this._offerData).forEach(photo => {
            this._addPhotoPreview(this._offerData[photo]);
        })
    }
}