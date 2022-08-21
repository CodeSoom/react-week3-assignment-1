import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('<Item/>', () => {
  const handleClick = jest.fn();

  const appComponent = (task) => render(
    <Item
      key={task.id}
      task={task}
      onClickDelete={handleClick}
    />,
  );

  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  it('renders task', () => {
    const { container } = appComponent(task);

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('clicks "완료" buttons to delete a task', () => {
    const { getByText } = appComponent(task);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
