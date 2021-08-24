import React from 'react';

import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';

import Input from './Input';

const onClick = jest.fn();
const onChange = jest.fn();

describe("'추가'버튼은", () => {
  context("버튼을 누르면", () => {
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

describe("Input은", () => {
  context("텍스트 필드에 값을 입력하면", () => {
    it("onChange 메소드를 실행한다.", () => {
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
