import urls from "./apiInfo.json"

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
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