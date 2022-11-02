import { useState, useEffect } from 'react'
import * as I from '../../store/storeInterfaces'
import dataStore from '../../store/dataStore'
import {getApi} from '../../api/getApi'
import {uploadApi} from '../../api/uploadApi'
import {deleteApi} from '../../api/deleteApi'
import { UseContent, GridElement, ApiResponse } from './content.props'

const useContent:UseContent = () => {    

    const [data, setData] = useState<GridElement[][]>([])
    const [editedRow, setEditedRow] = useState<number|undefined>(undefined)
    const [editedData, setEditedData] = useState<I.Row>(dataStore.emptyEditedData)
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
                console.log(result)
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
                init(json.child, level+1, json.child.length, json.id)                
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
        setEditedData(dataStore.emptyEditedData)
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

    const findPlaceToInsert = (row:number, level:number):number => {
        let seek2:boolean = false
        if (level == 1) seek2 = true

        let result = dataStore.table.length

        for (let i = dataStore.table.length-1; i > row+1; i--) {
            if (dataStore.table[i].level===0) result = i           
            if (seek2)
                if (dataStore.table[i].level===1) result = i
        }

        return result
    }

    const createRow = (row: number, level: number) => {
        if (editedRow!==undefined) return

        console.log('createRow')
        console.log(dataStore.table)

        let parentId:number|null = (level===dataStore.table[row].level)?
            dataStore.table[row].parentId as number|null:
            dataStore.table[row].id

        const newRow = (level===2)? row+1 :findPlaceToInsert(row, level)
        console.log(newRow)
        console.log('parentId')
        console.log(parentId)

        dataStore.addInTable(newRow, parentId, level)
        getGrid(dataStore.table, 0, dataStore.table.length)
        changeEditMode(newRow)
        console.log(editedData)
    }

    const deleteRow = (row: number) => {
        if (editedRow!==undefined) return
        dataStore.deleteFromTable(row)        
        getGrid(dataStore.table, 0, dataStore.table.length)

        deleteApi(((dataStore.table[row].id) as number).toString())
        .then((result: string | ApiResponse) => {
            console.log(result)
            if (typeof result!=='string') {                    
                dataStore.updateTable(result.changed);
                getGrid(dataStore.table, 0, dataStore.table.length)
            }
            else console.error('Ошибка получения данных от сервера: '+result)
        })
    }   

    const state = {
        grid: data,
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
        deleteRow:deleteRow,
        createRow:createRow,
    }

    return (
        [state, api]
    )
}
export default useContent