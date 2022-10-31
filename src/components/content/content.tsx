import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import { NavBarList } from "../navBarList";
import useContent from "./content.service";
import C from './content.module.css'
import { ReactSVG } from 'react-svg'
import ReactDataSheet from 'react-datasheet';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

type PropsSheetRenderer = { className: string; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }

type PropsRowRenderer = { row: any; children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }

type PropsCellRenderer = { children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }

export function Content() {
	const [state] = useContent()

	const sheetRenderer = (props: PropsSheetRenderer) => {
		return(
			<div className={C.table}>
				<div className={C.tableHead}>
					{state.columns.map(col => (
						<div className={C.tableCell}>
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
	const cellRenderer = (props: PropsCellRenderer) => {
		return (
			<div className={C.tableCell}>
				{props.children}
			</div>
		)		
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
				valueRenderer={(cell, i, j) => cell.value}
				dataRenderer={(cell, i, j) => cell.value + ' ***'}

				sheetRenderer={(props: PropsSheetRenderer)=>sheetRenderer(props)}
				rowRenderer={(props: PropsRowRenderer)=>rowRenderer(props)}
				cellRenderer={(props: PropsCellRenderer)=>cellRenderer(props)}
			/>
		</div>
	)
}