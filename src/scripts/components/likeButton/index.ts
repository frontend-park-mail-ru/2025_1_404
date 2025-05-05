
import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';
import {likeOfer} from "../../util/apiUtil.ts";
import User from "../../models/user.ts";

/**
 * @class LikeButton
 * @description Компонент лайка.
 * @augments BaseComponent
 */
export default class LikeButton extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }

    initListeners() {
        super.initListeners();
        this.initListener('like', 'click', this.likeClickHandler);
    }

    public updateDetails({isLiked, count}: {isLiked: boolean, count: number}) {
        console.log('updateDetails', isLiked, count);
        const likeContainer = document.getElementById('like') as HTMLElement;
        const likeCount = document.getElementById('like__count') as HTMLElement;
        if (!likeContainer || !likeCount) {
            return;
        }
        likeContainer.classList.remove('active');
        if (isLiked) {
            likeContainer.classList.add('active');
        }
        likeCount.innerText = count.toString();
    }

    private likeClickHandler(event: Event) {
        event.preventDefault();
        let target: HTMLElement = event.target as HTMLButtonElement;
        while (target && target.id !== 'like' && target.parentElement) {
           target = target.parentElement as HTMLElement;
        }
        if (!target || target.id !== 'like' || target.dataset.id === undefined || target.classList.contains('disabled')) {
            return;
        }
        if (!User.isAuthenticated()) {
            this.layout?.emit('showLogin');
            return;
        }
        target.classList.add('disabled');
        this.layout?.makeRequest(likeOfer, parseInt(target.dataset.id)).then((response) => {
            this.updateDetails({
                isLiked: response.is_liked,
                count: response.amount
            })
        })
        .finally(() => {
            target.classList.remove('disabled');
        });
    }
}