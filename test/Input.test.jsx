import { fireEvent, render } from '@testing-library/react';
import Input from '../src/Input';

describe('Input', () => {
  test('초기 렌더링 시 "할 일" 과 "추가", value props 가 노출된다.', () => {
    const handleChange = jest.fn();
    const { container, getByRole } = render(<Input value="hello" onChange={handleChange} />);
    const input = getByRole('textbox', { name: /할 일/i });

    expect(input).toHaveValue('hello');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  test('입력창에 텍스트를 입력할 수 있다.', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Input onChange={handleChange} />);
    const input = getByRole('textbox', { name: /할 일/i });

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(input).toHaveValue('hello');
    expect(handleChange).toBeCalled();
  });

  test('추가 버튼을 클릭 할 수 있다.', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Input onClick={handleClick} />);
    fireEvent.click(getByRole('button', { name: /추가/i }));

    expect(handleClick).toBeCalled();
  });
});
