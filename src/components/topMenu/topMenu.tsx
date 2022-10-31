import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import C from './topMenu.module.css'
import { ReactSVG } from 'react-svg'

export function TopMenu() {
	return (
		<div className={C.body}>
			<button className={C.buttonIcon}>
				<ReactSVG src="icons/apps.svg" />
			</button>
			<button className={C.buttonIcon}>
				<ReactSVG src="icons/reply.svg" />
			</button>	
			<button className={C.buttonText+' '+C.active}>
				Просмотр
			</button>		
			<button className={C.buttonText}>
				Управление
			</button>		
		</div>
	)
}