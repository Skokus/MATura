import urls from "./apiInfo.json"

function postRequestOptions(data){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*'
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