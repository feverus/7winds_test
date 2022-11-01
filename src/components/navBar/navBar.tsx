import {observer, inject} from "mobx-react";
import dataStore from '../../store/dataStore'
import { NavBarList } from "../navBarList";
import C from './navBar.module.scss'
import { ReactSVG } from 'react-svg'

export function NavBar() {
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