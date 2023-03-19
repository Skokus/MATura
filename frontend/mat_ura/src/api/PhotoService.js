const ctoken = JSON.parse(localStorage.getItem("token"));

function getRequestOptions(){
    return {
        method: 'GET',
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
            'Authorization': "Bearer " + ctoken
        },
        body: object
    }
}

export async function getPhoto(id){
    const res = await fetch("http://localhost:8080/api/photos/" + id, getRequestOptions());
    const photo = await res.json();
    return photo;
}

export async function postPhoto(file){
    const res = await fetch("http://localhost:8080/api/photos/", postRequestOptions(file));
    const photo = await res.json();
    return photo;
}