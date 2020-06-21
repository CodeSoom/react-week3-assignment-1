import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

const handleClick = jest.fn();
const handleChange = jest.fn();

function renderInput(value) {
  render(<Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />);

  return {
    taskTitleInput: screen.getByLabelText(/할 일/i, { selector: 'input' }),
    addButton: screen.getByRole('button', { name: /추가/i }),
  };
}

describe('<Input />', () => {
  context('without input value', () => {
    it('print guide message', () => {
      // given
      const value = '';
      // when
      const { taskTitleInput } = renderInput(value);
      // then
      expect(taskTitleInput.placeholder).toBe('할 일을 입력해 주세요');
    });
  });

  context('with input value', () => {
    it('print input value', () => {
      // given
      const value = '어제보다 열심히 하기';
      // when
      const { taskTitleInput } = renderInput(value);
      // then
      expect(taskTitleInput.value).toBe(value);
    });
  });

  context('when clicked button', () => {
    it('notify that it has been clicked', () => {
      // given
      handleClick.mockClear();
      // when
      const { addButton } = renderInput('오늘 할 일');
      fireEvent.click(addButton);
      // then
      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('when an input field is entered', () => {
    it('notify that it has been entered', () => {
      // given
      handleChange.mockClear();
      // when
      const { taskTitleInput } = renderInput('오늘 할 일');
      fireEvent.change(taskTitleInput, { target: { value: '내일 할 일' } });
      // then
      expect(handleChange).toBeCalledTimes(1);
    });
  });
});
