import React from 'react';

import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';

import Input from './Input';

describe("'Input 컴포넌트는", () => {
  
  context("'추가' 버튼을 누르면", () => {
    const onClick = jest.fn();

    it("텍스트 필드에 입력한 글자가 사라진다.", () => {
      const { container, getByText } = render((
        <Input
          id="input-task-title"
          onClick={onClick}
        />
      ));

      fireEvent.click(getByText('추가'));

      expect(container).toBeNull;
    });
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
