import ky from 'ky';

import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export const deleteApi = async (id: string): Promise<any|string> => {
	try {
		const answer:any = await ky.delete(urlApi + id + "/delete")
		const json = await answer.json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}