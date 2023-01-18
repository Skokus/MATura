import urls from "./apiInfo.json"

const ctoken = JSON.parse(localStorage.getItem("token"));

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken
        }
    }
}

function deleteRequestOptions(){
    return {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken
        }
    }
}

function postRequestOptions(data){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

function putRequestOptions(data){
    return {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

export async function getTips(){
    const res = await fetch(urls.urls.backendURL + "/tips/", getRequestOptions());
    const tips = await res.json();
    return tips;
}

export async function getTipById(id){
    const res = await fetch(urls.urls.backendURL + "/tips/" + id, getRequestOptions());
    const tip = await res.json();
    return tip;
}

export async function addTip(object){
    await fetch(urls.urls.backendURL + '/tips', postRequestOptions(object));
}

export async function editTip(object, id){
    await fetch(urls.urls.backendURL + '/tips/' + id, putRequestOptions(object));
}

export async function deleteTip(id){
    await fetch(urls.urls.backendURL + '/tips/' + id, deleteRequestOptions());
}