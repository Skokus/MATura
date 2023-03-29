import urls from "./apiInfo.json"

function getRequestOptions(token){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        }
    }
}

function deleteRequestOptions(token){
    return {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        }
    }
}

function postRequestOptions(token, data){
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

function putRequestOptions(token, data){
    return {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

export async function getTips(token){
    const res = await fetch(urls.urls.backendURL + "/tips/", getRequestOptions(token));
    const tips = await res.json();
    return tips;
}

export async function getTipById(token, id){
    const res = await fetch(urls.urls.backendURL + "/tips/" + id, getRequestOptions(token));
    const tip = await res.json();
    return tip;
}

export async function addTip(token, object){
    await fetch(urls.urls.backendURL + '/tips', postRequestOptions(token, object));
}

export async function editTip(token, object, id){
    await fetch(urls.urls.backendURL + '/tips/' + id, putRequestOptions(token, object));
}

export async function deleteTip(token, id){
    await fetch(urls.urls.backendURL + '/tips/' + id, deleteRequestOptions(token));
}