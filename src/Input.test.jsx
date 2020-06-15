import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('<Input />', () => {
  const dom = (props = {}) => {
    const { value, onChange, onClick } = props;
    const utils = render(<Input value={value} onChange={onChange} onClick={onClick} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const addTaskButton = getByText('추가');

    return {
      ...utils,
      input,
      addTaskButton,
    };
  };

  context('로딩 되면, ', () => {
    it('"할 일"이라는 타이틀이 있다.', () => {
      const { container } = dom();
      expect(container).toHaveTextContent('할 일');
    });

    it('입력창이 존재한다.', () => {
      const { input } = dom();
      expect(input).toBeTruthy();
    });

    it('추가 버튼이 존재한다.', () => {
      const { addTaskButton } = dom();
      expect(addTaskButton).toBeTruthy();
    });
  });

  context('입력창에 텍스트를 변경하면, ', () => {
    it('value가 변경된다.', () => {
      const { input } = dom();
      expect(input.value).toBe('');
      fireEvent.change(input, {
        target: {
          value: 'CodeSoom',
        },
      });
      expect(input.value).toBe('CodeSoom');
    });

    it('onChange 함수가 호출된다.', () => {
      const onChange = jest.fn();
      const { input } = dom({ onChange });

      expect(onChange).not.toBeCalled();
      fireEvent.change(input, {
        target: {
          value: 'CodeSoom',
        },
      });
      expect(onChange).toBeCalled();
    });
  });

  context('추가 버튼을 클릭하면, ', () => {
    it('onClick 함수가 호출된다.', () => {
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

    it('입력창의 value가 초기화 된다.', () => {
      const value = '';
      const onChange = jest.fn();
      const onClick = jest.fn();
      const { input, addTaskButton } = dom({ value, onChange, onClick });
      fireEvent.change(input, {
        target: {
          value: 'CodeSoom 3주차 TDD 과제',
        },
      });
      fireEvent.click(addTaskButton);
      expect(input.value).toBe('');
    });
  });
});
