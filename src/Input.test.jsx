import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value = '') => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('라벨에 "할 일"이 출력된다', () => {
    const { getByText } = renderInput();
    const taskTitleLabel = getByText('할 일');

    expect(taskTitleLabel).toHaveTextContent('할 일');
  });

  it('버튼에 "추가"가 출력된다', () => {
    const { getByText } = renderInput();
    const addButton = getByText('추가');

    expect(addButton).toHaveTextContent('추가');
  });

  it('handleChange가 호출된다', () => {
    const { getByDisplayValue } = renderInput();
    const taskTitleInput = getByDisplayValue('');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(taskTitleInput, { target: { value: '뭐라도 하기' } });
    expect(handleChange).toBeCalled();
  });

  it('handleClick이 호출된다', () => {
    const { getByText } = renderInput();
    const addButton = getByText('추가');

    expect(handleClick).not.toBeCalled();
    fireEvent.click(addButton);
    expect(handleClick).toBeCalled();
  });

  context('value가 없을 때', () => {
    const value = '';

    it('input의 placeholder에 "할 일을 입력해주세요" 가 출력된다', () => {
      const { getByPlaceholderText } = renderInput(value);
      const taskTitleInput = getByPlaceholderText('할 일을 입력해 주세요');

      expect(taskTitleInput).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
    });
  });

  context('value가 있을 때', () => {
    const value = '뭐라도 하기';

    it('input의 value가 출력된다', () => {
      const { getByDisplayValue } = renderInput(value);
      const taskTitleInput = getByDisplayValue(value);

      expect(taskTitleInput).toHaveValue(value);
    });
  });
});
