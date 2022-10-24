import urls from "./apiInfo.json";

function postRequestOptions(data){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

export async function sendLogin(username, password){
    let data = {username: username, password: password};
    const res = await fetch(urls.urls.loginURL, postRequestOptions(data));
    const token = await res.json();
    return token;
}

export async function sendRegister(username, email, password){
    let data = {username: username, email: email, password: password};
    await fetch(urls.urls.backendURL + urls.endpoints.registerEndPoint, postRequestOptions(data));
}