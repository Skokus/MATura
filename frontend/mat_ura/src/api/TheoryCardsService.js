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

function postRequestOptions(object){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken
        },
        body: object
    }
}

function putRequestOptions(object){
    return {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + ctoken
        },
        body: JSON.stringify(object)
    }
}

export async function getTheoryCard(id){
    const res = await fetch(urls.urls.backendURL + "/theory-cards/" + id, getRequestOptions());
    const task = await res.json();
    return task;
}

export async function getTheoryCards(){
    const res = await fetch(urls.urls.backendURL + "/theory-cards/", getRequestOptions());
    const tcs = await res.json();
    return tcs;
}

export async function addTheoryCard(object){
    await fetch(urls.urls.backendURL + '/theory-cards/', postRequestOptions(object));
}


export async function deleteTheoryCard(id){
    await fetch(urls.urls.backendURL + '/theory-cards/' + id, deleteRequestOptions());
}

export async function editTheoryCard(object, id){
    await fetch(urls.urls.backendURL + '/theory-cards/' + id, putRequestOptions(object));
}