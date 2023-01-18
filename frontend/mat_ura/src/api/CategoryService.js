import urls from "./apiInfo.json"

const ctoken = JSON.parse(localStorage.getItem("token"));

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

export async function getCategory(categoryName){
    const res = await fetch(urls.urls.backendURL + '/categories/' + categoryName, getRequestOptions());
    const category = await res.json();
    return category;
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

export async function deleteTaskFromCategory(categoryName, id){
    await fetch(urls.urls.backendURL + '/categories/' + categoryName + '/' + id, deleteRequestOptions());
}