import urls from "./apiInfo.json"

function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
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
