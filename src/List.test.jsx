import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  const renderList = (task) => render((
    <List
      task={task}
      onClick={handleClick}
    />
  ));

  const { container } = renderList();

  it('nothing to-do', () => {
    const tasks = [];

    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('have to-do', () => {
    const tasks = [
      { id: 1, title: '잠자기' },
      { id: 2, title: '산책하기' },
    ];

    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent('잠자기');
    expect(container).toHaveTextContent('산책하기');
    expect(container).toHaveTextContent('완료');
  });

  it('Clicked done button', () => {
    const tasks = [
      { id: 1, title: '잠자기' },
      { id: 2, title: '산책하기' },
    ];

    const { container, getByText } = render((
      <List
        tasks={tasks}
        onClick={handleClick}
      />
    ));

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('잠자기'));
    // expect(handleClick).toBeCalledWith();
  });
});
