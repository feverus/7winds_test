import * as I from './storeInterfaces';

export function mapStateToPropsMain() {
	return function (state: I.StateAll):I.PropsStateMain {
		return {
			page: state.set.page,
		}
	}
}
