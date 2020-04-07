// import { withKnobs, number, array } from '@storybook/addon-knobs';

import CellNotes from './CellNotes.vue';
import CellNumber from './../CellNumber';

export default {
	title: 'Atoms',
	// decorators: [withKnobs],
};

export const cellNotes = () => ({
	components: {
		CellNotes,
		CellNumber,
	},
// 	props: {
// 		notes: {
// 			default: array('Notes', [true, true, true, true, true, true, true, true, true]),
// 		},
// 		activeDigit: {
// 			default: number('Active Digit', 0, { range: true, min: 0, max: 9, step: 1 }),
// 		},
// 	},
	template: `
		<notes>
			<template #note-1><cell-number>1</cell-number></template>
			<template #note-2><cell-number>2</cell-number></template>
			<template #note-3><cell-number>3</cell-number></template>
			<template #note-4><cell-number>4</cell-number></template>
			<template #note-5><cell-number>5</cell-number></template>
			<template #note-6><cell-number>6</cell-number></template>
			<template #note-7><cell-number>7</cell-number></template>
			<template #note-8><cell-number>8</cell-number></template>
			<template #note-9><cell-number>9</cell-number></template>
		</notes>
	`,
});
