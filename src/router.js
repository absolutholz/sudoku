import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home';
import Game from './pages/Game';
import Settings from './pages/Settings';

import store from './store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
		},
		{
			path: '/game',
			name: 'game',
			component: Game,
			beforeEnter: (to, from, next) => {
				console.log(store.state);
				if (!store.state.puzzle.length) {
					next('/');
				} else {
					next();
				}
			},
		},
		{
			path: '*',
			redirect: '/',
		},
	],
});

export default router;
