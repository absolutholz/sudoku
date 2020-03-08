import { withContexts } from '@storybook/addon-contexts/vue';
import { contexts } from '../../../.storybook/configs/contexts';

import Gameboard from '.';

export default {
	title: 'Gameboard',
	decorators: [withContexts(contexts)],
};

export const gameboard = () => ({
	components: { Gameboard },
	template: `
		<gameboard>
		</gameboard>
	`,
});
