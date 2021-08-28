import { render } from '@testing-library/react';

import given from 'given2';

import Page from './Page';

describe('Page', () => {
  given('tasks', () => []);

  const renderPage = () => render((
    <Page
      taskTitle=""
      onChangeTitle={jest.fn()}
      onClickAddTask={jest.fn()}
      tasks={given.tasks}
      onClickDeleteTask={jest.fn()}
    />
  ));

  it('renders title', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders input label', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('할 일');
  });

  it('renders add button', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('추가');
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      given('tasks', () => [{ id: 0, title: '아무것도 안하기' }]);

      const { container } = renderPage();

      expect(container).toHaveTextContent('아무것도 안하기');
    });
  });

  context('without task', () => {
    it('renders 할 일이 없어요!', () => {
      const { container } = renderPage();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
