import {observer, inject} from "mobx-react";
import dataStore from '../../store/dataStore'
import C from './main.module.scss'
import { TopMenu } from '../topMenu'
import { NavBar } from '../navBar'
import {Content} from '../content/content'

export function Main() {
	return (
		<div className={C.container}>
			<TopMenu/>
			<NavBar/>
			<Content/>
		</div>
	)
}