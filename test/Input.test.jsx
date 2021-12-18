import { fireEvent, render } from '@testing-library/react';
import Input from '../src/Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderComponent = (value = '') => {
    const { container, getByRole } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );
    const input = getByRole('textbox', { name: /할 일/i });
    const addButton = getByRole('button', { name: /추가/i });

    return {
      container, getByRole, input, addButton,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 렌더링될 때, "할 일" 과 "추가", value props 가 노출된다.', () => {
    const { container, input } = renderComponent('hello');

    expect(container).not.toBe(null);
    expect(input).toHaveValue('hello');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('input 에 입력할 때, onChange 함수가 실행된다.', () => {
    const { input } = renderComponent();

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toBeCalled();
  });

  it('추가 버튼을 클릭할 때, onClick 함수가 실행된다..', () => {
    const { addButton } = renderComponent();

    fireEvent.click(addButton);

    expect(handleClick).toBeCalled();
  });
});
