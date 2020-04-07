<template>
	<ol class="grid">
		<li
			:aria-label="`Subgrid ${ subgridIndex + 1 }`"
			v-for="(subgrid, subgridIndex) in subgrids"
			:key="`subgrid-${ subgridIndex + 1 }`"
		>
			<ol class="subgrid">
				<li
					class="cell"
					v-for="(cell, cellIndex) in cells"
					:key="`cell-${ cellIndex + 1 }`"
				>
					<slot :name="`cell-${ subgridIndex + 1 }-${ cellIndex + 1 }`"></slot>
				</li>
			</ol>
		</li>
	</ol>
</template>

<script>
export default {
	name: 'Gameboard',

	data() {
		return {
			subgrids: new Array(9),
			cells: new Array(9),
		};
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";
@import "./../../scss/color.functions";

.grid,
.subgrid {
	@include reset-list;

	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.grid {
	border: 1px solid css-hsla(var(--color), 0.65);
	> li {
		border: inherit;
	}
}

.subgrid {
	> li {
		border: 0 solid css-hsla(var(--color), 0.45);

		&:nth-child(3n - 1),
		&:nth-child(3n - 2) {
			border-right-width: 1px;
		}

		&:nth-child(-n + 3),
		&:nth-child(-n + 6) {
			border-bottom-width: 1px;
		}
	}
}

.cell {
	padding-bottom: 100%;
	position: relative;

	> * {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
}
</style>
