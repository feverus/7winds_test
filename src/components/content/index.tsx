import {observer, inject} from "mobx-react";
import {Content} from './content'

export default
	inject('dataStore')
	(observer(Content));

export type { PropsSheetRenderer, PropsRowRenderer, PropsCellRenderer, GridElement, StateType, ApiType, ApiResponse } from './content.props'