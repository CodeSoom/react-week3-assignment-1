import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  const handleClickAddTodo = jest.fn();
  const handleChange = jest.fn();

  function renderInputComponent() {
    return render(
      (
        <Input
          value="New Task"
          onChange={handleChange}
          onClick={handleClickAddTodo}
        />
      ),
    );
  }

  it('렌더링 페이지 텍스트 확인', () => {
    const { getByText } = renderInputComponent();

    expect(getByText(/할 일/)).not.toBeNull();
    expect(getByText(/추가/)).not.toBeNull();
  });

  it('placeholder 텍스트 확인', () => {
    const { getByPlaceholderText } = renderInputComponent();

    expect(getByPlaceholderText(/할 일을 입력해 주세요/)).not.toBeNull();
  });

  it('input 태그 value 변경하기', () => {
    const { getByDisplayValue, getByLabelText } = renderInputComponent();

    expect(getByDisplayValue('New Task')).not.toBeNull();

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: '멋대로 살기' },
    });

    expect(handleChange).toBeCalled();
  });

  it('add Todo', () => {
    const { getByText } = renderInputComponent();

    expect(handleClickAddTodo).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClickAddTodo).toBeCalled();
  });
});
