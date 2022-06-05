import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('placeholder가 보여진다.', () => {
  render(
    <Input />,
  );
  expect(screen.getByPlaceholderText('할 일을 입력해 주세요'));
});

test('input의 type은 text이다.', () => {
  render(
    <Input />,
  );
  const inputElement = screen.getByLabelText('할 일');
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute('type', 'text');
});

test('키보드 입력시 input 값이 바뀐다.', () => {
  render(
    <Input />,
  );
  const inputElement = screen.getByLabelText('할 일');
  const todo = '헬스장 가기';
  fireEvent.change(inputElement, { target: { value: todo } });
  expect(inputElement).toHaveValue(todo);
});

test('추가 버튼 클릭시 onClick이 실행된다.', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Input onClick={handleClick} />,
  );

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});
