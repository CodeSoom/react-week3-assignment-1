import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const onClickDelete = jest.fn();

  function renderItem({ task }) {
    return render((
      <Item
        task={task}
        onClickDelete={onClickDelete}
      />
    ));
  }

  context('when there is a task', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('renders a list item with a 완료 button', () => {
      const { container } = renderItem({ task });

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });

    context('when 완료 button is pressed', () => {
      it('calls click handler', () => {
        const { getByText } = renderItem({ task });

        expect(onClickDelete).not.toBeCalled();

        fireEvent.click(getByText('완료'));

        expect(onClickDelete).toBeCalledWith(1);
      });
    });
  });
});
