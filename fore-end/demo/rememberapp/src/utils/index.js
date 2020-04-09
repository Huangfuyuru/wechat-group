import queryString from 'query-string'
let rootUrl = 'https://www.fastmock.site/mock/c7eb066fb1ff5e6f9cce7f8f6489b17a/api'

let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryParams){
            url += '?'+queryString.stringify(queryParams)
        }
        console.log(url)
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
    }
}

export {myFetch};