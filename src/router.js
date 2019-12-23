import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home';
import Game from './pages/Game';
import Settings from './pages/Settings';

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
			path: '/game/:difficulty',
			name: 'game',
			component: Game,
		},
		// {
		// 	path: '*',
		// 	name: 'notFound',
		// 	component: NotFound,
		// },
	],
});

export default router;
