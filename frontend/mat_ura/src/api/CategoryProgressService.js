import urls from "./apiInfo.json"
import { useNavigate } from "react-router-dom";

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

function patchRequestOptions(){
    return {
        method: 'PATCH',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': "Bearer " + ctoken
        }
    }
}

export async function getCategoryProgress(token, categoryName){
    const res = await fetch(urls.urls.backendURL + "/userprogress/" + categoryName, getRequestOptions(token));
    const progress = await res.json();
    return progress;
}

export async function getUserProgress(token){
    return fetch(urls.urls.backendURL + "/userprogress/", getRequestOptions(token)).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.log("lmao")
    });
}

export async function patchTaskAsDone(token, categoryName, idx){
    const res = await fetch(urls.urls.backendURL + "/userprogress/" + categoryName + "/" + idx, patchRequestOptions(token));
}