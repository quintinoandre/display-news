import axios from 'axios';

import { INewDTO } from '../dtos/INewDTO';
import { convertToNewDTO } from '../mappers/newMapper';
import { IClients } from './IClients';

const BASE_URL = 'https://newsapi.org/v2';

const api = axios.create({ baseURL: BASE_URL });

const {
	env: { NEWS_API_KEY },
} = process;

class NewsAPI implements IClients {
	constructor(public readonly url: string = BASE_URL) {}

	private buildURL(resources: string): string {
		return `${BASE_URL}/${resources}&apiKey=${String(NEWS_API_KEY)}`;
	}

	public async findNews(
		subject: string,
		numberOfNews: string
	): Promise<INewDTO[]> {
		return api
			.get(this.buildURL(`everything?q=${subject}&pageSize=${numberOfNews}`))
			.then((response) =>
				response.data.articles.map((article: any) =>
					convertToNewDTO({ ...article, source: this.url })
				)
			);
	}
}

export { NewsAPI };
