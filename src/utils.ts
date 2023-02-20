export const setStorage = (key:string,value:any) => {
    if (!value) return
    if (Object.prototype.toString.call(value) == '[object Object]' || Object.prototype.toString.call(value) == '[object Array]') {
        localStorage.setItem(key, JSON.stringify(value)) 
    }else{
        localStorage.setItem(key,value)
    }
}

export const getStorage = (key: string) => {
    if (!key) return
    return JSON.parse(localStorage.getItem(key) as any)
}