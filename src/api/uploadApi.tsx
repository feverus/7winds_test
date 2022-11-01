import ky from 'ky';

import * as I from '../store/storeInterfaces';
import urlApi  from './urlApi';

export const uploadApi = async (data:any, id: string): Promise<any|string> => {
	try {
		const answer:any = await ky.post(urlApi + id + "/update", {
			json: data
		})
		const json = await answer.json()
		return json
	} catch (error) {
        return (error as Error).message
    }
}
