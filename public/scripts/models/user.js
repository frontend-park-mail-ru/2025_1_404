'use strict';

import {getProfile, login, logout, registerAccount} from "../util/apiUtil.js";

class User {
    constructor() {
        this._isAuthenticated = false;
    }

    isAuthenticated() {
        return this._isAuthenticated;
    }

    getData() {
        if (!this._isAuthenticated) {
            return null;
        }
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }

    async update() {
        await getProfile().then((response) => {
            this._isAuthenticated = true;
            this.email = response.email;
            this.firstName = response.first_name;
            this.lastName = response.last_name;
            return this.getData();
        }).catch((error) => {
            throw error;
        });
    }

    async login({email, password}) {
        await login({email, password})
            .then((response) => {
                this._isAuthenticated = true;
                this.email = response.email;
                this.firstName = response.first_name;
                this.lastName = response.last_name;
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }

    async logout() {
        await logout().then(() => {
            this._isAuthenticated = false;
            this.email = null;
            this.firstName = null;
            this.lastName = null;
        })
    }

    async register({email, password, first_name, last_name}) {
        await registerAccount({email, first_name, last_name, password})
            .then((response) => {
                this._isAuthenticated = true;
                this.email = response.email;
                this.firstName = response.first_name;
                this.lastName = response.last_name;
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }
}

export default new User();