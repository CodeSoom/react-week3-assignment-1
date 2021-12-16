import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  it('renders title', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const { container } = render(<Item task={task} />);

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('calls handleClick', () => {
    const handleClick = jest.fn();
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const { getByText } = render(
      <Item task={task} onClickDelete={handleClick} />,
    );

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
