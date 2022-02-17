import Repository, { mongoService } from '~/repositories/Repo.js';

export const state = () => ({
    list: [],
    selected: {},
    formType: "ADD", // ADD // EDIT
    formContext: {},
    clusterList: []
});

export const mutations = {
    SET_LIST(state, payload) {
        state.list = payload
    },
    SET_SELECTED(state, payload) {
        state.selected = payload
    },
    SET_FORM_TYPE(state, payload) {
        state.formType = payload
    },
    SET_FORM_CONTEXT(state, payload) {
        state.formContext = payload
    },
    setBlogObj(state, payload) {
        state.clusterList = payload
    },
}

export const actions = {
    
    async getClusterById({ commit, state }, payload) {
        
        var mongo = await mongoService({});
        var dataBase = mongo.mongodb;
        const clusterDataDB = dataBase.db('one_connect').collection('Cluster');
        const receivedData = await clusterDataDB.findOne({clusterCode:payload});
        console.log("getClusterById", receivedData, payload);
        commit('SET_SELECTED', receivedData);
        return;
    },
    async updateClusterStatus({ commit, state }, payload){
            var mongo = await mongoService({});
            var dataBase = mongo.mongodb;
            const clusterDataDB = dataBase.db('one_connect').collection('Cluster');
            const receivedData = await clusterDataDB.updateOne({clusterCode:payload.code}, {$set:{status:payload.status, comments:payload.comments }});
            commit('SET_SELECTED', receivedData);
            return;
    },
    async getClusters({ commit, state }, payload) {
        
        var mongo = await mongoService({});
        var dataBase = mongo.mongodb;
        const clusterDataDB = dataBase.db('one_connect').collection('Cluster');
        const receivedData = await clusterDataDB.find({});
        
        console.log('=====receivedData', receivedData);
        commit('SET_LIST',receivedData);
        return receivedData; 
    },

    async createCluster({ commit,state }, payload) {
       var mongo = await mongoService({});
       var dataBase = mongo.mongodb;
        const clusterDataDB= dataBase.db('one_connect').collection('Cluster');
        try {
            await clusterDataDB.insertOne(payload);
        } catch (err) {
            console.error('Failed to log in', err);
        }
    },
    async deleteClusterById({ commit, state }, payload) {
       var mongo = await mongoService({});
       var dataBase = mongo.mongodb;
        const clusterDataDB = dataBase.db('one_connect').collection('Cluster');        
        await clusterDataDB.deleteOne(state.list[payload]);     
    },
    async getClusterFilterData({ commit,state }, payload) {
        var mongo = await mongoService({});
        var dataBase = mongo.mongodb;
        const clusterDataDB= dataBase.db('one_connect').collection('Cluster');
        if(payload=="All"){
            const receivedData = await clusterDataDB.find({});
            commit('SET_LIST',receivedData);
        }else{
            const receivedData = await clusterDataDB.find({'status':payload});
            commit('SET_LIST',receivedData);
        }
    },
    async getClusterDataByClusterCode({ commit,state }, payload) {
        var mongo = await mongoService({});
        var dataBase = mongo.mongodb;
        const clusterDataDB= dataBase.db('one_connect').collection('Cluster');        
        const receivedData = await clusterDataDB.find({'clusterCode':payload});
        commit('SET_SELECTED',receivedData);
    }
    
}
