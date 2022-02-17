// import Cookies from 'js-cookie';
// import axios from 'axios';
// import * as Realm from 'realm-web';
// const token = Cookies.get('id_token');
// const baseDomain = 'http://45.76.97.89:3000';
// const graphqlURL = "https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/OneConnect-vomwl/graphql";


// const APP_ID = 'OneConnect-vomwl';
// const app = new Realm.App({ id: APP_ID });
// const credentials = Realm.Credentials.anonymous();
// let mongodb = null;
// let user = null;
// export const customHeaders = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
// };
// export const baseUrl = `${baseDomain}`;
// export const graphqlUrl = graphqlURL;
// export const appUrl =
// {
//      liveBaseUrl : 'https://fcniclj1eb.execute-api.ap-south-1.amazonaws.com'
// } 
// export default axios.create({
//     baseUrl,
//     headers: customHeaders
// });

// async function init(){
//     try {
//         user = await app.logIn(credentials);
//         mongodb = app.currentUser.mongoClient('mongodb-atlas');
//     } catch (err) {
//         console.error('Failed to log in', err);
//     }
// }

// export const mongoService = async service => {
//     if(mongodb == null || user == null){
//         await init();
//     }
//     return { mongodb: mongodb, user: user };
// }
// export const serializeQuery = query => {
//     return Object.keys(query)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
//         .join('&');
// };









import Cookies from 'js-cookie';
import axios from 'axios';
import * as Realm from 'realm-web';


// const token = Cookies.get('id_token');
const token = Cookies.get('accessToken');
// const baseDomain = 'http://45.76.97.89:3000';
const baseDomain = 'https://dev-services.happimobiles.com/';
const APP_ID = 'application-0-lgxvg';

const app = new Realm.App({ id: APP_ID });
const credentials = Realm.Credentials.anonymous();
let mongodb = null;

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders
});

// export const mongoService = async service => {
//     try {
//         const user = await app.logIn(credentials);
//         mongodb = app.currentUser.mongoClient('mongodb-atlas');

//     } catch (err) {
//         console.error('Failed to log in', err);
//     }
//     return mongodb;
// }

export const mongoService = async service => {
    var user;
    try {
        user = await app.logIn(credentials);
        mongodb = app.currentUser.mongoClient('mongodb-atlas');

    } catch (err) {
        console.error('Failed to log in', err);
    }
    return { mongodb: mongodb, user: user };
}

export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};