import {makeAutoObservable, observable, action, autorun} from 'mobx';
import * as I from './storeInterfaces'

export class DataStore {
    table:Array<I.Row> = []

    constructor() {
        makeAutoObservable(this, {
            table: observable,
            setTable: action,
            findAndUpdate: action,
            updateTable: action
        })
    }
    
    setTable(newTable:Array<I.Row>) {
        this.table = newTable
    }

    findAndUpdate(item:I.Row) {
        let finded = false

        this.table.forEach((element, num) => {
            if (!finded) {
                if (element.id==item.id) {
                    this.table[num] = item 
                    finded = true
                }     
            }
        });
    }

    updateTable(updatedItems:Array<I.Row>) {
        updatedItems.forEach(item => {
            this.findAndUpdate(item)
        });
    }
}

const dataStore = new DataStore()
export default dataStore