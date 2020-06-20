import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

function renderInput({ value, onChange, onClick }) {
  render(<Input
    value={value}
    onChange={onChange}
    onClick={onClick}
  />);

  const taskTitleInput = screen.getByLabelText(/할 일/i, { selector: 'input' });
  const addButton = screen.getByRole('button', { name: /추가/i });

  return {
    taskTitleInput,
    changeTaskInput: (text) => fireEvent.change(taskTitleInput, { target: { value: text } }),
    clickAddButton: () => fireEvent.click(addButton),
  };
}

describe('<Input />', () => {
  context('without input value', () => {
    it('print guide message', () => {
      // given
      const value = '';
      // when
      const { taskTitleInput } = renderInput({ value, onChange: jest.fn(), onClick: jest.fn() });
      // then
      expect(taskTitleInput.placeholder).toBe('할 일을 입력해 주세요');
    });
  });

  context('with input value', () => {
    it('print input value', () => {
      // given
      const value = '어제보다 열심히 하기';
      // when
      const { taskTitleInput } = renderInput({ value, onChange: jest.fn(), onClick: jest.fn() });
      // then
      expect(taskTitleInput.value).toBe(value);
    });
  });

  context('when clicked button', () => {
    it('notify that it has been clicked', () => {
      // given
      const handleClick = jest.fn();
      // when
      const { clickAddButton } = renderInput({
        value: '오늘 할 일',
        onChange: jest.fn(),
        onClick: handleClick,
      });
      clickAddButton();
      // then
      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('when an input field is entered', () => {
    it('notify that it has been entered', () => {
      // given
      const handleChange = jest.fn();
      // when
      const { changeTaskInput } = renderInput({
        value: '오늘 할 일',
        onChange: handleChange,
        onClick: jest.fn(),
      });
      changeTaskInput('내일 할 일');
      // then
      expect(handleChange).toBeCalledTimes(1);
    });
  });
});
