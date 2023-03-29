const ctoken = JSON.parse(localStorage.getItem("token"));

function getRequestOptions(token){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

function postRequestOptions(token, object){
    return {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + token
        },
        body: object
    }
}

export async function getPhoto(token, id){
    const res = await fetch("http://localhost:8080/api/photos/" + id, getRequestOptions(token));
    const photo = await res.json();
    return photo;
}

export async function postPhoto(token, file){
    const res = await fetch("http://localhost:8080/api/photos/", postRequestOptions(token, file));
    const photo = await res.json();
    return photo;
}