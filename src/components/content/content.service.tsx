import { iteratorSymbol } from 'immer/dist/internal';
import { useState, useEffect } from 'react'
import ReactDataSheet from 'react-datasheet';
import * as I from '../../store/storeInterfaces'



export interface GridElement extends ReactDataSheet.Cell<GridElement, number|string> {
    value: number|string;
    col?:number;
    row?:number;
}

export type RowProps = Array<{
    haveChild: boolean,
    lastChild:boolean,
    editMode:boolean,
}>

export type UseContent = () => [
    state: {
        grid:GridElement[][];
        columns:Array<{label: string}>;
        rowsProps:RowProps
    },
    api: {
        getGrid:(rawData:Array<I.Row>, level:number, childsCount:number) => void;
        changeEditMode:(num:number) => void
    }
]

const useContent:UseContent = () => {    
    const [data, setData] = useState<GridElement[][]>([])
    const [props, setProps] = useState<RowProps>([])  

    let rowsProps:RowProps = []
    let readyData:GridElement[][] = []

    const columns = [
        { label: 'Уровень'},
        { label: 'Наименование работ'},
        { label: 'Основная з/п'},
        { label: 'Оборудование'},
        { label: 'Накладные расходы'},
        { label: 'Сметная прибыль'},
    ]

    const getGrid = (rawData:Array<I.Row>, level:number, childsCount:number) => {
        let row:GridElement[] = []                

        rawData.forEach((json, num) => {
            let lastChild = (num<childsCount-1)?
                false:
                true
            row = []
            row.push({"value": level})
            row.push({"value": json.rowName})
            row.push({"value": json.salary})
            row.push({"value": json.equipmentCosts})
            row.push({"value": json.overheads})
            row.push({"value": json.estimatedProfit})
            readyData.push(row)
            
            //рекурсивно добавляем в таблицу потомков
            if (json.child && json.child.length>0) {
                rowsProps.push({"haveChild": true, "lastChild": lastChild, "editMode": false})
                getGrid(json.child, level+1, json.child.length)                
            } else {
                rowsProps.push({"haveChild": false, "lastChild": lastChild, "editMode": false})
            }            
        })

        setData(readyData)
        setProps(rowsProps)
    }

    const changeEditMode = (num: number) => {
        const newProps = props.map((item, id) => {
            if (id==num) item.editMode = !item.editMode;else item.editMode = false
            return item
        })
        setProps(newProps)
    }

    

    const state = {
        grid: data,
        columns: columns,
        rowsProps: props
    }

    const api = {
        getGrid:getGrid,
        changeEditMode: changeEditMode,
    }

    return (
        [state, api]
    )
}
export default useContent