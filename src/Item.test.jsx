import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

function renderItem(task, onClickDelete) {
  return render((
    <Item
      task={task}
      onClickDelete={onClickDelete}
    />
  ));
}

describe('Item', () => {
  const onClickDelete = jest.fn();

  context('when there is a task', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('renders a list item with a 완료 button', () => {
      const { container } = renderItem(task, onClickDelete);

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });

    context('when 완료 button is pressed', () => {
      it('calls click handler', () => {
        const { getByText } = renderItem(task, onClickDelete);

        expect(onClickDelete).not.toBeCalled();

        fireEvent.click(getByText('완료'));

        expect(onClickDelete).toBeCalledWith(1);
      });
    });
  });
});
