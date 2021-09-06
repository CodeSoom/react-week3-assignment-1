import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input은', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const value = '';

  function renderInput() {
    return render((
      <Input
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    ));
  }

  it('클릭 버튼 이벤트 함수를 호출한다.', () => {
    const { container, getByText } = renderInput();

    expect(onClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(onClick).toBeCalledTimes(1);
  });

  it('change 이벤트 함수를 호출한다.', () => {
    const { container, getByPlaceholderText } = renderInput();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '밥 먹기' }
    });

    expect(onChange).toBeCalled();
  });
});
