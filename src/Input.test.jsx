import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  context('Initialize', () => {
    it('render', () => {
      const taskTitle = '';
      const handleClick = jest.fn();
      const handleChange = jest.fn();

      const { getByLabelText, getByText, getByPlaceholderText } = render(
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      expect(getByLabelText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('onChange', () => {
    it('taskTitle', () => {
      const taskTitle = '추가된 할 일';
      const handleClick = jest.fn();
      const handleChange = jest.fn();

      const { getByPlaceholderText } = render(
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toHaveBeenCalled();
      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveAttribute('value', '추가된 할 일');
    });
  });

  context('onClick', () => {
    it('add task', () => {
      const taskTitle = '추가된 할 일';
      const handleClick = jest.fn();
      const handleChange = jest.fn();

      const { getByText } = render(
        <Input
          value={taskTitle}
          onChange={handleChange}
          onClick={handleClick}
        />,
      );

      expect(handleClick).not.toHaveBeenCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
