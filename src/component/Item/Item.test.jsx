import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Item from './Item';

describe('Test Item component', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  beforeEach(() => {
    render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));
  });

  it('text renders', () => {
    expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument();
  });

  it('button working', () => {
    expect(handleClick).not.toBeCalled();

    userEvent.click(screen.getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalledWith(1);
  });
});
