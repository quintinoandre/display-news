enum EClientsApisUrls {
	algolia = 'http://hn.algolia.com/api/v1',
	newsapi = 'https://newsapi.org/v2',
}

interface INewDTO {
	title: string;
	url: string;
	author: string;
	source: EClientsApisUrls;
}

export { INewDTO };
