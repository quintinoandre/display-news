import prompts from 'prompts';

import { INewDTO } from './dtos/INewDTO';
import { buffered, iterator } from './utils/clientHandler';
import {
	getUserChoices,
	EOptionsTypes,
	IUserChoicesProps,
} from './utils/userHandler';

const hotText = 'MDN';

void (async () => {
	while (true) {
		const userChoices: IUserChoicesProps = await getUserChoices();

		switch (userChoices.option) {
			case EOptionsTypes.buffered: {
				const response = await buffered(
					userChoices.subject,
					userChoices.numberOfNews
				);

				response.forEach((article: INewDTO) =>
					console.log(
						`title: ${article.title}\nurl: ${hotText.link(
							article.url
						)}\nauthor: ${article.author}\nsource: ${article.source}\n`
							.replace('<a href="', '')
							.replace('">MDN</a>', '')
					)
				);

				break;
			}

			default: {
				const generator = await iterator(
					userChoices.subject,
					userChoices.numberOfNews
				);

				for await (const value of generator) {
					value.forEach((article: INewDTO) =>
						console.log(
							`title: ${article.title}\nurl: ${hotText.link(
								article.url
							)}\nauthor: ${article.author}\nsource: ${article.source}\n`
								.replace('<a href="', '')
								.replace('">MDN</a>', '')
						)
					);
				}

				break;
			}
		}

		const thirdPromptsChoice = await prompts({
			type: 'toggle',
			name: 'value',
			message: 'Do you want to continue',
			initial: true,
			active: 'yes',
			inactive: 'no',
		});

		if (thirdPromptsChoice.value === false) {
			break;
		}
	}
})();
