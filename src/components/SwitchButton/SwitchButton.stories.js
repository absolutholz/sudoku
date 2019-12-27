import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SwitchButton from './SwitchButton.vue';

storiesOf('Atoms|Switch Button', module)
	.addDecorator(withKnobs)

	.add('default', () => ({
		components: { SwitchButton },
		template: '<switch-button />',
	}))

	.add('off', () => ({
		components: { SwitchButton },
		props: {
			state: {
				default: false,
			}
		},
		template: '<switch-button :state="state" />',
	}))

	.add('on', () => ({
		components: { SwitchButton },
		props: {
			state: {
				default: true,
			}
		},
		template: '<switch-button :state="state" />',
	}))

	.add('interactive', () => ({
		components: { SwitchButton },
		props: {
			state: {
				default: boolean('State', false),
			}
		},
		methods: {
			action: action('toggled'),
		},
		template: '<switch-button :state="state" @onToggled="action" />',
	}));
