import { Algolia } from '../clients/Algolia';
import { INewDTO } from '../dtos/INewDTO';
import { convertToNewDTO } from '../mappers/newMapper';

async function buffered(
	subject: string,
	numberOfNews: string
): Promise<INewDTO[]> {
	const algoliaResponse = await new Algolia().findNews(subject, numberOfNews);
	const algoliaNews = algoliaResponse.map((article) =>
		convertToNewDTO(article.data)
	);
	const newsAPIResponse = await new Algolia().findNews(subject, numberOfNews);
	const newsAPINews = newsAPIResponse.map((article) =>
		convertToNewDTO(article.data)
	);
	return [...algoliaNews, ...newsAPINews];
}

export { buffered };
