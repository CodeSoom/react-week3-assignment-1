import React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it('라벨에 "할 일"이 출력되는 지 확인합니다', () => {
    const { getByText } = renderInput('');
    const taskTitleLabel = getByText('할 일');

    expect(taskTitleLabel).toHaveTextContent('할 일');
    cleanup();
  });

  it('버튼에 "추가"가 출력되는 지 확인합니다.', () => {
    const { getByText } = renderInput('');
    const addButton = getByText('추가');

    expect(addButton).toHaveTextContent('추가');
    cleanup();
  });

  it('handleChange가 호출되는 지 확인', () => {
    const { getByDisplayValue } = renderInput('');
    const taskTitleInput = getByDisplayValue('');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(taskTitleInput, { target: { value: '뭐라도 하기' } });
    expect(handleChange).toBeCalled();

    cleanup();
  });

  it('handleClick이 호출되는 지 확인', () => {
    const { getByText } = renderInput('');
    const addButton = getByText('추가');

    expect(handleClick).not.toBeCalled();
    fireEvent.click(addButton);
    expect(handleClick).toBeCalled();

    cleanup();
  });

  context('value가 없을 때', () => {
    const value = '';

    it('input의 placeholder에 "할 일을 입력해주세요" 가 잘 출력되는 지 확인합니다.', () => {
      const { getByPlaceholderText } = renderInput(value);
      const taskTitleInput = getByPlaceholderText('할 일을 입력해 주세요');

      expect(taskTitleInput).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
      cleanup();
    });
  });

  context('value가 있을 때', () => {
    const value = '뭐라도 하기';

    it('input의 value가 잘 출력되는 지 확인합니다.', () => {
      const { getByDisplayValue } = renderInput(value);
      const taskTitleInput = getByDisplayValue(value);

      expect(taskTitleInput).toHaveValue(value);
      cleanup();
    });
  });
});
