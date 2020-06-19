import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

import { TASK } from './Fixtures/Tasks';
import { COMPLETE_TEXT } from './Fixtures/UserInterfaceText';

describe('<Item />', () => {
  context('task가 존재할 때', () => {
    it('task를 render 한다.', () => {
      const { container } = render(<Item task={TASK} />);
      expect(container).toHaveTextContent(TASK.title);
    });

    it('완료 버튼을 눌러 handleClick에 id가 전달된다.', () => {
      const handleClick = jest.fn();
      const { getByText } = render((
        <Item
          task={TASK}
          onClickDelete={handleClick}
        />
      ));
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText(COMPLETE_TEXT));
      expect(handleClick).toBeCalledWith(100);
    });
  });
});
