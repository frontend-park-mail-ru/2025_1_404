
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import offerCreatePhotosPreviewTemplate from "../../../components/offerCreatePhotosPreview/template.precompiled.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import {deleteOfferImage, uploadOfferImage} from "../../../util/apiUtil.ts";

/**
 * @class OfferEditPhotosPage
 * @description Страница редактирования объявления с выбором фото
 * @augments OfferPage
 */
export default class OfferEditPhotosPage extends OfferPage {
    private _photosPreviewsCounter: number = -1;
    private _dropArea: HTMLElement | null | undefined;
    private _photosPreviewsList: HTMLElement | null | undefined;
    private _offerId: number = 0;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     * @param {Record<string, unknown>} props параметры страницы
     */
    render({layout, root, props}: PageRenderInterface) {
        if (!props || typeof props.id !== 'number') {
            return;
        }

        root.innerHTML = template();
        this._offerId = props.id;
        this._photosPreviewsCounter = -1;
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
     * @param {File} file адрес фото
     * @param {string} source объект FileReader
     * @private
     */
    _addPhotoPreview(file: File, source: string) {
        if (typeof this._photosPreviewsCounter !== 'number' || !this._photosPreviewsList) {
            return;
        }
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
    _dragAddClassHandler(event: Event) {
        event.preventDefault();
        if (this._dropArea) {
            this._dropArea.classList.add('offerCreate__photos-hover');
        }
    }

    /**
     * @function _dragRemoveClassHandler
     * @description Метод удаления класса при перетаскивании файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    _dragRemoveClassHandler(event: Event) {
        event.preventDefault();
        if (this._dropArea) {
            this._dropArea.classList.remove('offerCreate__photos-hover');
        }
    }

    /**
     * @function _dragDropHandler
     * @description Метод обработки события перетаскивания файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    _dragDropHandler(event: DragEvent) {
        event.preventDefault();
        if (this._dropArea) {
            this._dropArea.classList.remove('offerCreate__photos-hover');
        }
        if (event.dataTransfer) {
            const files = Array.from(event.dataTransfer.files)
            this._uploadFiles(files);
        }
    }

    /**
     * @function _uploadFiles
     * @param {Array} files массив файлов
     * @private
     */
    _uploadFiles(files: Array<File>) {
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (!event.target) {
                        return;
                    }
                    const target = event.target as FileReader;
                    if (target.result) {
                        this._addPhotoPreview(file, target.result.toString());
                        OfferCreate.setData(this._pageName, this._offerData);

                        await this._handleAddImage(file);

                        this._markAsFullfilled(Object.keys(this._offerData).length > 0);
                    }
                };
                reader.readAsDataURL(file);
            }
        })
    }

    /**
     * @function _deleteImage
     * @description Метод удаления фото
     * @param {string} localId id фото
     */
    async _deleteImage(localId: string) {
        if (!this._uploadedImages[localId] || !this._uploadedImages[localId].id) {
            return;
        }
        await this._layout?.makeRequest(deleteOfferImage,
            this._uploadedImages[localId].id
        ).catch((err) => {
            console.error(err);
        })
    }

    /**
     * @function _handleAddImage
     * @description Метод обработки события добавления фото
     * @param {File} file файл
     */
    async _handleAddImage(file: File) {
        if (typeof this._photosPreviewsCounter !== 'number') {
            return;
        }
        const localId = this._photosPreviewsCounter;
        await this._layout?.makeRequest(uploadOfferImage, {
            offerId: this._offerId,
            image: file
        }).then((data) => {
            if (data) {
                this._uploadedImages[localId] = {
                    file,
                    id: data.image_id,
                }
                OfferCreate.setImages(this._uploadedImages);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    /**
     * @function _chooseFilesButtonClickHandler
     * @description Метод обработки события клика на кнопку выбора файлов
     * @private
     */
    _chooseFilesButtonClickHandler() {
        const element = document.getElementById('offerCreatePhotosInput') as HTMLInputElement;
        element.click();
    }

    /**
     * @function _getFilesAfterChooseClickHandler
     * @description Метод обработки события выбора файлов
     * @param {Event} event событие выбора файлов
     * @private
     */
    _getFilesAfterChooseClickHandler(event: Event) {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const files = Array.from(target.files ?? []);
            this._uploadFiles(files);
        }
    }

    /**
     * @function _photoPreviewClickHandler
     * @description Обработчик события клика на превью фото
     * @param {Event} event событие клика
     * @private
     */
    _photoPreviewClickHandler(event: Event,) {
        if (!event.target) {
            return;
        }
        let currentTarget = event.target as HTMLElement;
        while (currentTarget.tagName === 'path' || currentTarget.tagName === 'I') {
            if (currentTarget.parentElement) {
                currentTarget = currentTarget.parentElement;
            }
        }

        if (currentTarget.classList.contains('delete__cross')) {
            if (currentTarget.parentElement && currentTarget.parentElement.parentElement) {
                currentTarget = currentTarget.parentElement.parentElement;
            }
            event.preventDefault();

            const photoPreview = currentTarget.id
            this._deleteImage(photoPreview).then(() => {
                delete this._offerData[photoPreview];
                delete this._uploadedImages[photoPreview];
                OfferCreate.setData(this._pageName, this._offerData);
                OfferCreate.setImages(this._uploadedImages);
                this._markAsFullfilled(Object.keys(this._offerData).length > 0);
                currentTarget.remove();
            })
        }
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const _offerData = this._offerData;
        this._offerData = {};
        Object.keys(_offerData).forEach(photo => {
            this._addPhotoPreview(this._uploadedImages[photo].file, _offerData[photo]);
        })
    }
}