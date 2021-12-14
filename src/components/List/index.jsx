import Item from '../Item';

export const EMPTY_MESSAGE = '할 일이 없어요!';
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
