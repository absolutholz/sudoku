import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import CellNumber from '.';

export default {
	title: 'Atoms',
	decorators: [withKnobs],
};

export const cellNumber = () => ({
	components: { CellNumber },
	template: `
			<cell-number>{{ digit }}</cell-number>
	`,
	props: {
		digit: {
			default: number('Digit', 1, { max: 9, min: 1, step: 1 }),
		},
	},
});
