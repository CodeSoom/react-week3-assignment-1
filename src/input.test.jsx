import React from 'react';
import { render, fireEvent } from '@testing-library/react';

test('Input', () => {
  const value = '';
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByText } = render((
    <p>
      <label htmlFor="input-task-title">
        할 일
      </label>
      <input
        id="input-task-title"
        type="text"
        placeholder="할 일을 입력해 주세요"
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={onClick}>
        추가
      </button>
    </p>
  ));

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  expect(onClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(onClick).toBeCalled();
});
