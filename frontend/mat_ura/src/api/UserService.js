import urls from "./apiInfo.json";

function postRequestOptions(data){
    return {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

function postRequestOptionsWithToken(token, data){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

function getRequestOptionsWithToken(token){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        }
    }
}

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

export async function sendLogin(username, password){
    let data = {username: username, password: password};
    const res = await fetch(urls.urls.loginURL, postRequestOptions(data));
    return res;
}

export async function sendRegister(username, email, password){
    let data = {username: username, email: email, password: password};
    await fetch(urls.urls.backendURL + urls.endpoints.registerEndPoint, postRequestOptions(data));
}

export async function createUser(token, data){
    await fetch(urls.urls.backendURL + "/user", postRequestOptionsWithToken(token, data));
}

export async function getUserWithToken(token){
    const res = await fetch(urls.urls.backendURL + "/user/token", getRequestOptionsWithToken(token));
    const user = await res.json();
    return user;
}

export async function getUsers(token){
    const res = await fetch(urls.urls.backendURL + "/user/", getRequestOptionsWithToken(token));
    const users = await res.json();
    return users;
}

export async function checkUsername(username){
    const res = await fetch(urls.urls.backendURL + "/user/checkUserStatus?username=" + username, getRequestOptions());
    const isReal = await res.json();
    return isReal;
}

export async function checkEmail(email){
    const res = await fetch(urls.urls.backendURL + "/user/checkUserStatus?email=" + email, getRequestOptions());
    const isReal = await res.json();
    return isReal;
}

export async function confirmNewAccount(token){
    const res = await fetch(urls.urls.backendURL + "/user/confirm?token=" + token, getRequestOptions());
    const r = await res.json();
    return r;
}