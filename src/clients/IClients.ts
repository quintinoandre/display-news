import { AxiosRequestConfig } from 'axios';

interface IAxiosResponse<T = never> {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	config: AxiosRequestConfig<T>;
	request?: any;
}

interface IClients {
	findNews: (
		subject: string,
		numberOfNews: string
	) => Promise<IAxiosResponse[]>;
}

export { IClients, IAxiosResponse };
