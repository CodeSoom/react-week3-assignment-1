import {
  render, getByPlaceholderText, getByRole, fireEvent,
} from '@testing-library/react';

import Input from './Input';

const value = '할일!!';
const onChange = jest.fn();
const onClick = jest.fn();

function getInput(container) {
  return getByRole(container, 'textbox');
}

test('label', () => {
  const { container } = render(<Input />);
  expect(container).toHaveTextContent('할 일');
});

test('dose render placeholder when empty value', () => {
  const { container } = render(<Input />);
  expect(getByPlaceholderText(container, '할 일을 입력해 주세요')).toBeInTheDocument();
});

test('dose render value', () => {
  const { container } = render(<Input value={value} onChange={onChange} />);
  expect(getInput(container)).toHaveValue(value);
});

test('dose trigger onChange', () => {
  const { container } = render(<Input onChange={onChange} />);
  const input = getInput(container);
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.change(input, { target: { value: '할일을 추가합시다.' } });
  expect(onChange).toHaveBeenCalled();
  expect(input).toHaveValue('할일을 추가합시다.');
});

test('dose trigger onClick', () => {
  const { container } = render(<Input onChange={onChange} onClick={onClick} />);
  const button = getByRole(container, 'button');
  expect(onClick).not.toHaveBeenCalled();
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
