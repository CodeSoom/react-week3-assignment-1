import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();

  const onClickAddTask = jest.fn();

  const onClickDeleteTask = jest.fn();

  const pageComponentRender = (taskTitle = '', tasks = []) =>
    render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDeleteTask={onClickDeleteTask}
      />
    );

  describe('head title', () => {
    it('renders head title', () => {
      const { getByText } = pageComponentRender();

      expect(getByText('To-do')).toBeInTheDocument();
    });
  });

  describe('Input Component', () => {
    it('renders input box', () => {
      const { getByRole } = pageComponentRender('');

      expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('renders input box with taskTitle', () => {
      const { getByRole } = pageComponentRender('코드숨 과제');

      expect(getByRole('textbox')).toHaveValue('코드숨 과제');
    });

    it('renders add task button', () => {
      const { getByText } = pageComponentRender();

      expect(getByText('추가')).toBeInTheDocument();
    });
  });

  describe('List Component', () => {
    it('render tasks lists', () => {
      const { getByRole } = pageComponentRender('낮잠', [
        '코드숨 과제',
        '낮잠',
      ]);

      expect(getByRole('list')).toBeInTheDocument();
    });

    it('render delete button', () => {
      const { getByText } = pageComponentRender('', ['코드숨 과제']);

      expect(getByText('완료')).toBeInTheDocument();
    });
  });
});
