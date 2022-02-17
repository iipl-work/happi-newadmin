import Repository, { mongoService } from '~/repositories/Repo.js';
import { baseUrl } from '~/repositories/Repo'; 

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
            response = await Repository.post(`${baseUrl}api/user-login`, temp); 
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
        console.log("temp",temp);
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