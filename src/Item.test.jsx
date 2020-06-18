import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('<Item />', () => {
  context('task가 존재할 때', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('task를 render 한다.', () => {
      const { container } = render(<Item task={task} />);
      expect(container).toHaveTextContent(task.title);
    });

    it('완료 버튼을 눌러 handleClick에 id가 전달된다.', () => {
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
