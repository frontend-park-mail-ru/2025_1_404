import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import offerCreateDocsPreviewTemplate from "../../../components/offerCreateDocsPreview/template.precompiled.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

/**
 * @class OfferCreateDocsPage
 * @description Страница создания объявления с загрузкой документов
 * @augments OfferPage
 */
export default class OfferCreateDocsPage extends OfferPage {
    private docsPreviewsCounter: number | undefined;
    private dropArea: HTMLElement | null | undefined;
    private docsPreviewsList: HTMLElement | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();

        this.docsPreviewsCounter = 0;
        this.dropArea = document.getElementById('offerCreateDocsInputBlock');
        this.docsPreviewsList = document.getElementById('offerCreateDocsPreviews');

        super.render({layout, root});
        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }
        this.uploadedDocs = {}
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateDocsInputBlock', 'dragenter', this.dragAddClassHandler);
        this.initListener('offerCreateDocsInputBlock', 'dragover', this.dragAddClassHandler);
        this.initListener('offerCreateDocsInputBlock', 'dragleave', this.dragRemoveClassHandler);
        this.initListener('offerCreateDocsInputBlock', 'drop', this.dragDropHandler);
        this.initListener('offerCreateDocsButton', 'click', this.chooseFilesButtonClickHandler);
        this.initListener('offerCreateDocsInput', 'change', this.getFilesAfterChooseClickHandler);
        this.initListener('offerCreateDocsPreviews', 'click', this.docPreviewClickHandler);
    }

    /**
     * @function addDocPreview
     * @description Метод добавления превью документа в список
     * @param {File} file адрес фото
     * @param {string} source объект FileReader
     * @private
     */
    private addDocPreview(file: File, source: string) {
        if (typeof this.docsPreviewsCounter !== 'number' || !this.docsPreviewsList) {
            return;
        }
        this.docsPreviewsCounter += 1;
        this.offerData[this.docsPreviewsCounter] = source;
        this.uploadedDocs[this.docsPreviewsCounter] = {
            file
        };
        this.docsPreviewsList.insertAdjacentHTML('beforeend', offerCreateDocsPreviewTemplate({index: this.docsPreviewsCounter, name: file.name}));
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
            this.dropArea.classList.add('offerCreate__docs-hover');
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
            this.dropArea.classList.remove('offerCreate__docs-hover');
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
            this.dropArea.classList.remove('offerCreate__docs-hover');
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
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        files.forEach((file) => {
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (allowedExtensions.includes(fileExtension)) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (!event.target) {
                        return;
                    }
                    const target = event.target as FileReader;
                    if (target.result) {
                        console.log(file, target.result.toString());
                        this.addDocPreview(file, target.result.toString());
                        OfferCreate.setData(this.pageName, this.offerData);
                        OfferCreate.setDocs(this.uploadedDocs);

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
        const element = document.getElementById('offerCreateDocsInput') as HTMLInputElement;
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
     * @function docPreviewClickHandler
     * @description Обработчик события клика на превью фото
     * @param {Event} event событие клика
     * @private
     */
    private docPreviewClickHandler(event: Event,) {
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

            const docPreview = currentTarget.id
            delete this.offerData[docPreview];
            delete this.uploadedDocs[docPreview];

            OfferCreate.setData(this.pageName, this.offerData);
            OfferCreate.setDocs(this.uploadedDocs);
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
        Object.keys(offerData).forEach(doc => {
            this.addDocPreview(this.uploadedDocs[doc].file, offerData[doc]);
        })
    }
}