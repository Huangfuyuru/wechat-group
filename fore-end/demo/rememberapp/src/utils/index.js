import queryString from 'query-string'
let rootUrl = 'http://148.70.223.218:3003'

let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryParams){
            url += '?'+queryString.stringify(queryParams)
        }
        // console.log(url)
        return fetch(url)
                .then(res=>res.json())
            // res.json() 如果没加{} 就代表了返回，加了就得写return
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
            .then(res=>res.json())
    },
    uploadImage(params){
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            formData.append('params', params);
            fetch('http://148.70.223.218:3001/img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity'
                },
                
                body:JSON.stringify(formData),
            }).then((res) => res.json())
            .then((res)=> {
                resolve(res);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
        
        });
    },
    uploadImages(params){
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            formData.append('params', params);
            fetch('http://148.70.223.218:3001/imgs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity'
                },
                
                body:JSON.stringify(formData),
            }).then((res) => res.json())
            .then((res)=> {
                resolve(res);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
        
        })
    }
}

export {myFetch};