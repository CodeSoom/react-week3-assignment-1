import { fireEvent, render } from '@testing-library/react';
import Input from '../src/Input';

test('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const { container, getByRole } = render(<Input onChange={handleChange} onClick={handleClick} />);

  // 렌더링이 잘되었는지
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByRole('textbox', { name: /할 일/i });

  // 입력 시 텍스트가 잘 반영 되는지
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(input.value).toBe('hello');
  expect(handleChange).toBeCalled();

  // 추가 클릭 시 입력창이 비어 진다
  fireEvent.click(getByRole('button', { name: /추가/i }));
  expect(handleClick).toBeCalled();
  // TODO 입력창이 비어지는지 테스트
  // expect(input.value).toBe('');
});
