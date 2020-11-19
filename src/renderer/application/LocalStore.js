
export class LocalStore{

    /**数组类型才适用 */
    static getLocalStoreArr(key){
        const options = localStorage.getItem(key);
        let parseOption = options?JSON.parse(options):[];
        return parseOption
    }
    /**数组类型才适用 */
    static setLocalStoreArr(key,parseOption){
        const apiStr = JSON.stringify(parseOption);
        localStorage.setItem(
            key,
            apiStr
        );
    }
}