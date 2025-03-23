'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreatePhotos.precompiled.js";
import offerCreatePhotosPreviewTemplate from "../../../components/OfferCreatePhotosPreview/OfferCreatePhotosPreview.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @extends Page
 */
export default class OfferCreatePhotosPage extends Page {
    render({root}) {
        root.innerHTML = template();

        this._photos = new Map();
        this._photosPreviewsCounter = 0;

        this._dropArea = document.getElementById('offerCreatePhotosInputBlock');
        this._photosPreviewsList = document.getElementById('offerCreatePhotosPreviews');

        this._photoPreviewClickHandler = this._photoPreviewClickHandler.bind(this);
        this._photosPreviewsList.addEventListener('click', this._photoPreviewClickHandler);
        super.render(root);
    }

    initListeners() {
        this.initListener('offerCreatePhotosInputBlock', 'dragenter', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragover', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragleave', this._dragRemoveClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'drop', this._dragDropHandler);
        this.initListener('offerCreatePhotosButton', 'click', this._chooseFilesButtonClickHandler);
        this.initListener('offerCreatePhotosInput', 'change', this._getFilesAfterChooseClickHandler);
    }

    _addPhotoPreview(source) {
        this._photosPreviewsCounter += 1;
        this._photos.set(this._photosPreviewsCounter, source);
        this._photosPreviewsList.insertAdjacentHTML('beforeend', offerCreatePhotosPreviewTemplate({index: this._photosPreviewsCounter, src: source}));
    }

    _dragAddClassHandler(event) {
        event.preventDefault();
        this._dropArea.classList.add('offerCreate__photos-hover');
    }

    _dragRemoveClassHandler(event) {
        event.preventDefault();
        this._dropArea.classList.remove('offerCreate__photos-hover');
    }

    _dragDropHandler(event) {
        event.preventDefault();
        this._dropArea.classList.remove('offerCreate__photos-hover');

        let files = Array.from(event.dataTransfer.files)
        this._uploadFiles(files);
    }

    _uploadFiles(files) {
        files.forEach((file) => {
            console.log(file.type)
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this._addPhotoPreview(event.target.result.toString());
                };
                reader.readAsDataURL(file);
            }
        })
    }

    _chooseFilesButtonClickHandler() {
        document.getElementById('offerCreatePhotosInput').click();
    }

    _getFilesAfterChooseClickHandler(event) {
        const files = Array.from(event.target.files);
        this._uploadFiles(files);
    }

    /**
    * @method _cardClickHandler
    * @description Обработчик события клика на карточку
    * @param event
    * @private
    */
    _photoPreviewClickHandler(event, {target} = event) {
        let currentTarget = target;
        while (currentTarget.tagName === 'path' || currentTarget.tagName === 'I') {
            currentTarget = currentTarget.parentElement;
        }
        if (currentTarget.classList.contains('delete__cross')) {
            event.preventDefault();
            const photoPreview = currentTarget.id
            this._photos.delete(photoPreview);
            currentTarget.parentElement.parentElement.remove();
        }
    }

    destroy() {
        if (this._photosPreviewsList) {
            this._photosPreviewsList.removeEventListener('click', this._photoPreviewClickHandler);
        }

        super.destroy();
    }
}