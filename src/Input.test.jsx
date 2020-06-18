import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input /> ', () => {
  context('rendering 되면', () => {
    it('input과 button으로 이루어져 있는지 확인한다.', () => {
      const { getByText, getByPlaceholderText } = render(<Input />);
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
      expect(getByText('추가')).toHaveAttribute('type', 'button');
    });
  });

  context('input 박스에 할 일을 입력하면', () => {
    it('onChange 이벤트가 핸들러가 호출된다.', () => {
      const TASK = 'codesoom 과제';
      const handleChangeTitle = jest.fn();
      const { getByPlaceholderText } = render((
        <Input
          value=""
          onChange={handleChangeTitle}
        />
      ));
      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(handleChangeTitle).not.toBeCalled();
      fireEvent.change(input, {
        target: {
          value: TASK,
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
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
