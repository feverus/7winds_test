import { connect } from 'react-redux';
import * as I from '../store/storeInterfaces';
import {mapStateToPropsMain as mapStateToProps} from '../store/mapStateToProps';
import {mapDispatchToProps} from '../store/mapDispatchToProps';

type P = I.PropsStateMain & I.PropsDispaich;

function Main_i(props:P) {
	return (
		<>hello</>
	)
}

const Main = connect(mapStateToProps(), mapDispatchToProps)(Main_i);
export default Main;