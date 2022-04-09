import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  function renderInput(onChange, onClick) {
    return (
      render(<Input onChange={onChange} onClick={onClick} />)
    );
  }

  const onChangeValue = jest.fn();
  const onClickAddTask = jest.fn();

  test('input에 값을 입력하면 값이 변경되어야 한다.', () => {
    const { getByLabelText } = renderInput(onChangeValue, onClickAddTask);
    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: '첫번째 할일' } });
    expect(input.value).toBe('첫번째 할일');
  });

  test('input 의 값이 변경되면 onChange가 실행된다.', () => {
    const { getByLabelText } = renderInput(onChangeValue, onClickAddTask);
    const input = getByLabelText('할 일');

    // expect(onChangeValue).not.toBeCalled();
    fireEvent.change(input, { target: { value: '다음 할 일' } });
    expect(onChangeValue).toBeCalled();
  });

  test('추가 버튼을 클릭하면 onClick 이 실행된다.', () => {
    const { getByLabelText, getByText } = renderInput(onChangeValue, onClickAddTask);
    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: '다른 할 일' } });
    fireEvent.click(getByText('추가'));

    expect(onClickAddTask).toBeCalled();
  });
});
