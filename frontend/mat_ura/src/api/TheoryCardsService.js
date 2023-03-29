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

function postRequestOptions(token, object){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(object)
    }
}

function putRequestOptions(token, object){
    return {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify(object)
    }
}

export async function getTheoryCard(token, id){
    const res = await fetch(urls.urls.backendURL + "/theory-cards/" + id, getRequestOptions(token));
    const task = await res.json();
    return task;
}

export async function getTheoryCards(token){
    const res = await fetch(urls.urls.backendURL + "/theory-cards/", getRequestOptions(token));
    const tcs = await res.json();
    return tcs;
}

export async function addTheoryCard(token, object){
    await fetch(urls.urls.backendURL + '/theory-cards/', postRequestOptions(token, object));
}


export async function deleteTheoryCard(token, id){
    await fetch(urls.urls.backendURL + '/theory-cards/' + id, deleteRequestOptions(token));
}

export async function editTheoryCard(token, object, id){
    await fetch(urls.urls.backendURL + '/theory-cards/' + id, putRequestOptions(token, object));
}