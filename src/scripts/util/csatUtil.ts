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

interface StatsResponse {
    answers: Answer[];
}

class CSATUtil {

    private CSAT_URL = "http://localhost:8002/api/v1";


    /**
     * @function getEventDetails
     * @description Функция для получения списка событий вызова CSAT опросов.
     * @returns {Promise<*>} Ответ от сервера
     */
    async getEventDetails() {
        const data = await this.makeCSATRequest({
            endpoint: '/csat/events',
        });
        return data as EventResponse;
    }


    /**
     * @function getQuestionsStats
     * @description Функция для получения списка вопросов по событию вызова CSAT опросов.
     * @returns {Promise<*>} Ответ от сервера
     */
    async getQuestionsStats(event: string) {
        const data = await this.makeCSATRequest({
            endpoint: '/csat',
            query: {
                event_name: event,
            }
        });
        return data as StatsResponse;
    }

    /**
     * @function getCsatAnswers
     * @description Функция для получения списка ответов по вопросу из CSAT опросов.
     * @returns {Promise<*>} Ответ от сервера
     */
    async getAnswersStats(questionId: string) {
        const data = await this.makeCSATRequest({
            endpoint: '/csat/stats',
            query: {
                question_id: questionId,
            }
        });
        return data;
    }

    async answerToQuestion(questionId: number, rating: number) {
        await this.makeCSATRequest({
            endpoint: '/csat',
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