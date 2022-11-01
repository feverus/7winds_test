import { PropsSheetRenderer, PropsRowRenderer, PropsChanges, PropsCellRenderer, GridElement, RowProps, StateType, ApiType } from './content.props';
import C from './content.module.scss'
import { useState, useEffect, SetStateAction } from 'react'

export default function CellRenderer(props: PropsCellRenderer, state: StateType, api: ApiType) {
 
    const inputType = (props.col == 1) ?
        'text' :
        'number';

    const fieldsNames = ["level",
        "rowName",
        "salary",
        "equipmentCosts",
        "overheads",
        "estimatedProfit"]

    const fieldName = fieldsNames[props.col]
    
    let [value, setValue] = useState(state.editedData[fieldName as keyof typeof state.editedData] as string|number)

    const handleKeyDown = (code: string) => {
        if (code=='Enter' || code=='NumpadEnter') {
            api.saveEditedData(fieldName, value)
        }
        if (code=='Escape') api.changeEditMode(undefined)
    }

    const handleChange = (value: string | number) => {
        if (inputType==='text') setValue(value)
        else setValue(Math.round(value as number))
       
    }

    if ((state.editedRow == props.row) && (props.col !== 0)) {
        return (
            <div
                key={'div-'+props.col+'-'+props.row}
                className={C.tableCell}>
                <input 
                    key={'input-'+props.col+'-'+props.row}
                    type={inputType}
                    value={value}
                    onChange={(e)=>handleChange(e.target.value)}
                    onBlur={(e)=>api.updateEditedData(fieldName, value, false)}
                    onKeyDown={(e)=>handleKeyDown(e.code)}
                ></input>
            </div>
        );
    } else {
        return (
            <div
                key={'div-'+props.col+'-'+props.row}
                className={C.tableCell}
                onDoubleClick={() => (api.changeEditMode(props.row))}>
                {props.children}
            </div>
        );
    }
}