export async function postData(url, data){
    const response = await fetch(url, {
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    return response.json();
}

export async function getData(url){
    const response = await fetch(url, {
        method:'GET',
        credentials:"include"
    });
    return response.json();
}