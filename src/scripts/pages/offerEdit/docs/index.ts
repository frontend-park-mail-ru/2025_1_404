
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import offerCreateDocsPreviewTemplate from "../../../components/offerCreateDocsPreview/template.precompiled.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import {deleteOfferDoc, uploadOfferDoc} from "../../../util/apiUtil.ts";

/**
 * @class OfferEditDocsPage
 * @description Страница редактирования объявления с выбором фото
 * @augments OfferPage
 */
export default class OfferEditDocsPage extends OfferPage {
    private docsPreviewsCounter: number = -1;
    private dropArea: HTMLElement | null | undefined;
    private docsPreviewsList: HTMLElement | null | undefined;
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
        this.docsPreviewsCounter = -1;
        this.dropArea = document.getElementById('offerCreateDocsInputBlock');
        this.docsPreviewsList = document.getElementById('offerCreateDocsPreviews');

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
     * @param {number | undefined} id id фото
     * @private
     */
    private addDocPreview(file: File, source: string, id: number | null) {
        if (typeof this.docsPreviewsCounter !== 'number' || !this.docsPreviewsList) {
            return;
        }
        if (id === null) {
            this.docsPreviewsCounter += 1;
        }
        else {
            this.docsPreviewsCounter = id;
        }
        this.offerData[this.docsPreviewsCounter] = source;
        this.docsPreviewsList.insertAdjacentHTML('beforeend', offerCreateDocsPreviewTemplate({index: this.docsPreviewsCounter, src: source}));
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
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (!event.target) {
                        return;
                    }
                    const target = event.target as FileReader;
                    if (target.result) {
                        await this.handleAddDoc(file, target.result.toString());
                        this.markAsFullfilled(Object.keys(this.offerData).length > 0);
                    }
                };
                reader.readAsDataURL(file);
            }
        })
    }

    /**
     * @function deleteDoc
     * @description Метод удаления документов
     * @param {string} localId id фото
     */
    private async deleteDoc(localId: string) {
        if (!this.uploadedDocs[localId] || !this.uploadedDocs[localId].id) {
            return;
        }
        await this.layout?.makeRequest(deleteOfferDoc,
            this.uploadedDocs[localId].id
        ).catch((err) => {
            this.layout?.addPopup('Ошибка сервера', err.message);
        })
    }

    /**
     * @function handleAddDoc
     * @description Метод обработки события добавления документа
     * @param {File} file файл
     * @param {string} source адрес фото
     */
    private async handleAddDoc(file: File, source: string) {
        if (typeof this.docsPreviewsCounter !== 'number') {
            return;
        }
        await this.layout?.makeRequest(uploadOfferDoc, {
            offerId: this.offerId,
            file: file
        }).then((data) => {
            if (data) {
                this.addDocPreview(file, source, null);
                const localId = this.docsPreviewsCounter;
                OfferCreate.setData(this.pageName, this.offerData);
                this.uploadedDocs[localId] = {
                    file,
                    id: data.doc_id,
                }
                OfferCreate.setDocs(this.uploadedDocs);
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
     * @description Обработчик события клика на превью документа
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

            const photoPreview = currentTarget.id
            this.deleteDoc(photoPreview).then(() => {
                delete this.offerData[photoPreview];
                delete this.uploadedDocs[photoPreview];
                OfferCreate.setData(this.pageName, this.offerData);
                OfferCreate.setDocs(this.uploadedDocs);
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
            this.addDocPreview(this.uploadedDocs[photo].file, offerData[photo], Number(photo));
        })
    }
}