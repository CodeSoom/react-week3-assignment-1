import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

test('Input 컴포넌트 구성요소는 할 일 label, input form, 추가 버튼이 있다', () => {
  const { container, getByPlaceholderText } = render(<Input />);

  expect(container).toContainHTML('label');
  expect(container).toContainHTML('input');
  expect(container).toContainHTML('button');

  expect(container).toHaveTextContent('할 일');
  getByPlaceholderText('할 일을 입력해 주세요');
  expect(container).toHaveTextContent('추가');
  expect(container.firstChild).toMatchSnapshot();
});

test('label을 선택하면, input form에 focus가 된다.', () => {
  const { container, getByText } = render(<Input />);

  userEvent.click(getByText('할 일'));
  expect(container.querySelector('input')).toHaveFocus();
});

test('input form에 할 일을 입력할 수 있다.1', () => {
  const input = render(<Input />).container.querySelector('input');

  userEvent.type(input, '오늘의 할 일');
  expect(input).toHaveValue('오늘의 할 일');
});

test('input form에 할 일을 입력할 수 있다.2', () => {
  const { getByPlaceholderText } = render(<Input />);
  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { title: '오늘의 할 일' } });
  expect(input.title).toBe('오늘의 할 일');
});

test('입력한 할 일을 추가하면 input form이 비워진다.', () => {
  const addTodo = jest.fn();
  const { getByText, getByPlaceholderText } = render(<Input onClick={addTodo} />);
  const input = getByPlaceholderText('할 일을 입력해 주세요');

  expect(addTodo).not.toBeCalled();
  userEvent.type(input, '오늘의 할 일');
  fireEvent.click(getByText('추가'));
  expect(addTodo).toBeCalled();
  expect(input.title).toBe('');
});
