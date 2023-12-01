class remoteStorage {

    storage = {}

    constructor() {
        this.storage = {};
    }

    static getItem(key: string) {
        return null
    }

    static setItem(key: string, arg1: string) {
        throw new Error('Method not implemented.');
    }
}