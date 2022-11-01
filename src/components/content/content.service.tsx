import { useState, useEffect } from 'react'
import * as I from '../../store/storeInterfaces'
import dataStore from '../../store/dataStore'
import {getApi} from '../../api/getApi'
import {uploadApi} from '../../api/uploadApi'
import { UseContent, GridElement, RowProps, ApiResponse } from './content.props'

const useContent:UseContent = () => {    
    const emptyEditedData = {
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
        "estimatedProfit": 0}

    const columns = [
        { label: 'Уровень'},
        { label: 'Наименование работ'},
        { label: 'Основная з/п'},
        { label: 'Оборудование'},
        { label: 'Накладные расходы'},
        { label: 'Сметная прибыль'},
    ]

    const [data, setData] = useState<GridElement[][]>([])
    const [editedRow, setEditedRow] = useState<number|undefined>(undefined)
    const [editedData, setEditedData] = useState<I.Row>(emptyEditedData)
    const [needSave, setNeedSave] = useState<boolean>(false)

    let newTable:Array<I.Row> = []
    let readyData:GridElement[][] = []

    useEffect(() => {
        getApi()
        .then(result => {
            if (typeof result!=='string') {
                dataStore.setTable(result);
                init(dataStore.table, 0, dataStore.table.length)
                getGrid(dataStore.table, 0, dataStore.table.length)
            }
            else console.error('Ошибка получения данных от сервера: '+result)
        }) 
    }, [])

    useEffect(() => {
        if (needSave) {
            let id = (dataStore.table[editedRow as number].id === null)?
                'null':
                (dataStore.table[editedRow as number].id as number).toString()   

            uploadApi(editedData, id)
            .then((result: string | ApiResponse) => {
                if (typeof result!=='string') {
                    dataStore.updateTable(result.changed.concat(result.current));
                    getGrid(dataStore.table, 0, dataStore.table.length)
                }
                else console.error('Ошибка получения данных от сервера: '+result)
            })            
            changeEditMode(undefined)
            setNeedSave(false)
        }
    }, [needSave]) 

    const getGrid = (rawData:Array<I.Row>, level:number, childsCount:number) => {
        let row:GridElement[] = []      

        rawData.forEach((json, num) => {
            row = []
            if (json.level===undefined) row.push({"value": 0})
            else row.push({"value": json.level})
            row.push({"value": json.rowName})
            row.push({"value": json.salary})
            row.push({"value": json.equipmentCosts})
            row.push({"value": json.overheads})
            row.push({"value": json.estimatedProfit})
            readyData.push(row)
        })

        setData(readyData)      
    }

    const init = (rawData:Array<I.Row>, level:number, childsCount:number, parentId:number|null = null) => { 
        
        rawData.forEach((json, num) => {
            let lastChild = (num<childsCount-1)?
                false:
                true
            
            //рекурсивно добавляем свойства потомков
            if (json.child && json.child.length>0) {
                newTable.push({...json, "haveChild": true, "lastChild": lastChild, "parentId": parentId, "child": [], "level": level})
                init(json.child, level+1, json.child.length)                
            } else {
                newTable.push({...json, "haveChild": false, "lastChild": lastChild, "parentId": parentId, "child": [], "level": level})
            }   
        })

        dataStore.setTable(newTable)                
    }

    const changeEditMode = (num: number|undefined) => {
        if (num==editedRow) setEditedRow(undefined);
        else setEditedRow(num)

        if (num!==undefined) {
            let clone = JSON.parse(JSON.stringify(dataStore.table[num]))
            clone.child = undefined
            setEditedData(clone)
        }
    }

    const clearEditedData = () => {
        setEditedData(emptyEditedData)
    }

    const updateEditedData = (field: string, value: string|number, needSave: boolean) => {
        let clone = JSON.parse(JSON.stringify(editedData))
        clone[field] = value
        setEditedData(clone)
        setNeedSave(needSave)
    }  

    const saveEditedData = (field: string, value: string|number) => {    
        updateEditedData(field, value, true)
    }

    const state = {
        grid: data,
        columns: columns,
        editedRow: editedRow,
        editedData: editedData
    }

    const api = {
        getGrid:getGrid,
        init:init,
        changeEditMode: changeEditMode,
        clearEditedData: clearEditedData,
        updateEditedData: updateEditedData,
        saveEditedData: saveEditedData,
    }

    return (
        [state, api]
    )
}
export default useContent