const flashKey = '-flash'

function flash(name: string, message: string) {
    const key = name + flashKey
    if (process.client) {
        sessionStorage.setItem(key, message)
    }
}

function put(name: string, message: string) {
    if (process.client) {
        sessionStorage.setItem(name, message)
    }
}

function get(name: string) {
    if (process.client) {
        const flashMessageExists = sessionStorage.getItem(name + flashKey)

        if (flashMessageExists) {
            sessionStorage.removeItem(name + flashKey)
            return flashMessageExists
        } else {
            return sessionStorage.getItem(name)
        }
    }
    return null
}

function forget(name: string) {
    if (process.client) {
        sessionStorage.removeItem(name + flashKey)
        sessionStorage.removeItem(name)
    }
}

export default function () {
    return {
        flash,
        get,
        put,
        forget
    }
}
