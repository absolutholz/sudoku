import { shallowMount } from '@vue/test-utils';

import SwitchButton from './SwitchButton';

describe('SwitchButton', () => {
	it('renders "aria-checked=false" when no state is passed', () => {
		const wrapper = shallowMount(SwitchButton);
		expect(wrapper.attributes('aria-checked')).toMatch('false');
	});

	it('renders "aria-checked=false" when "false" state is passed', () => {
		const wrapper = shallowMount(SwitchButton, {
			state: false,
		});
		expect(wrapper.attributes('aria-checked')).toMatch('false');
	});

	it('renders "aria-checked=true" when "true" state is passed', () => {
		const wrapper = shallowMount(SwitchButton, {
			state: true,
		});
		expect(wrapper.attributes('aria-checked')).toMatch('false');
	});

	it('fires custom event when clicked', () => {
		const wrapper = shallowMount(SwitchButton, {
			state: false,
		});
		wrapper.find('button').trigger('click');
		expect(wrapper.emitted('onToggled')).toHaveLength(1);
	});

	it('returns same current state and opposite desired state from custom onToggled event', () => {
		const state = false;
		const wrapper = shallowMount(SwitchButton, {
			state,
		});
		wrapper.vm.toggle();
	    expect(wrapper.emitted().onToggled[0][0].stateCurrent).toEqual(state);
	    expect(wrapper.emitted().onToggled[0][0].stateDesired).toEqual(!state);
	});
});
