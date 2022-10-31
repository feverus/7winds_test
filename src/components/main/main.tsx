import {observer, inject} from "mobx-react";

import defaultStore from '../../store/defaultStore'
import { TopMenu } from '../topMenu'

export function Main() {
	return (
		<>
		<TopMenu/>
		</>
	)
}