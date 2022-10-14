import axios from 'axios';

import { IAxiosResponse, IClients } from './IClients';

const BASE_URL = 'https://newsapi.org/v2';
const api = axios.create({ baseURL: BASE_URL });

const {
	env: { NEWS_API_KEY },
} = process;

class NewsAPI implements IClients {
	private buildURL(resources: string): string {
		return `${BASE_URL}/${resources}&apiKey=${String(NEWS_API_KEY)}`;
	}

	public async findNews(
		subject: string,
		numberOfNews: string
	): Promise<IAxiosResponse[]> {
		return api.get(
			this.buildURL(`everything?q=${subject}&pageSize=${numberOfNews}`)
		);
	}
}

export { NewsAPI };
