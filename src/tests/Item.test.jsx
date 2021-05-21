import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Item from '../components/Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  const renderItem = () => (
    render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ))
  );

  it('renders each task on screen', () => {
    const { getByText, getByRole } = renderItem();

    expect(getByText('뭐라도 하기')).toBeInTheDocument();
    expect(getByRole('button', { name: '완료' })).toBeInTheDocument();
  });

  it('renders 완료 button and listens click event', () => {
    const { getByRole } = renderItem();

    expect(handleClick).not.toBeCalled();
    userEvent.click(getByRole('button', { name: '완료' }));
    expect(handleClick).toBeCalled();
  });
});
