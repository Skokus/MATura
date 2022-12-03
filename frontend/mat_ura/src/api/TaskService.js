import urls from "./apiInfo.json"

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}


export async function getTask(id){
    const res = await fetch(urls.urls.backendURL + "/tasks/" + id, getRequestOptions());
    const task = await res.json();
    return task;
}