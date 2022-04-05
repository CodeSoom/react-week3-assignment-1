import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders tasks and done button', () => {
    const { container } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');
  });

  context('when the done button is clicked', () => {
    it('calls handleClick', () => {
      const { getByText } = render((
        <Item
          task={task}
          onClickDelete={handleClick}
        />
      ));

      fireEvent.click(getByText('완료'));

      expect(handleClick).toBeCalledWith(1);
    });
  });
});
