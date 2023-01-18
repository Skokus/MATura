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

export async function addTask(object){
    await fetch(urls.urls.backendURL + "/tasks/", postRequestOptions(object));
}

export async function getTask(id){
    const res = await fetch(urls.urls.backendURL + "/tasks/" + id, getRequestOptions());
    const task = await res.json();
    return task;
}

export async function getAllTasks(){
    const res = await fetch(urls.urls.backendURL + "/tasks/", getRequestOptions());
    const task = await res.json();
    return task;
}