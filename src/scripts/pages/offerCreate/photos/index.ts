
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import offerCreatePhotosPreviewTemplate from "../../../components/offerCreatePhotosPreview/template.precompiled.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @augments OfferPage
 */
export default class OfferCreatePhotosPage extends OfferPage {
    private photosPreviewsCounter: number | undefined;
    private dropArea: HTMLElement | null | undefined;
    private photosPreviewsList: HTMLElement | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();

        this.photosPreviewsCounter = 0;
        this.dropArea = document.getElementById('offerCreatePhotosInputBlock');
        this.photosPreviewsList = document.getElementById('offerCreatePhotosPreviews');

        super.render({layout, root});
        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }
        this.uploadedImages = {}
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
     * @private
     */
    private addPhotoPreview(file: File, source: string) {
        if (typeof this.photosPreviewsCounter !== 'number' || !this.photosPreviewsList) {
            return;
        }
        this.photosPreviewsCounter += 1;
        this.offerData[this.photosPreviewsCounter] = source;
        this.uploadedImages[this.photosPreviewsCounter] = {
            file
        };
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
                reader.onload = (event) => {
                    if (!event.target) {
                        return;
                    }
                    const target = event.target as FileReader;
                    if (target.result) {
                        this.addPhotoPreview(file, target.result.toString());
                        OfferCreate.setData(this.pageName, this.offerData);
                        OfferCreate.setImages(this.uploadedImages);

                        this.markAsFullfilled(Object.keys(this.offerData).length > 0);
                    }
                };
                reader.readAsDataURL(file);
            }
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
            delete this.offerData[photoPreview];
            delete this.uploadedImages[photoPreview];

            OfferCreate.setData(this.pageName, this.offerData);
            OfferCreate.setImages(this.uploadedImages);
            this.markAsFullfilled(Object.keys(this.offerData).length > 0);
            currentTarget.remove();
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
            this.addPhotoPreview(this.uploadedImages[photo].file, offerData[photo]);
        })
    }
}