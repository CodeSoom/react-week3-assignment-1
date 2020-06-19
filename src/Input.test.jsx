import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

import { TASK_TITLE } from './Fixture/Tasks';
import { PLACEHOLDER, ADDTASK_TEXT } from './Fixture/UserInterfaceText';

describe('<Input /> ', () => {
  context('rendering 되면', () => {
    it('input과 button으로 이루어져 있는지 확인한다.', () => {
      const { getByText, getByPlaceholderText } = render(<Input />);
      expect(getByPlaceholderText(PLACEHOLDER)).toHaveAttribute('type', 'text');
      expect(getByText(ADDTASK_TEXT)).toHaveAttribute('type', 'button');
    });
  });

  context('input 박스에 할 일을 입력하면', () => {
    it('onChange 이벤트가 핸들러가 호출된다.', () => {
      const handleChangeTitle = jest.fn();
      const { getByPlaceholderText } = render((
        <Input
          value=""
          onChange={handleChangeTitle}
        />
      ));
      const input = getByPlaceholderText(PLACEHOLDER);
      expect(handleChangeTitle).not.toBeCalled();
      fireEvent.change(input, {
        target: {
          value: TASK_TITLE,
        },
      });
      expect(handleChangeTitle).toBeCalled();
    });
  });

  context('추가 버튼을 누르면', () => {
    it('onClick 이벤트 핸들러가 호출된다.', () => {
      const handleClickAddTask = jest.fn();
      const { getByText } = render((
        <Input onClick={handleClickAddTask} />
      ));

      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(getByText(ADDTASK_TEXT));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
