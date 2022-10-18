import { Algolia } from '../clients/Algolia';
import { NewsAPI } from '../clients/NewsAPI';
import { INewDTO } from '../dtos/INewDTO';

function apiCalls(
	subject: string,
	numberOfNews: string
): Array<Promise<INewDTO[]>> {
	return [
		new Algolia().findNews(subject, numberOfNews),
		new NewsAPI().findNews(subject, numberOfNews),
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
