import React from 'react';

import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';

import Input from './Input';

describe("'Input 컴포넌트는", () => {
  const onClick = jest.fn();
  const onChange = jest.fn();
  const value = '';

    it("클릭 버튼 이벤트 함수를 호출한다.", () => {
      const { container, getByText } = render((
        <Input
          id="input-task-title"
          onClick={onClick}
          onChange={onChange}
          value={value}
        />
      ));
      fireEvent.click(getByText('추가'));

      expect(onClick).toBeCalledTimes(1);
  });
});

describe("Input 컴포넌트는", () => {
  context("텍스트 필드에 값을 입력하면", () => {
    it("onChange 메소드를 실행한다.", () => {
      const onChange = jest.fn();

      const { container, getByPlaceholderText } = render((
        <Input
          id="input-task-title"
          onChange={onChange}
        />
      ));

      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '밥 먹기' } });

      expect(onChange).toBeCalled();
    });
  });
});
