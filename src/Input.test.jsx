import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const mockChange = jest.fn();
  const mockClick = jest.fn();

  function createTestComponent(value = '') {
    return render((
      <Input value={value} onClick={mockClick} onChange={mockChange} />
    ));
  }

  it('value props가 input value에 입력된다', () => {
    // given
    const expectValue = '테스트';
    const { getByRole } = createTestComponent(expectValue);

    // when
    const result = getByRole('textbox');

    // then
    expect(result).toHaveValue(expectValue);
  });

  it('입력값이 변경되면 onChange 함수가 1회 호출된다', () => {
    // given
    const expectValue = '테스트2';
    const { getByRole } = createTestComponent();
    const sut = getByRole('textbox');

    // when
    fireEvent.change(sut, { target: { value: expectValue } });

    // then
    expect(mockChange).toBeCalledTimes(1);
  });

  it('추가 버튼을 클릭하면 onClick 함수가 1회 호출된다', () => {
    // given
    const { getByRole } = createTestComponent();
    const sut = getByRole('button');

    // when
    fireEvent.click(sut);

    // then
    expect(mockClick).toBeCalledTimes(1);
  });
});
