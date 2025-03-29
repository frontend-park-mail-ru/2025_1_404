'use strict'

import Page from '../../page.js';
import template from "./offerCreatePhotos.precompiled.js";
import offerCreatePhotosPreviewTemplate from "../../../components/OfferCreatePhotosPreview/OfferCreatePhotosPreview.precompiled.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @extends Page
 */
export default class OfferCreatePhotosPage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: false, lastPage: false});
        this._offerPhotosData = {};
        this._photosPreviewsCounter = 0;

        this._dropArea = document.getElementById('offerCreatePhotosInputBlock');
        this._photosPreviewsList = document.getElementById('offerCreatePhotosPreviews');

        this._photoPreviewClickHandler = this._photoPreviewClickHandler.bind(this);
        this._photosPreviewsList.addEventListener('click', this._photoPreviewClickHandler);

        this._getDataFromModel();
        if (Object.keys(this._offerPhotosData).length !== 0) {
            this._setDataFromModel();
        }
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
        this._offerPhotosData[this._photosPreviewsCounter] = source;
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
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this._addPhotoPreview(event.target.result.toString());
                    OfferCreate.setData("photos", this._offerPhotosData);
                    OfferCreate.setPageFilled("photos", Object.keys(this._offerPhotosData).length > 0);
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
    * @method _photoPreviewClickHandler
    * @description Обработчик события клика на превью фото
    * @param event
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
            delete this._offerPhotosData[photoPreview];

            OfferCreate.setData("photos", this._offerPhotosData);
            OfferCreate.setPageFilled("photos", Object.keys(this._offerPhotosData).length > 0);
            currentTarget.remove();
        }
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["photos"]) {
            this._offerPhotosData = OfferCreate.getOfferData()["photos"];
        }
    }

    _setDataFromModel() {
        Object.keys(this._offerPhotosData).forEach(photo => {
            this._addPhotoPreview(photo);
        })
    }

    destroy() {
        if (this._photosPreviewsList) {
            this._photosPreviewsList.removeEventListener('click', this._photoPreviewClickHandler);
        }

        super.destroy();
    }
}