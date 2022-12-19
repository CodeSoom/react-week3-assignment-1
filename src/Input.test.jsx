import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('label은 할 일 이라는 텍스트를 가지고 있어야 한다.', () => {
    render(<Input />);

    const label = screen.getByLabelText('할 일');

    expect(label).toBeInTheDocument();
  });

  it('input은 입력하는 글자를 화면에 노출해야 한다.', () => {
    const changeInputText = jest.fn();

    render(<Input onChange={changeInputText} />);

    const input = screen.getByRole('textbox');

    expect(input.value).not.toBe('누워 있기');

    fireEvent.change(input, { target: { value: '누워 있기' } });

    expect(input.value).toBe('누워 있기');
  });

  it('확인 버튼을 누르면 빈 value로 화면에 노출되어야 한다.', async () => {
    const addTodo = jest.fn();
    const changeInputValue = jest.fn();

    render(<Input onClick={addTodo} onChange={changeInputValue} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '고양이 밥 주기' } });

    const button = screen.getByRole('button', { name: '추가' });

    expect(screen.getByRole('textbox').value).toBe('고양이 밥 주기');

    fireEvent.click(button);
    expect(addTodo).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByRole('textbox').value).toBe('');
  });
});
