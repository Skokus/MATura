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

function deleteRequestOptions(token){
    return {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        }
    }
}

export async function addTask(token, object){
    await fetch(urls.urls.backendURL + "/tasks/", postRequestOptions(token, object));
}

export async function getTask(token, id){
    const res = await fetch(urls.urls.backendURL + "/tasks/" + id, getRequestOptions(token));
    const task = await res.json();
    return task;
}

export async function getAllTasks(token){
    const res = await fetch(urls.urls.backendURL + "/tasks/", getRequestOptions(token));
    const task = await res.json();
    return task;
}

export async function getAllTasksIds(token){
    const res = await fetch(urls.urls.backendURL + "/tasks/getList/id", getRequestOptions(token));
    const task = await res.json();
    return task;
}

export async function getTaskOfDay(token){
    const res = await fetch(urls.urls.backendURL + "/tasks/dailyTask", getRequestOptions(token));
    const task = await res.json();
    return task;
}

export async function deleteTask(token, id){
    await fetch(urls.urls.backendURL + '/tasks/' + id, deleteRequestOptions(token));
}