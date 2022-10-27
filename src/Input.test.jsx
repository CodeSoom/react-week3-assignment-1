import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();
  const task = (
    <Input
      value="넷플릭스 보기"
      onChange={onChange}
      onClick={onClick}
    />
  );

  it('추가버튼을 누르면 onClick함수가 실행된다', () => {
    render(task);

    expect(onClick).not.toBeCalled();

    fireEvent.click(screen.getByText('추가'));

    expect(onClick).toBeCalled();
  });

  it('value값이 변경되면 onChange함수가 실행된다 ', () => {
    render(task);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '넷플릭스 보기',
      },
    });

    expect(input).toHaveAttribute('value', '넷플릭스 보기');
  });
});
