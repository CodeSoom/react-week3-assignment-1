import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Item from '../components/Item';

describe('Item component', () => {
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

  it('renders each task on screen', () => {
    expect(screen.getByText('뭐라도 하기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument();
  });

  it('renders 완료 button and listens click event', () => {
    expect(handleClick).not.toBeCalled();

    userEvent.click(screen.getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalled();
  });
});
