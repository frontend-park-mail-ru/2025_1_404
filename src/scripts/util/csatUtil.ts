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
    text: string;
}

interface Answer {
    question: Question;
    rating: number;
}

interface EventResponse {
    questions: Question[];
}

interface StatsRespomse {
    answers: Answer[];
}

class CSATUtil {

    private CSAT_URL = "http://localhost:8002";

    async getEventDetails(event: string) {
        // const data = await this.makeCSATRequest({
        //     endpoint: '/csatStars',
        //     query: {
        //         event
        //     }
        // });
        // return data as EventResponse;
        return {
            questions: [
                {
                    text: 'Как вы оцениваете качество обслуживания?'
                }
            ]
        }
    }

    async getQuestionsStats() {
        const data = await this.makeCSATRequest({
            endpoint: '/csatStars/stats',
        });
        return data as StatsRespomse;
    }

    async answerToQuestion(questionId: number, rating: number) {
        await this.makeCSATRequest({
            endpoint: '/csatStars',
            method: 'POST',
            body: {
                questionId,
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