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

function patchRequestOptions(token){
    return {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        }
    }
}

export async function getCategoryProgress(token, categoryName){
    const res = await fetch(urls.urls.backendURL + "/userprogress/" + categoryName, getRequestOptions(token));
    const progress = await res.json();
    return progress;
}

export async function patchTaskAsDone(token, categoryName, idx){
    const res = await fetch(urls.urls.backendURL + "/userprogress/" + categoryName + "/" + idx, patchRequestOptions(token));
}