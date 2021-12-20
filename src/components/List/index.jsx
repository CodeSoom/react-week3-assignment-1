import Item from '../Item';
import { EMPTY_MESSAGE } from '../../constants';

export default function List({ tasks, onClickDelete }) {
  if (tasks.length === 0) {
    return (
      <p>{EMPTY_MESSAGE}</p>
    );
  }

  return (
    <ol>
      {tasks.map((task) => (
        <Item key={task.id} task={task} onClickDelete={onClickDelete} />
      ))}
    </ol>
  );
}
