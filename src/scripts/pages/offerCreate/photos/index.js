'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import offerCreatePhotosPreviewTemplate from "../../../components/offerCreatePhotosPreview/template.precompiled.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @extends Page
 */
export default class OfferCreatePhotosPage extends OfferPage {
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

    initListeners() {
        this.initListener('offerCreatePhotosInputBlock', 'dragenter', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragover', this._dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragleave', this._dragRemoveClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'drop', this._dragDropHandler);
        this.initListener('offerCreatePhotosButton', 'click', this._chooseFilesButtonClickHandler);
        this.initListener('offerCreatePhotosInput', 'change', this._getFilesAfterChooseClickHandler);
        this.initListener('offerCreatePhotosPreviews', 'click', this._photoPreviewClickHandler);
    }

    _addPhotoPreview(source) {
        console.log(source)
        this._photosPreviewsCounter += 1;
        this._offerData[this._photosPreviewsCounter] = source;
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

        const files = Array.from(event.dataTransfer.files)
        this._uploadFiles(files);
    }

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
            delete this._offerData[photoPreview];

            OfferCreate.setData(this._pageName, this._offerData);
            this._markAsFullfilled(Object.keys(this._offerData).length > 0);
            currentTarget.remove();
        }
    }

    _setDataFromModel() {
        Object.keys(this._offerData).forEach(photo => {
            this._addPhotoPreview(this._offerData[photo]);
        })
    }
}