import { withContexts } from '@storybook/addon-contexts/vue';
import { contexts } from '../../../.storybook/configs/contexts';

import Gameboard from '.';
import CellNumber from './../CellNumber';
import CellNotes from './../CellNotes';

export default {
	title: 'Molecules',
	decorators: [withContexts(contexts)],
};

export const gameboard = () => ({
	components: {
		Gameboard,
		CellNumber,
		CellNotes,
	},
	template: `
		<gameboard>
			<template #cell-1-9>9</template>
			<template #cell-2-3>8</template>
			<template #cell-3-2>7</template>
			<template #cell-4-7>6</template>
			<template #cell-4-8>5</template>
			<template #cell-6-5>4</template>
			<template #cell-7-1>3</template>
			<template #cell-8-4>2</template>
			<template #cell-9-6>1</template>
			<template #cell-6-1><cell-notes></cell-notes></template>
			<template #cell-2-4><cell-notes></cell-notes></template>
			<template #cell-5-6><cell-notes></cell-notes></template>
		</gameboard>
	`,
});
