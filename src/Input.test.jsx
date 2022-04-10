import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderInput() {
    return render((
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. '할 일' 텍스트 출력", () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
  });

  it("2. '추가' 버튼 클릭", () => {
    const { getByText } = renderInput();

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('3. input에 텍스트 입력 테스트', async () => {
    const { getByPlaceholderText } = renderInput();

    expect(handleChange).not.toBeCalled();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '할일이 없어' } });
    expect(handleChange).toBeCalled();
  });

  it('4. input에 placeholder 테스트', async () => {
    const { getByLabelText } = renderInput();

    expect(getByLabelText('할 일')
      .getAttribute('placeholder'))
      .toBe('할 일을 입력해 주세요');
  });
});
