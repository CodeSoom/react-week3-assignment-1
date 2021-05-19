import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트', () => {
  it('add Todo', () => {
    const handleClickAddTodo = jest.fn();
    const { getByText } = render((<Input onClick={handleClickAddTodo} />));

    expect(handleClickAddTodo).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTodo).toBeCalled();
  });
});
