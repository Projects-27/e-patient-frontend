

export const IsOnline = ()=>{
    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem("user")){
            const data =  JSON.parse(sessionStorage.getItem("user"))
            resolve(data)
        }else{
            reject(null)
            window.location.assign("/")
        }
    })
}

export const LogOut = ()=>{
    return new Promise((resolve, reject) => {
        sessionStorage.removeItem('user')
      window.location.assign('/')
    })
}