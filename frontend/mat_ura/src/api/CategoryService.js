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
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }
}

export async function getCategory(token, categoryName){
    const res = await fetch(urls.urls.backendURL + '/categories/' + categoryName, getRequestOptions(token));
    const category = await res.json();
    return category;
}

export async function getCategories(token){
    const res = await fetch(urls.urls.backendURL + '/categories', getRequestOptions(token));
    const categories = await res.json();
    return categories;
}

export async function addCategory(token, object){
    await fetch(urls.urls.backendURL + '/categories', postRequestOptions(token, object));
}

export async function addTaskToCategory(token, categoryName, object){
    await fetch(urls.urls.backendURL + '/categories/' + categoryName + '/' + object.id, postRequestOptions(token, object));
}

export async function deleteCategory(token, id){
    await fetch(urls.urls.backendURL + '/categories/' + id, deleteRequestOptions(token));
}

export async function deleteTaskFromCategory(token, categoryName, id){
    await fetch(urls.urls.backendURL + '/categories/' + categoryName + '/' + id, deleteRequestOptions(token));
}