export default async function (ref: Ref, fn: Function) {
    try {
        ref.value = true
        await fn()
    } finally {
        ref.value = false
    }
}