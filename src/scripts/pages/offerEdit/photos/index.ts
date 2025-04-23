
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
    private photosPreviewsCounter: number = -1;
    private dropArea: HTMLElement | null | undefined;
    private photosPreviewsList: HTMLElement | null | undefined;
    private offerId: number = 0;
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
        this.offerId = props.id;
        this.photosPreviewsCounter = -1;
        this.dropArea = document.getElementById('offerCreatePhotosInputBlock');
        this.photosPreviewsList = document.getElementById('offerCreatePhotosPreviews');

        super.render({layout, root});
        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }

    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreatePhotosInputBlock', 'dragenter', this.dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragover', this.dragAddClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'dragleave', this.dragRemoveClassHandler);
        this.initListener('offerCreatePhotosInputBlock', 'drop', this.dragDropHandler);
        this.initListener('offerCreatePhotosButton', 'click', this.chooseFilesButtonClickHandler);
        this.initListener('offerCreatePhotosInput', 'change', this.getFilesAfterChooseClickHandler);
        this.initListener('offerCreatePhotosPreviews', 'click', this.photoPreviewClickHandler);
    }

    /**
     * @function addPhotoPreview
     * @description Метод добавления превью фото в список
     * @param {File} file адрес фото
     * @param {string} source объект FileReader
     * @param {number | undefined} id id фото
     * @private
     */
    private addPhotoPreview(file: File, source: string, id: number | null) {
        if (typeof this.photosPreviewsCounter !== 'number' || !this.photosPreviewsList) {
            return;
        }
        if (id === null) {
            this.photosPreviewsCounter += 1;
        }
        else {
            this.photosPreviewsCounter = id;
        }
        this.offerData[this.photosPreviewsCounter] = source;
        this.photosPreviewsList.insertAdjacentHTML('beforeend', offerCreatePhotosPreviewTemplate({index: this.photosPreviewsCounter, src: source}));
    }

    /**
     * @function dragAddClassHandler
     * @description Метод добавления класса при перетаскивании файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    private dragAddClassHandler(event: Event) {
        event.preventDefault();
        if (this.dropArea) {
            this.dropArea.classList.add('offerCreate__photos-hover');
        }
    }

    /**
     * @function dragRemoveClassHandler
     * @description Метод удаления класса при перетаскивании файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    private dragRemoveClassHandler(event: Event) {
        event.preventDefault();
        if (this.dropArea) {
            this.dropArea.classList.remove('offerCreate__photos-hover');
        }
    }

    /**
     * @function dragDropHandler
     * @description Метод обработки события перетаскивания файла
     * @param {Event} event событие перетаскивания
     * @private
     */
    private dragDropHandler(event: DragEvent) {
        event.preventDefault();
        if (this.dropArea) {
            this.dropArea.classList.remove('offerCreate__photos-hover');
        }
        if (event.dataTransfer) {
            const files = Array.from(event.dataTransfer.files)
            this.uploadFiles(files);
        }
    }

    /**
     * @function uploadFiles
     * @param {Array} files массив файлов
     * @private
     */
    private uploadFiles(files: Array<File>) {
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (!event.target) {
                        return;
                    }
                    const target = event.target as FileReader;
                    if (target.result) {
                        await this.handleAddImage(file, target.result.toString());
                        this.markAsFullfilled(Object.keys(this.offerData).length > 0);
                    }
                };
                reader.readAsDataURL(file);
            }
        })
    }

    /**
     * @function deleteImage
     * @description Метод удаления фото
     * @param {string} localId id фото
     */
    private async deleteImage(localId: string) {
        if (!this.uploadedImages[localId] || !this.uploadedImages[localId].id) {
            return;
        }
        await this.layout?.makeRequest(deleteOfferImage,
            this.uploadedImages[localId].id
        ).catch((err) => {
            this.layout?.addPopup('Ошибка сервера', err.message);
        })
    }

    /**
     * @function handleAddImage
     * @description Метод обработки события добавления фото
     * @param {File} file файл
     * @param {string} source адрес фото
     */
    private async handleAddImage(file: File, source: string) {
        if (typeof this.photosPreviewsCounter !== 'number') {
            return;
        }
        await this.layout?.makeRequest(uploadOfferImage, {
            offerId: this.offerId,
            image: file
        }).then((data) => {
            if (data) {
                this.addPhotoPreview(file, source, null);
                const localId = this.photosPreviewsCounter;
                OfferCreate.setData(this.pageName, this.offerData);
                this.uploadedImages[localId] = {
                    file,
                    id: data.image_id,
                }
                OfferCreate.setImages(this.uploadedImages);
            }
        }).catch((err) => {
            this.layout?.addPopup('Ошибка сервера', err.message);
        })
    }

    /**
     * @function chooseFilesButtonClickHandler
     * @description Метод обработки события клика на кнопку выбора файлов
     * @private
     */
    private chooseFilesButtonClickHandler() {
        const element = document.getElementById('offerCreatePhotosInput') as HTMLInputElement;
        element.click();
    }

    /**
     * @function getFilesAfterChooseClickHandler
     * @description Метод обработки события выбора файлов
     * @param {Event} event событие выбора файлов
     * @private
     */
    private getFilesAfterChooseClickHandler(event: Event) {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const files = Array.from(target.files ?? []);
            target.value = '';
            this.uploadFiles(files);
        }
    }

    /**
     * @function photoPreviewClickHandler
     * @description Обработчик события клика на превью фото
     * @param {Event} event событие клика
     * @private
     */
    private photoPreviewClickHandler(event: Event,) {
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
            this.deleteImage(photoPreview).then(() => {
                delete this.offerData[photoPreview];
                delete this.uploadedImages[photoPreview];
                OfferCreate.setData(this.pageName, this.offerData);
                OfferCreate.setImages(this.uploadedImages);
                this.markAsFullfilled(Object.keys(this.offerData).length > 0);
                currentTarget.remove();
            })
        }
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const offerData = this.offerData;
        this.offerData = {};
        Object.keys(offerData).forEach(photo => {
            this.addPhotoPreview(this.uploadedImages[photo].file, offerData[photo], Number(photo));
        })
    }
}