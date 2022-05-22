import Input from './Input';
import List from './List';

export default function Page({
  taskTitle, onChangeTitle, onClickAddTask,
  tasks, onClickDelete,
}) {
  return (
    <div>
      <h1>To-do</h1>
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    </div>
  );
}
