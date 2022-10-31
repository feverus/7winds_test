import * as I from '../storeInterfaces';

export function onChangePage(value: I.StateSet):I.ActionSet {
	return {
		type: "ON_CHANGE_PAGE",
		payload: value
	}
}