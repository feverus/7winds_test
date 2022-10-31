import {observer, inject} from "mobx-react";
import defaultStore from '../../store/defaultStore'
import C from './main.module.css'
import { TopMenu } from '../topMenu'
import { NavBar } from '../navBar'
import { Content } from '../content'

export function Main() {
	return (
		<div className={C.container}>
			<TopMenu/>
			<NavBar/>
			<Content/>
		</div>
	)
}