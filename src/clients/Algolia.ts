import axios from 'axios';

import { IAxiosResponse, IClients } from './IClients';

const BASE_URL = 'http://hn.algolia.com/api/v1';

const api = axios.create({ baseURL: BASE_URL });

class Algolia implements IClients {
	constructor(public readonly url: string = BASE_URL) {}

	public async findNews(
		subject: string,
		numberOfNews: string
	): Promise<IAxiosResponse> {
		return api.get(`/search?query=${subject}&hitsPerPage=${numberOfNews}`);
	}
}

export { Algolia };
