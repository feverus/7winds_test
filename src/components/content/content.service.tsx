import { useState, useEffect } from 'react'
import ReactDataSheet from 'react-datasheet';
import * as I from '../../store/storeInterfaces'
import mock from './mock';


export interface GridElement extends ReactDataSheet.Cell<GridElement, number|string> {
    value: number|string;
}

export type UseContent = () => [
    state: {
        grid:GridElement[][];
        columns:Array<{label:string}>
    },
]

const useContent:UseContent = () => {     
    let readyData:GridElement[][] = []

    const columns = [
        { label: 'Уровень'},
        { label: 'Наименование работ'},
        { label: 'Основная з/п'},
        { label: 'Оборудование'},
        { label: 'Накладные расходы'},
        { label: 'Сметная прибыль'},
    ]

    const rawData = mock

    function getGrid(rawData:Array<I.Row>, level:number) {
        let row:GridElement[] = []
        rawData.forEach((json) => {
            row = []
            row.push({"value": level})
            row.push({"value": json.rowName})
            row.push({"value": json.equipmentCosts})
            row.push({"value": json.overheads})
            row.push({"value": json.estimatedProfit})
            readyData.push(row)
            
            //рекурсивно добавляем в таблицу потомков
            if (json.child && json.child.length>0) {
                getGrid(json.child, level+1)
            }
            
        })
    }

    getGrid(rawData, 0)  

    const state ={
        grid: readyData,
        columns:columns
    }
    return (
        [state]
    )
}
export default useContent