import {observer, inject} from "mobx-react";
import dataStore from '../../store/dataStore'
import { PropsSheetRenderer, PropsRowRenderer, PropsChanges, PropsCellRenderer, GridElement, RowProps, StateType, ApiType} from '../content/';
import useLevel from './level.service'
import { DrawPict } from "../drawPict";
import C from './level.module.scss'

type P = {
	value:number,
	haveChild: boolean,
	lastChild: boolean,
	editedRow?: number,
}

export type D = P & {name:string, withoutBranch?:boolean}

export function Level({value, haveChild, lastChild, editedRow}:P) {
	const [state, api] = useLevel()

	let content = <></>

	if (state.showMenu) {
		content = <div className={C.menu}>
			{state.iconsNames.map(
				(name, num) => num>=value && 
					<DrawPict 
						name={state.iconsNames[num]} 
						value={num} 
						haveChild={(value==num) ? haveChild : false} 
						lastChild={(value===num) ? lastChild : true} 
						withoutBranch={(value===num) ? false : true} />
			)}
		</div>

	} else {
		content = <DrawPict name={state.iconsNames[value]} value={value} haveChild={haveChild} lastChild={lastChild} />
	}

	return (
		<div
			className={C.body}
			onMouseEnter={()=>api.toggleMenu(editedRow, true)}
			onMouseLeave={()=>api.toggleMenu(editedRow, false)}>
			{content}
		</div>
	)
}