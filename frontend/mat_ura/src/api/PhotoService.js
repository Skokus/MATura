function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

export async function getPhoto(id){
    const res = await fetch("http://localhost:8080/api/photos/" + id, getRequestOptions());
    const photo = await res.json();
    return photo;
}