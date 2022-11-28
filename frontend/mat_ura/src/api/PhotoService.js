function getRequestOptions(){
    return {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

export async function getPhoto(){
    const res = await fetch("http://localhost:8080/api/photos/6384fcf26ea4715cbba7728e", getRequestOptions());
    const photo = await res.json();
    return photo;
}