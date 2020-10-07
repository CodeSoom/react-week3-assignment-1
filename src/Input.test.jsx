import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  context('화면을 그릴때', () => {
    const taskTitle = '';

    it('label, input, button을 보여준다.', () => {
      const { container, getByLabelText } = render((
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(getByLabelText('할 일')).toHaveDisplayValue('');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('input 값이 변하면', () => {
    const taskTitle = '';

    it('onChange 이벤트가 발생한다', () => {
      const { getByLabelText } = render((
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleChange).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), { target: { value: '입력 값' } });

      expect(handleChange).toBeCalledTimes(1);
    });
  });

  context('추가를 누르면', () => {
    const taskTitle = 'taskTitle';

    it('onClick 이벤트가 발생한다', () => {
      const { getByText } = render((
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
