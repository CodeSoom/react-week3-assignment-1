import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render((
    <Input value="새로운 할일" onChange={handleChange} onClick={handleClick} />
  ));

  it('inital 상태', () => {
    const {
      container, getByPlaceholderText, getByRole, getByText,
    } = renderInput();
    expect(container).toHaveTextContent('할 일');
    expect(getByRole('textbox').value).toMatch('새로운 할일');
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeValid();
    expect(getByRole('button', { name: '추가' })).toBeValid();

    fireEvent.click(getByText('추가'));
    expect(getByRole('textbox').value).toMatch('');
  });

  it('input 값 변경', () => {
    const { getByLabelText } = renderInput();
    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: '이벤트 추가',
      },
    });
    expect(handleChange).toBeCalled();
  });

  it('추가 버튼 클릭', () => {
    const { getByText } = renderInput();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
