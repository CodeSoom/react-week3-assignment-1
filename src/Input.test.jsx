import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

const getContainerAndElement = () => {
  const onChange = jest.fn();
  const onClickAddTask = jest.fn();
  const container = render(<Input onChange={onChange} onClick={onClickAddTask} />);
  const input = container.getByLabelText('할 일');
  const button = container.getByText('추가');

  return {
    ...container, input, onChange, button, onClickAddTask,
  };
};

test('input에 값을 입력하면 값이 변경되어야 한다.', () => {
  const { input } = getContainerAndElement();
  const inputValue = '첫번째 할일';

  fireEvent.change(input, { target: { value: inputValue } });
  expect(input.value).toBe(inputValue);
});

test('input 의 값이 변경되면 onChange가 실행된다.', () => {
  const { input, onChange } = getContainerAndElement();
  const inputValue = '첫번째 할일';

  expect(input.value).toBe('');

  expect(onChange).not.toBeCalled();
  fireEvent.change(input, { target: { value: inputValue } });
  expect(onChange).toBeCalled();
});

test('추가 버튼을 클릭하면 onClick 이 실행된다.', () => {
  const { input, button, onClickAddTask } = getContainerAndElement();
  const inputValue = '첫번째 할일';

  fireEvent.change(input, { target: { value: inputValue } });
  fireEvent.click(button);

  expect(onClickAddTask).toBeCalled();
});
