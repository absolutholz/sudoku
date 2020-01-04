import { configure } from '@storybook/vue';

import './../src/scss';

configure(require.context('../src/components', true, /\.stories\.js$/), module);
