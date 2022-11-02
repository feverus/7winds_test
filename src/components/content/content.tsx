import { useEffect } from 'react'


import dataStore from '../../store/dataStore'
import { Level } from "../level";
import useContent from "./content.service";
import C from './content.module.scss'

import ReactDataSheet from 'react-datasheet';
import { PropsSheetRenderer, PropsRowRenderer, PropsChanges, PropsCellRenderer, GridElement } from './content.props';
import {CellRenderer} from '../cellRenderer/';

export function Content() {
	const [state, api] = useContent()
  
	const sheetRenderer = (props: PropsSheetRenderer) => {
		return(
			<div className={C.table}>
				<div className={C.tableHead}>
					{dataStore.columns.map((col, id) => (
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
			<Level 
				row={cell.row as number}
				value={cell.value as number}
				haveChild={!!dataStore.table[cell.row as number].haveChild} 
				lastChild={!!dataStore.table[cell.row as number].lastChild} 
				showBranch={!!dataStore.table[cell.row as number].showBranch} 
				editedRow={state.editedRow} 
				createRow={api.createRow}
				deleteRow={api.deleteRow} />:
			cell.value	
		return result		
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
				valueRenderer={(cell) => cell.value}
				valueViewer={(cell: GridElement) => valueViewer(cell)}

				sheetRenderer={(props: PropsSheetRenderer)=>sheetRenderer(props)}
				rowRenderer={(props: PropsRowRenderer)=>rowRenderer(props)}
				cellRenderer={(props: PropsCellRenderer)=>CellRenderer(props, state, api)}
			/>
		</div>
	)
}
