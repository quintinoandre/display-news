import { INewDTO } from '../dtos/INewDTO';

function convertToNewDTO(json: any): INewDTO {
	return { title: json.title, author: json.author, url: json.url };
}

export { convertToNewDTO };
