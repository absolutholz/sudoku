import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withContexts } from '@storybook/addon-contexts/vue';
import { contexts } from '../../../.storybook/configs/contexts';

import SwitchButton from '.';

export default {
	title: 'Atoms|Switch Button',
	decorators: [withKnobs, withContexts(contexts)],
};

// export const basic = () => ({
// 	components: { SwitchButton },
// 	props: {
// 		state: {
// 			default: boolean('State', false),
// 		},
// 	},
// 	template: '<switch-button :state="state" />',
// });

export const on = () => ({
	components: { SwitchButton },
	props: {
		state: {
			default: boolean('State', true),
		},
	},
	template: '<switch-button :state="state" />',
});

export const off = () => ({
	components: { SwitchButton },
	props: {
		state: {
			default: boolean('State', false),
		},
	},
	template: '<switch-button :state="state" />',
});
