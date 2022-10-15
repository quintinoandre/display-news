import { Algolia } from '../clients/Algolia';
import { NewsAPI } from '../clients/NewsAPI';
import { INewDTO } from '../dtos/INewDTO';
import { convertToNewDTO } from '../mappers/newMapper';

function apiCalls(
	subject: string,
	numberOfNews: string
): Array<Promise<INewDTO[]>> {
	const algolia = new Algolia();

	const newsAPI = new NewsAPI();

	return [
		algolia
			.findNews(subject, numberOfNews)
			.then((response) =>
				response.data.hits.map((article) =>
					convertToNewDTO({ ...article, source: algolia.url })
				)
			),
		newsAPI
			.findNews(subject, numberOfNews)
			.then((response) =>
				response.data.articles.map((article) =>
					convertToNewDTO({ ...article, source: newsAPI.url })
				)
			),
	];
}

async function buffered(
	subject: string,
	numberOfNews: string
): Promise<INewDTO[]> {
	return Promise.all(apiCalls(subject, numberOfNews)).then((response) =>
		response.flat()
	);
}

async function* promisesToAsyncIterator(
	promises: Array<Promise<any>>
): AsyncGenerator<any, void, unknown> {
	const promisesByKey = new Map();

	for (let i = 0; i < promises.length; i++) {
		promisesByKey.set(
			i,
			promises[i].then((value) => ({ value, key: i }))
		);
	}

	while (promisesByKey.size > 0) {
		const promise = await Promise.any(promisesByKey.values());

		promisesByKey.delete(promise.key);

		yield promise.value;
	}
}

async function iterator(
	subject: string,
	numberOfNews: string
): Promise<AsyncGenerator<any, void, unknown>> {
	return promisesToAsyncIterator(apiCalls(subject, numberOfNews));
}

export { buffered, iterator };
