import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  context('로딩 후 아무 작업을 하지 않을 경우', () => {
    it('초기화면이 표시된다.', () => {
      const { container, getByLabelText } = render((
        <div>
          <Input />
        </div>
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByLabelText('할 일');

      expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
      expect(input).toHaveAttribute('value', '');
    });
  });

  context('할 일이 있을 경우', () => {
    it('input 값에 값이 표시된다.', () => {
      const taskTitle = 'do something';
      const handleChangeTitle = jest.fn();

      const { container, getByLabelText } = render((
        <div>
          <Input value={taskTitle} onChange={handleChangeTitle} />
        </div>
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');

      const input = getByLabelText('할 일');

      expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
      expect(input).toHaveAttribute('value', 'do something');
    });
  });

  context('input에 값을 입력하고 추가 버튼을 누르면', () => {
    it('input에 값이 표시되었다가, 값이 사라진다.', () => {
      const handleChangeTitle = jest.fn();
      const handleClickAddTask = jest.fn();

      const { getByText, getByLabelText } = render((
        <div>
          <Input
            onChange={handleChangeTitle}
            onClick={handleClickAddTask}
          />
        </div>
      ));

      const input = getByLabelText('할 일');

      fireEvent.change(input, { target: { value: 'do something' } });

      expect(handleChangeTitle).toBeCalled();

      expect(input).toHaveValue('do something');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();

      expect(input).toHaveAttribute('value', '');
    });
  });
});
