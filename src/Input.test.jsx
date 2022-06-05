import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = (value = '') => render(
    <Input value={value} onChange={handleChange} onClick={handleClick} />,
  );

  it('Input 컴포넌트를 렌더한다', () => {
    const { container, getByLabelText } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(getByLabelText('할 일').getAttribute('placeholder')).toBe(
      '할 일을 입력해 주세요',
    );
  });

  it('Input창에 입력하면 mockChange 함수를 호출한다.', () => {
    const { getByPlaceholderText } = renderInput();

    expect(handleChange).not.toBeCalled();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: '테스트' },
    });
    expect(handleChange).toBeCalled();
  });

  it('Input창에 원하는 값을 입력하고 렌더한다', () => {
    const expectValue = '테스트';
    const { getByLabelText } = renderInput(expectValue);

    const result = getByLabelText('할 일').getAttribute('value');

    expect(result).toBe(expectValue);
  });

  it("'추가 버튼'을 누르면 handleClick 함수를 호출한다.", () => {
    const { getByText } = renderInput();

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it("input창에 원하는 값을 입력하고 '추가' 버튼을 누르면 input창을 초기화한다.", () => {
    const { getByRole, getByText } = renderInput();

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(getByText('추가'));
    expect(input.value).toBe('');
  });
});
