import { withKnobs, boolean } from '@storybook/addon-knobs';

import SwitchButton from './SwitchButton.vue';

export default {
	title: 'Atoms|Switch Button',
	decorators: [withKnobs],
};

export const basic = () => ({
	components: { SwitchButton },
	props: {
		state: {
			default: boolean('State', false),
		},
	},
	template: '<switch-button :state="state" />',
});

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
