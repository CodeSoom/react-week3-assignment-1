import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

describe('<Item />', () => {
  context('아이템이 존재하면', () => {
    const task = {
      id: 1,
      title: '뭐라도 하기',
    };

    it('해당 task의 title을 render 한다.', () => {
      const { container } = render(<Item task={task} />);
      expect(container).toHaveTextContent(task.title);
    });

    it('완료 버튼을 눌러 handleClic에 id를 인자로 전달한다.', () => {
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
