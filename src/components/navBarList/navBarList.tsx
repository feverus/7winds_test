import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import useNavBarList from './navBarList.service'
import C from './navBarList.module.css'
import { ReactSVG } from 'react-svg'

function Item(item:string, id:number, choosen:number) {
	let style = (id===choosen)?
		' '+C.choosen:
		''
	return (
		<div key={id}
			className={C.listItem+style}>
			<ReactSVG src="icons/default.svg" />
			<label>{item}</label>
		</div>
	)

}
export function NavBarList() {
	const [state] = useNavBarList()
	return (
		<div className={C.body}>
			{state.list.map((item, id)=>(
				Item(item, id, state.choosen)
			))}
	
		</div>
	)
}