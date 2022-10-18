import axios from 'axios';

import { INewDTO } from '../dtos/INewDTO';
import { convertToNewDTO } from '../mappers/newMapper';
import { IClients } from './IClients';

const BASE_URL = 'http://hn.algolia.com/api/v1';

const api = axios.create({ baseURL: BASE_URL });

class Algolia implements IClients {
	constructor(public readonly url: string = BASE_URL) {}

	public async findNews(
		subject: string,
		numberOfNews: string
	): Promise<INewDTO[]> {
		return api
			.get(`/search?query=${subject}&hitsPerPage=${numberOfNews}`)
			.then((response) =>
				response.data.hits.map((article: any) =>
					convertToNewDTO({ ...article, source: this.url })
				)
			);
	}
}

export { Algolia };
