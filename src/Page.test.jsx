import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const renderPage = ({ taskTitle, tasks }) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={jest.fn()}
      onClickAddTask={jest.fn()}
      tasks={tasks}
      onClickDeleteTask={jest.fn()}
    />
  ));

  it('renders title', () => {
    const { container } = renderPage({
      taskTitle: '',
      tasks: [],
    });

    expect(container).toHaveTextContent('To-do');
  });

  it('renders input label', () => {
    const { container } = renderPage({
      taskTitle: '',
      tasks: [],
    });

    expect(container).toHaveTextContent('할 일');
  });

  it('renders add button', () => {
    const { container } = renderPage({
      taskTitle: '',
      tasks: [],
    });

    expect(container).toHaveTextContent('추가');
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container } = renderPage({
        taskTitle: '',
        tasks: [{ id: 0, title: '아무것도 안하기' }],
      });

      expect(container).toHaveTextContent('아무것도 안하기');
    });
  });

  context('without task', () => {
    it('renders tasks', () => {
      const { container } = renderPage({
        taskTitle: '',
        tasks: [],
      });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
