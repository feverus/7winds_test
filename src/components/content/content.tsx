import { useEffect } from 'react'

import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import { Level } from "../level";
import useContent, { GridElement } from "./content.service";
import C from './content.module.scss'

import ReactDataSheet from 'react-datasheet';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

import mock from './mock';


type PropsSheetRenderer = { className: string; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }

type PropsRowRenderer = { row: any; children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }

type PropsCellRenderer = { row: any; col: any; cell:any;
	children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }

type PropsChanges = { cell: any; row: any; col: any; value: any; }[]





export function Content() {
	const [state, api] = useContent()

	useEffect(() => {
		api.getGrid(mock, 0, mock.length)
	}, [])

	useEffect(() => {
		console.log('обновилась переменная ')	  

	}, [state.rowsProps])
	  
	const sheetRenderer = (props: PropsSheetRenderer) => {
		return(
			<div className={C.table}>
				<div className={C.tableHead}>
					{state.columns.map((col, id) => (
						<div key={id}
							className={C.tableCell}>
							{col.label}
						</div>
					))}
				</div>
				<div className={C.tableBody}>
					{props.children}
				</div>
			</div>
		)
	}

	const rowRenderer = (props: PropsRowRenderer) => {
		return(
			<div className={C.tableRow}>
				{props.children}
			</div>
		)
	}

	const valueViewer = (cell: GridElement) => {
		const result = (cell.col===0)?
			<Level value={cell.value as number}
			haveChild={state.rowsProps[cell.row as number].haveChild} lastChild={state.rowsProps[cell.row as number].lastChild} />:
			cell.value	
		return result		
	}

	const onCellsChanged = (changes: PropsChanges) => changes.forEach(({cell, row, col, value}) => console.log("New expression :" + value))




	const cellRenderer = (props: PropsCellRenderer) => {
		console.log(props)
		
		if (state.rowsProps[props.row as number].editMode) {
			return (
				<input type="text" value= {props.cell.value}></input>
			)
		} else {
			return (
				<div className={C.tableCell} 
				onDoubleClick={()=>(api.changeEditMode(props.row))} >
					{props.children}
				</div>
			)
		}		
	}

	return (
		<div className={C.body}>
			<div className={C.head}>
				<div className={C.title}>
					Строительно-монтажные работы
				</div>
			</div>
			<ReactDataSheet
				data={state.grid}
				onCellsChanged={onCellsChanged}
				valueRenderer={(cell) => cell.value}
				valueViewer={(cell: GridElement) => valueViewer(cell)}

				sheetRenderer={(props: PropsSheetRenderer)=>sheetRenderer(props)}
				rowRenderer={(props: PropsRowRenderer)=>rowRenderer(props)}
				cellRenderer={(props: PropsCellRenderer)=>cellRenderer(props)}
			/>
		</div>
	)
}