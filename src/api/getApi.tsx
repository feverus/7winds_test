import ky from 'ky';

import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export const getApi = async (): Promise<Array<I.Row>|string> => {
	try {
		const answer:any = await ky.get(urlApi+"list")
		const json = await answer.json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}