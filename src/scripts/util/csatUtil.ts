import {HttpMethod, createRequestOptions, makeRequest} from "./httpUtil.ts";

interface makeCSATRequestInterface {
    /**
     * @property {string} endpoint URL-адрес API
     */
    endpoint: string;
    /**
     * @property {string} method HTTP-метод (GET, POST, PUT и т.д.)
     */
    method?: HttpMethod;
    /**
     * @property {object} body Тело запроса
     */
    body?: Record<string, string|number>;
    /**
     * @property {string} query Query параметры
     */
    query?: Record<string, string>;
}

interface Question {
    id: number;
    csat_id: number;
    text: string;
}

interface Answer {
    question: Question;
    rating: number;
}

interface StatsRespomse {
    answers: Answer[];
}

class CSATUtil {

    private CSAT_URL = import.meta.env.VITE_CSAT_URL;

    async getEventDetails(event: string) {
        const data = await this.makeCSATRequest({
            endpoint: '/csat',
            query: {
                'event_name': event
            }
        });
        return data as Question[];
    }

    async getQuestionsStats() {
        const data = await this.makeCSATRequest({
            endpoint: '/csatStars/stats',
        });
        return data as StatsRespomse;
    }

    async answerToQuestion(questionId: number, rating: number) {
        await this.makeCSATRequest({
            endpoint: '/csat',
            method: 'POST',
            body: {
                question_id: questionId,
                rating
            }
        });
    }

    private makeCSATRequest = async ({endpoint, method='GET', body={}, query={}}: makeCSATRequestInterface) => {
        const options = createRequestOptions(method);
        options.mode = 'cors';
        options.credentials = 'include';

        return await makeRequest({
            url: `${this.CSAT_URL}${endpoint}`,
            method,
            body,
            query,
            options
        })
    }

}

export default new CSATUtil();