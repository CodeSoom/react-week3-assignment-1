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

  context('change 이벤트가 발생하면', () => {
    it('value의 값이 바뀐다.', () => {
      const { getByPlaceholderText } = render(<Input />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, {
        target: {
          value: '자바스크립트 공부하기',
        },
      });
      expect(input.value).toBe('자바스크립트 공부하기');
    });
  });

  context('추가 버튼을 누르면', () => {
    it('handleClickAddTask 이벤트가 호출된다.', () => {
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
