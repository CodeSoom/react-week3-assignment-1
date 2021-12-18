import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const handleClick = jest.fn();
  const renderComponent = ({ task }) => render(<Item task={task} onClickDelete={handleClick} />);

  it('renders title', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    const { container } = renderComponent({ task });

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  it('calls onClickDelete', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };
    const { getByText } = renderComponent({ task });

    fireEvent.click(getByText('완료'));

    expect(handleClick).toBeCalledWith(1);
  });
});
