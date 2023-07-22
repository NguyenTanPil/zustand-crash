import PropTypes from 'prop-types';
import './task.css';
import classNames from 'classnames';
import { useStore } from '../store';
import { isEqual } from 'lodash';
const Task = ({ title }) => {
	const task = useStore((store) => store.tasks.find((task) => isEqual(task.title, title)));

	const deleteTask = useStore((store) => store.deleteTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);

	return (
		<div
			className='task'
			draggable={true}
			onDragStart={() => setDraggedTask(title)}
		>
			<div>{title}</div>
			<div className='bottomWrapper'>
				<div>
					<button onClick={() => deleteTask(title)}>X</button>
				</div>
				<div className={classNames('status', task.state)}>{task.state}</div>
			</div>
		</div>
	);
};

Task.propTypes = {
	title: PropTypes.string,
};

export default Task;
