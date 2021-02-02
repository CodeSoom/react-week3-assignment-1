import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

function showInputWith(value, handleChange = onChange, handleClick = onClick) {
  return render((<Input
    value={value}
    onChange={handleChange}
    onClick={handleClick}
  />));
}

describe('Input에서', () => {
  it('인풋에 변경이 일어나면 onChange함수가 실행된다.', () => {
    const { getByPlaceholderText } = showInputWith('밥먹기');

    expect(onChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '누워있기',
      },
    });
    expect(onChange).toBeCalled();
  });

  it('추가버튼을 클릭하면 onClick함수가 실행된다.', () => {
    const { getByText } = showInputWith('밥먹기');

    expect(onClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalled();
  });
});
