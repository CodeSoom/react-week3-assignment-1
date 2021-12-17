import { render } from '@testing-library/react';

import App from './App';
import Input from './Input';
import Item from './Item';
import List from './List';
import Page from './Page';

;

describe('App', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const taskTitle = '';
  const tasks = [
    { id: 100, title: '숨 쉬기' },
    { id: 101, title: '물 마시기' },
  ];
  context('무조건', () => {
    it('App이 그려진다.', () => {
      const { container } = render(<App />);
      expect(container);
    });
    it('Page가 그려진다.', () => {
      const { container } = render((
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />));
      expect(container);
    });
    it('Input이 그려진다.', () => {
      const { container } = render((
        <Input
          value={taskTitle}
          onChange={handleChangeTitle}
          onClick={handleClickAddTask}
        />
      ));
      expect(container);
    });
    it('Item이 그려진다.', () => {
      const { container } = render((
        <Item
          task={tasks[0]}
          onClickDelete={handleClickDeleteTask}
        />
      ));
      expect(container);
    });
    it('List가 그려진다.', () => {
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDeleteTask}
        />
      ));
      expect(container);
    });
  });
});
