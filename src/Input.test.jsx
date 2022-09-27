import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  it('Input 컴포넌트에 label을 가진 input, 버튼이 있는가?', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <Input />,
    );

    getByLabelText('할 일'); // label이 있는지 확인
    getByPlaceholderText('할 일을 입력해 주세요'); // input이 있는지 확인
    getByText('추가'); // button이 있는지 확인
  });

  it('input의 value 값을 변경할 수 있는가?', () => {
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

  it('추가 버튼에 전달된 클릭이벤트가 호출되는가?', () => {
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
