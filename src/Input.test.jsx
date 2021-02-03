import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input에서', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  function renderInputWith(value) {
    return render((<Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />));
  }

  it('인풋에 변경이 일어나면 onChange함수가 실행된다.', () => {
    const { getByPlaceholderText } = renderInputWith('밥먹기');

    expect(onChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '누워있기',
      },
    });
    expect(onChange).toBeCalled();
  });

  it('추가버튼을 클릭하면 onClick함수가 실행된다.', () => {
    const { getByText } = renderInputWith('밥먹기');

    expect(onClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalled();
  });
});
