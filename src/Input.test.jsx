import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('<Input />', () => {
  const dom = (props = {}) => {
    const { value, onChange, onClick } = props;
    const utils = render(<Input value={value} onChange={onChange} onClick={onClick} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const button = getByText('추가');

    return {
      ...utils,
      input,
      button,
    };
  };

  it('"할 일"이라는 타이틀이 있다.', () => {
    const { container } = dom();
    expect(container).toHaveTextContent('할 일');
  });

  it('입력창이 존재한다.', () => {
    const { input } = dom();
    expect(input).toBeTruthy();
  });

  it('입력창의 텍스트를 변경한다.', () => {
    const { input } = dom();
    fireEvent.change(input, {
      target: {
        value: 'CodeSoom',
      },
    });
    expect(input.value).toBe('CodeSoom');
  });

  it('추가 버튼이 존재한다.', () => {
    const { button } = dom();
    expect(button).toBeTruthy();
  });

  it('추가 버튼을 클릭한다.', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Input onClick={onClick} />);

    expect(onClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalledTimes(1);
    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalledTimes(2);
    fireEvent.click(getByText('추가'));
    expect(onClick).toBeCalledTimes(3);
  });

  it('추가 버튼을 클릭하면 입력창의 value가 초기화 된다.', () => {
    const value = '';
    const onChange = jest.fn();
    const onClick = jest.fn();
    const { input, button } = dom({ value, onChange, onClick });
    fireEvent.change(input, {
      target: {
        value: 'CodeSoom 3주차 TDD 과제',
      },
    });
    fireEvent.click(button);
    expect(input.value).toBe('');
  });
});
