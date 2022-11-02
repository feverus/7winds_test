import {observer, inject} from "mobx-react";

import {Content} from './content'

export default
	inject('dataStore')
	(observer(Content));

export type { PropsSheetRenderer, PropsRowRenderer, PropsChanges, PropsCellRenderer, GridElement, RowProps, StateType, ApiType } from './content.props'