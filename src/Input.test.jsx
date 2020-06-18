import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const onChange = jest.fn();
const onClick = jest.fn();

function createInput(value) {
  return render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));
}

describe('Input', () => {
  context('공통적으로', () => {
    const todoTitle = '';
    const inputPalceHodler = '할 일을 입력해 주세요';

    it('제목을 볼 수 있다.', () => {
      const { container } = createInput(todoTitle);

      expect(container).toHaveTextContent('할 일');
    });

    it('입력창을 볼 수 있다.', () => {
      const { getByPlaceholderText } = createInput(todoTitle);

      expect(getByPlaceholderText(inputPalceHodler)).toContainHTML('input');
    });

    it('추가 버튼을 볼 수 있다.', () => {
      const { container } = createInput(todoTitle);

      expect(container).toHaveTextContent('추가');
    });
  });

  context('할 일을 입력한 상태에서', () => {
    const todoTitle = '이거 오늘까지 해';
    const inputPalceHodler = '할 일을 입력해 주세요';

    it('추가 버튼을 누를 수 있다.', () => {
      const { getByText } = createInput(todoTitle);
      expect(onClick).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(onClick).toBeCalled(); // 여기서 toBeCalledWith로 todoTitle이 들어갔는지 확인하는 건 너무 구현적일까요?
    });

    it('입력값을 수정할 수 있다.', () => {
      const { getByPlaceholderText } = createInput(todoTitle);
      expect(onChange).not.toBeCalled();

      fireEvent.change(getByPlaceholderText(inputPalceHodler), { target: { value: '' } });

      expect(onChange).toBeCalled();
    });
  });
});
