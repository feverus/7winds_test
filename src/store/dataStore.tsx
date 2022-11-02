import {makeAutoObservable, observable, action, autorun} from 'mobx';
import * as I from './storeInterfaces'

export class DataStore {
    table:Array<I.Row> = []

    emptyEditedData:I.Row = {
        "id": null,
        "rowName": "",
        "total": 0,
        "salary": 0,
        "mimExploitation": 0,
        "machineOperatorSalary": 0,
        "materials": 0,
        "mainCosts": 0,
        "supportCosts": 0,
        "equipmentCosts": 0,
        "overheads": 0,
        "estimatedProfit": 0,
    };

    columns: Array<{
        label: string;
    }> = [
        { label: 'Уровень'},
        { label: 'Наименование работ'},
        { label: 'Основная з/п'},
        { label: 'Оборудование'},
        { label: 'Накладные расходы'},
        { label: 'Сметная прибыль'},
    ]
    
    constructor() {
        makeAutoObservable(this, {
            emptyEditedData: observable,
            columns: observable,
            table: observable,
            setTable: action,
            findAndUpdate: action,
            updateTable: action,
            addInTable: action,
            deleteFromTable: action,
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
                    this.table[num] = {...item,
                        id: this.table[num].id,
                        haveChild: this.table[num].haveChild,
                        lastChild: this.table[num].lastChild,
                        parentId: this.table[num].parentId,
                        level: this.table[num].level,
                    }
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

    addInTable(row:number, parentId: number | null, level: number) {
        this.table.splice(row, 0, {
            ...this.emptyEditedData,
            id: null,
            haveChild: false,
            lastChild: (level==0) ? false : this.table[row-1].lastChild,
            parentId: parentId,
            level:level,
        })
    }

    deleteFromTable(row:number) {
        this.table.splice(row, 1)
    }
}

const dataStore = new DataStore()
export default dataStore