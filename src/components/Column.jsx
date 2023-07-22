import PropTypes from 'prop-types';
import './column.css';
import Task from './Task';
import { useStore } from '../store';
import { isEqual } from 'lodash';
import { useState } from 'react';
import classNames from 'classnames';

const Column = ({ state }) => {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);
	const [drop, setDrop] = useState(false);

	const tasks = useStore((store) => store.tasks.filter((task) => isEqual(task.state, state)));
	const draggedTask = useStore((store) => store.draggedTask);

	const addTask = useStore((store) => store.addTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const moveTask = useStore((store) => store.moveTask);

	const addNewTask = () => {
		addTask(text, state);
		setText('');
		setOpen(false);
	};

	const handleDrag = (e) => {
		e.preventDefault();
		setDrop(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setDrop(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		moveTask(draggedTask, state);
		setDraggedTask(null);
		setDrop(false);
	};

	return (
		<div
			className={classNames('column', { drop: drop })}
			onDragOver={handleDrag}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className='titleWrapper'>
				<p>{state}</p>
				<button onClick={() => setOpen(true)}>Add</button>
			</div>
			{tasks.map((task) => (
				<Task
					key={task.title}
					title={task.title}
				/>
			))}
			{open && (
				<div className='Model'>
					<div className='modalContent'>
						<input
							onChange={(e) => setText(e.target.value)}
							type='text'
							name=''
							id=''
						/>
						<button onClick={addNewTask}>Submit</button>
					</div>
				</div>
			)}
		</div>
	);
};

Column.propTypes = {
	state: PropTypes.string,
};

export default Column;
