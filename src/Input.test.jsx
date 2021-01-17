import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when render', () => {
    it('Initialize', () => {
      const { getByLabelText, getByText, getByPlaceholderText } = renderInput('');

      expect(getByLabelText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  describe('onChange input text', () => {
    it('change input value', () => {
      const taskTitle = '추가된 할 일';

      const { getByPlaceholderText } = renderInput(taskTitle);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChange).not.toHaveBeenCalled();
      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveValue(taskTitle);
    });
  });

  describe('Click addTask button', () => {
    it('calls onClick handler', () => {
      const taskTitle = '추가된 할 일';
      const { getByText } = renderInput(taskTitle);

      expect(handleClick).not.toHaveBeenCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
