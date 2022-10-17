import prompts, { PromptObject } from 'prompts';

enum EOptionsTypes {
	buffered = 'buffered',
	iterator = 'iterator',
}

interface IUserChoicesProps {
	subject: string;
	numberOfNews: string;
	option: string;
}

async function getUserChoices(): Promise<IUserChoicesProps> {
	const userChoices: IUserChoicesProps = {
		subject: '',
		numberOfNews: '',
		option: '',
	};

	const questions: Array<PromptObject<string>> = [
		{
			type: 'text',
			name: 'subject',
			message: 'Which subject do you want to look for?',
		},
		{
			type: 'text',
			name: 'numberOfNews',
			message: 'How many news per source do you want?',
		},
	];

	const firstPromptsChoices = await prompts(questions);

	userChoices.subject = firstPromptsChoices.subject;
	userChoices.numberOfNews = firstPromptsChoices.numberOfNews;

	const secondPromptsChoice = await prompts({
		type: 'select',
		name: 'option',
		message: 'Pick a option',
		choices: [
			{
				title: 'All at once (buffered)',
				description:
					'Collecting all news from all sources first, and only after that it displays them. The news should be grouped by source.',
				value: EOptionsTypes.buffered,
			},
			{
				title: 'Iterator',
				description:
					'Displaying news as they become available using the iterator pattern. The news are not grouped by source.',
				value: EOptionsTypes.iterator,
			},
		],
		initial: 1,
	});

	userChoices.option = secondPromptsChoice.option;

	return userChoices;
}

export { getUserChoices, EOptionsTypes, IUserChoicesProps };
