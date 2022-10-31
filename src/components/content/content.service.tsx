import { useState, useEffect } from 'react'
import ReactDataSheet from 'react-datasheet';
import * as I from '../../store/storeInterfaces'
import mock from './mock';


export interface GridElement extends ReactDataSheet.Cell<GridElement, number|string> {
    value: number|string;
    col?:number;
    row?:number;
}

export type RowProps = Array<{
    haveChild: boolean,
    lastChild:boolean
}>

export type UseContent = () => [
    state: {
        grid:GridElement[][];
        columns:Array<{label: string}>;
        rowsProps:RowProps
    },
]

const useContent:UseContent = () => {     
    let readyData:GridElement[][] = []
    let rowsProps:RowProps = []

    const columns = [
        { label: 'Уровень'},
        { label: 'Наименование работ'},
        { label: 'Основная з/п'},
        { label: 'Оборудование'},
        { label: 'Накладные расходы'},
        { label: 'Сметная прибыль'},
    ]

    const rawData = mock

    function getGrid(rawData:Array<I.Row>, level:number, childsCount:number) {
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
                rowsProps.push({"haveChild": true, "lastChild": lastChild})
                getGrid(json.child, level+1, json.child.length)                
            } else {
                rowsProps.push({"haveChild": false, "lastChild": lastChild})
            }
            
        })
    }

    getGrid(rawData, 0, rawData.length)

    const state ={
        grid: readyData,
        columns:columns,
        rowsProps:rowsProps
    }
    return (
        [state]
    )
}
export default useContent