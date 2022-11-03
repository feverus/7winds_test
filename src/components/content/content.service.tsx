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

    useEffect(() => {
        getApi()
        .then(result => {
            if (typeof result!=='string') {
                //если таблица пуста, откроем режим создания новой строки 1 уровня
                if (result.length===0) {
                    findedEmptyTable()            
                } else {
                    dataStore.setTable(result)                    
                    init(dataStore.table, 0)
                    getGrid(dataStore.table)
                }
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
                    dataStore.updateTable(result.changed.concat(result.current), editedRow);
                    getGrid(dataStore.table)
                }
                else console.error('Ошибка получения данных от сервера: '+result)
            })            
            changeEditMode(undefined)
            setNeedSave(false)
        }
    }, [needSave]) 

    const findPlaceToInsert = (row:number):number => {
        let result = dataStore.table.length

        for (let i = dataStore.table.length-1; i > row; i--) {
            if (dataStore.table[i].level===0) result = i           
            if (dataStore.table[i].level===1) result = i
        }

        return result
    }
    
    const findedEmptyTable = () => {
        dataStore.setTable([{...dataStore.emptyEditedData, level:0}])
        getGrid(dataStore.table) 
        changeEditMode(0)  
    }

    const getGrid = (rawData:Array<I.Row>) => {
        console.log('getGrid')

        let row:GridElement[] = []      
        let newTable:Array<I.Row> = []
        let readyData:GridElement[][] = []
        let temp:I.Row
        let last = rawData.length-1

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

            //пересчитываем свойства главной таблицы для отображения дерева
            temp = JSON.parse(JSON.stringify(json))
            temp.haveChild = false
            temp.lastChild = false
            temp.showBranch = true

            console.log(num+' '+last+' ')
            console.log(rawData)

            if (num<last) {
                if ((json.level as number) < (rawData[num+1].level as number))
                    temp.haveChild = true
                    
                if ((json.level as number) > (rawData[num+1].level as number))
                    temp.lastChild = true                               
            } else {
                temp.lastChild = true
                temp.showBranch = false
            }
            newTable.push(temp)
        })
        
        let deleteBranch = true
        newTable.reverse()
        newTable.forEach(row => {
            if (deleteBranch) row.showBranch = false
            if (row.level == 0) deleteBranch = true
            if (row.level == 1) deleteBranch = false
        })
        newTable.reverse()

        setData(readyData) 
        dataStore.setTable(newTable)     
    }
   

    const init = (rawData:Array<I.Row>, level:number, parentId:number|null = null) => { 
        rawData.forEach((json, num) => {            
            //рекурсивно добавляем свойства потомков
            if (json.child && json.child.length>0) {
                newTable.push({...json, "parentId": parentId, "child": [], "level": level})
                init(json.child, level+1, json.id)                
            } else {
                newTable.push({...json, "parentId": parentId, "child": [], "level": level})
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



    const createRow = (row: number, level: number) => {
        if (editedRow!==undefined) return

        console.log('createRow')
        console.log(dataStore.table)

        let parentId:number|null = (level===dataStore.table[row].level)?
            dataStore.table[row].parentId as number|null:
            dataStore.table[row].id

        let newRow:number = 0
        switch (level) {
            case 0:
                newRow = row
                break;        
            case 1:
                newRow = findPlaceToInsert(row)
                break;        
            case 2:
                newRow = row+1
                break;        
            default:
                break;
        }

        dataStore.addInTable(newRow, parentId, level)
        getGrid(dataStore.table)
        changeEditMode(newRow)
    }

    const deleteRow = (row: number) => {
        if (editedRow!==undefined) return

        deleteApi(((dataStore.table[row].id) as number).toString())
        .then((result: string | ApiResponse) => {
            console.log(result)
            if (typeof result!=='string') {
                console.log('Успешно');
                dataStore.deleteFromTable(row)        
                
                if (dataStore.table.length===0) findedEmptyTable() 
                else getGrid(dataStore.table)
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