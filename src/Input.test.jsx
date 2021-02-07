import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  function renderInput({ value }) {
    return render((<Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />));
  }

  it('화면에 나타나는 content들을 표시합니다.', () => {
    const { container, getByPlaceholderText } = renderInput({ value: '' });

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
  });

  it('추가버튼을 누르면 handleClick을 호출합니다.', () => {
    const { getByText, getByPlaceholderText } = renderInput({ value: '' });

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
  });

  it('입력이 변경되면 onClick을 실행한다.', () => {
    const { getByPlaceholderText } = renderInput({ value: '' });

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByPlaceholderText('할 을 입력해 주세요'), {
      target: { value: 'TDD 과제하기' },
    });
    expect(handleChange).toBeCalled();
  });
});
