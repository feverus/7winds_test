import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import { ReactSVG } from 'react-svg'
import C from './level.module.css'

type P = {
	value:number,
	haveChild: boolean,
	lastChild: boolean,
}

type D = P & {name:string}

function DrawPict({name, value, haveChild, lastChild}:D ) {
	let style:string = ""
	switch (value) {		
		case 0:
			style = C.level0; break;				
		case 1:
			style = C.level1; break;				
		case 2:
			style = C.level2; break;				
		default:
			break;
	}

	console.log(lastChild)
	if (haveChild) style = style + ' ' + C.haveChild
	if (!lastChild) style = style + ' ' + C.haveNextBrother
	return (
		<div className={style}>
			<ReactSVG src={'icons/'+name+'.svg'} />
		</div>
	)
}

export function Level({value, haveChild, lastChild}:P) {
	const iconsNames = [
		"directory",
		"subtract",
		"sheet"
	]
	
	return (
		<div>
			<DrawPict name={iconsNames[value]} value={value} haveChild={haveChild} lastChild={lastChild} />
		</div>
	)
}