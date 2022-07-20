export const StorageService = {
    load,
    save,
    clear

}

function load(key) {
    try {

    const str = localStorage.getItem(key)
    return JSON.parse(str)
    }catch (e){
        return {}
    }
}

function save(key, val) {
    try {
        const str = JSON.stringify(val)
        localStorage.setItem(key, str)
    }catch (e) {
       return
    }

}
function clear() {
    sessionStorage.clear();
}

