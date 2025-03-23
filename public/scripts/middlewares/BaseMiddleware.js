'use strict';

export default class BaseMiddleware {
    check(route) {
        return {
            process: (params) => {
                route.process(params);
            }
        }
    }
}