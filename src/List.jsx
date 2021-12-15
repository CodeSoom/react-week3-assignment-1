import Item from './Item';

export default function List({ tasks, onClickDelete }) {
  console.log(tasks.length);
  if (tasks.length === 0) {
    return (
      <p>할 일이 없어요!</p>
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
