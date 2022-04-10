import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function rederInput() {
    return render((
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  it('renders input element', () => {
    const { container } = rederInput();
    expect(container).toBeInTheDocument();
  });

  it('should be able to change in input', () => {
    const { getByRole } = rederInput();
    fireEvent.change(getByRole('textbox'), { target: { value: '코딩을 즐기기' } });
    expect(handleChange).toBeCalled();
    // expect(input.value).toBe('코딩을 즐기기');
  });

  it('추가 버튼을 클릭하면 input이 비어진다. ', () => {
    const { input, getByText } = rederInput();
    // fireEvent.change(input, { target: { value: '코딩을 즐기기' } });
    // expect(input.value).toBe('코딩을 즐기기');

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
    // expect(input.value).toEqual('');
  });

  it('has 할 일 text.', () => {
    const { container } = rederInput();
    expect(container).toHaveTextContent('할 일');
  });
});
