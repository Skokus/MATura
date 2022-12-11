import urls from "./apiInfo.json"

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

function deleteRequestOptions(){
    return {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

function postRequestOptions(object){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }
}

export async function getCategoryNames(){
    const res = await fetch(urls.urls.backendURL + '/categories/names', getRequestOptions());
    const categories = await res.json();
    return categories;
}

export async function getNumberOfTasks(categoryName){
    const res = await fetch(urls.urls.backendURL + '/categories/' + categoryName + '/numberOfTasks', getRequestOptions());
    const numberOfTasks = await res.json();
    return numberOfTasks;
}

export async function getCategories(){
    const res = await fetch(urls.urls.backendURL + '/categories', getRequestOptions());
    const categories = await res.json();
    return categories;
}

export async function addCategory(object){
    await fetch(urls.urls.backendURL + '/categories', postRequestOptions(object));
}

export async function addTaskToCategory(categoryName, object){
    await fetch(urls.urls.backendURL + '/categories/' + categoryName + '/' + object.id, postRequestOptions(object));
}

export async function deleteCategory(id){
    await fetch(urls.urls.backendURL + '/categories/' + id, deleteRequestOptions());
}