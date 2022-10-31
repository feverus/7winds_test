import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import { NavBarList } from "../navBarList";
import C from './content.module.css'
import { ReactSVG } from 'react-svg'

export function Content() {
	return (
		<div className={C.body}>
			<div className={C.head}>
				<div className={C.lables}>
					<label>Название проекта</label>
					<label>Аббревиатура</label>
				</div>
				<div className={C.icon}>
					<button>
						<ReactSVG src="icons/keyboard_arrow_down.svg" />
					</button>	
				</div>				
			</div>
			<NavBarList/>
		</div>
	)
}