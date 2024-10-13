import FirebseService from "~/services/firebaseService"

export default function () {

    return {
        add: FirebseService.addData,
        set: FirebseService.setData,
        get: FirebseService.getData,
        getAll: FirebseService.getAllData,
        delete: FirebseService.deleteData,
        update: FirebseService.updateData,
        query: FirebseService.query,
    }
}