import React from 'react';

import { render } from '@testing-library/react';

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
  context('할 일을 입력하지 않았을 때', () => {
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
});
