import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('Item', () => {
  context('when there is a task', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('renders a list item with a 완료 button', () => {
      const { container } = render((
        <Item task={task} />
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');
    });

    context('when 완료 button is pressed', () => {
      it('calls click handler', () => {
        const handleClick = jest.fn();
        const { getByText } = render((
          <Item
            task={task}
            onClickDelete={handleClick}
          />
        ));

        expect(handleClick).not.toBeCalled();

        fireEvent.click(getByText('완료'));

        expect(handleClick).toBeCalledWith(1);
      });
    });
  });
});
