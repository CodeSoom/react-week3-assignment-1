import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const renderPage = ({ tasks }) => render((
    <Page
      taskTitle=""
      onChangeTitle={jest.fn()}
      onClickAddTask={jest.fn()}
      tasks={tasks}
      onClickDeleteTask={jest.fn()}
    />
  ));
  it('renders title', () => {
    const { container } = renderPage({ tasks: [] });

    expect(container).toHaveTextContent('To-do');
  });

  it('renders input label', () => {
    const { container } = renderPage({ tasks: [] });

    expect(container).toHaveTextContent('할 일');
  });

  it('renders add button', () => {
    const { container } = renderPage({ tasks: [] });

    expect(container).toHaveTextContent('추가');
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container } = renderPage({
        tasks: [{ id: 0, title: '아무것도 안하기' }],
      });

      expect(container).toHaveTextContent('아무것도 안하기');
    });
  });

  context('without task', () => {
    it('renders 할 일이 없어요!', () => {
      const { container } = renderPage({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
