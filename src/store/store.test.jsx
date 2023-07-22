import { useEffect } from 'react';
import { useStore } from './index';
import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';

function TestComponent({ selector, effect }) {
	const items = useStore(selector);

	useEffect(() => effect(items), [items]);

	return null;
}

test('should return default value at the start', () => {
	const selector = (store) => store.tasks;
	const effect = vi.fn();

	render(
		<TestComponent
			selector={selector}
			effect={effect}
		/>,
	);

	expect(effect).toHaveBeenCalledWith([]);
});

test('should add an items to the store and rerun the effect', () => {
	const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });
	const effect = vi.fn().mockImplementation((items) => {
		if (items.tasks.length === 0) {
			items.addTask('a', 'b');
		}
	});

	render(
		<TestComponent
			selector={selector}
			effect={effect}
		/>,
	);

	expect(effect).toHaveBeenCalledTimes(2);

	expect(effect).toHaveBeenCalledWith(expect.objectContaining({ tasks: [{ title: 'a', state: 'b' }] }));
});
