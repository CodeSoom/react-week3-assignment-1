import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const setup = () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn(() => {
    fireEvent.change(input, { target: { value: '' } });
  });

  const utils = render(<Input onChange={handleChange} onClick={handleClick} />);
  const input = utils.container.querySelector('input');
  const button = utils.container.querySelector('button');
  return {
    input,
    button,
    handleChange,
    handleClick,
    ...utils,
  };
};

test('Render Input component', () => {
  const { input, button } = setup();

  expect(input).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
  expect(input).toHaveAttribute('type', 'text');
  expect(button).toHaveTextContent('추가');
});

test('Change input', () => {
  const { input, handleChange } = setup();
  const text = '코드숨 리액트 11기 화이팅!';

  expect(handleChange).not.toBeCalled();

  fireEvent.change(input, { target: { value: text } });

  expect(handleChange).toBeCalled();
  expect(input.value).toBe(text);
});

test('Click add button', () => {
  const { input, button, handleClick } = setup();
  const text = '코드숨 리액트 11기 화이팅!';

  expect(handleClick).not.toBeCalled();

  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(button);

  expect(handleClick).toBeCalled();
  expect(input.value).toBe('');
});
