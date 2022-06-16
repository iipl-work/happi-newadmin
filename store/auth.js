import Repository, { mongoService } from '~/repositories/Repo.js';
import { baseUrl } from '~/repositories/Repo'; 
const crypto = require('crypto');
const secret = '1584FFBB3C6D5F74A5A41E7D3674A';
import axios from 'axios';

export const state = () => ({
    isLoggedIn: false,
    isRegistered: null
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setIsRegistered(state, payload) {
        state.isRegistered = payload;
    }
};

export const actions = {
    async setAuthStatus({ commit, state }, payload) {
        let temp = {
            phone: payload,
            type:"admin"
        };
        var response;
        try {
            const hash = crypto.createHmac('sha256', secret)
            .update(`POST:LOGIN${JSON.stringify(temp)}`)
            .digest('hex');

            var config = {
                headers:{
                    'x-sign':hash,
                    'Content-Type':'application/json; charset=utf-8'
                },
                method:"POST",
                url: 'https://dev-services.happimobiles.com/api/user-login',
                data:JSON.stringify(temp)
            }
            console.log("REQ", config)
            response = await axios(config); 
        } catch (error) {
            console.log('error', error);
        }  
        localStorage.setItem('userLoginPhone', payload);
        return response.data;
    },

    async setOtpStatus({ commit, state }, payload) {
        console.log("payload",payload);
        let temp = {
            phone: localStorage.getItem('userLoginPhone'), 
            otp: payload
        };
        var response;
        try {
            response = await Repository.post(`${baseUrl}api/user-verify`, temp);
            console.log("payload response",response);
        } catch (error) {
            console.log('error', error);
        }
        if(response.data.status){  
            if(localStorage != null){
                localStorage.clear();
            } 
            var hours = 24; // Reset when storage is more than 24hours
            var now = new Date();
            now.setHours(now.getHours() + 23);
            var time =  now.getTime();
            localStorage.setItem("timeout", time);
            localStorage.setItem('userDetails', JSON.stringify(response.data.data));
            localStorage.setItem('accessToken', response.data.token);
        }
        return response.data;       
    },

};