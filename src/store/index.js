import { produce } from 'immer';
import { isEqual } from 'lodash';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const store = (set) => ({
	tasks: [],
	draggedTask: null,
	tasksOnGoing: 0,
	addTask: (title, state) =>
		set(
			produce((store) => {
				store.tasks.push({ title, state });
			}),
		),
	deleteTask: (title) => set((store) => ({ tasks: store.tasks.filter((task) => !isEqual(task.title, title)) })),
	setDraggedTask: (title) => set({ draggedTask: title }),
	moveTask: (title, state) =>
		set((store) => ({
			tasks: store.tasks.map((task) => (isEqual(task.title, title) ? { ...task, state } : task)),
		})),
});

export const useStore = create(
	subscribeWithSelector(
		persist(devtools(store), {
			name: 'store',
		}),
	),
);

useStore.subscribe(
	(store) => store.tasks,
	(newTasks, prevTasks) => {
		console.log({ newTasks, prevTasks });
		useStore.setState({
			tasksOnGoing: newTasks.filter((task) => task.state === 'ONGOING').length,
		});
	},
);
