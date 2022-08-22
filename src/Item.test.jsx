import { render, fireEvent } from '@testing-library/react';

import Item from './Item';
import { fixtureTask } from './__fixtures__/tasks';

describe('<Item/>', () => {
  const handleClick = jest.fn();

  const appComponent = (task) => render(
    <Item
      key={task.id}
      task={task}
      onClickDelete={handleClick}
    />,
  );

  it('renders task', () => {
    const { container } = appComponent(fixtureTask);

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('clicks "완료" buttons to delete a task', () => {
    const { getByText } = appComponent(fixtureTask);

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
