import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트는', () => {
  it('라벨을 가진 인풋, 버튼을 리턴한다', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <Input />,
    );

    getByLabelText('할 일');
    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');
  });

  it('value 값을 변경할 수 있다', () => {
    const taskTitle = '할 일 입력';
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input value={taskTitle} onChange={handleChange} />,
    );

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: taskTitle,
      },
    });

    expect(input).toHaveAttribute('value', '할 일 입력');
  });

  it('추가 버튼에 전달된 클릭이벤트를 호출한다', () => {
    const taskTitle = '할 일 입력';
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    const { getByText } = render(
      <Input value={taskTitle} onChange={handleChange} onClick={handleClick} />,
    );

    const button = getByText('추가');

    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
