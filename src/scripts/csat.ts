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
}

const registerPages = () => {
    PageManager.registerPage('csat_stars', new CSATStarsPage());
}

interface CSATMessage {
    type: CSATType;
    title: string;
}

const onMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as CSATMessage;
    PageManager.renderPage(data.type, {
        'title': data.title
    })
}

init();