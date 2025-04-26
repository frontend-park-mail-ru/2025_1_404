import PageManager from "./managers/pageManager.ts";
import CSATStarsPage from "./pages/csatStars";
import registerComponents from "./util/componentUtil.ts";
import {CSATType} from "./components/csat";

const init = () => {
    PageManager.emit('init');
    registerPages();
    registerComponents();

    PageManager.renderPage('csat_stars');
    window.addEventListener('message', onMessage);
    window.addEventListener('beforeunload', destroy);
}

const destroy = () => {
    window.removeEventListener('message', onMessage);
    window.removeEventListener('beforeunload', destroy);
}

const registerPages = () => {
    PageManager.registerPage('csat_stars', new CSATStarsPage());
}

interface CSATMessage {
    type: CSATType;
    title: string;
    questionId: number;
}

const onMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as CSATMessage;
    PageManager.renderPage(data.type, {
        'title': data.title,
        'questionId': data.questionId
    })
}

init();