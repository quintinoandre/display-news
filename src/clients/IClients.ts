import { INewDTO } from '../dtos/INewDTO';

interface IClients {
	findNews: (subject: string, numberOfNews: string) => Promise<INewDTO[]>;
}

export { IClients };
