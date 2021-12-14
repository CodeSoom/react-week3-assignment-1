import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input', () => {
  it('값을 수정하면 props롤 전달한 onChange가 호출됩니다.', () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} />);
    const sut = screen.getByLabelText('할 일');

    fireEvent.change(sut, { target: { value: 'a' } });

    expect(mockOnChange).toBeCalled();
  });

  it('"추가" 버튼을 클릭하면 props로 전달한 onClick이 호출됩니다.', () => {
    const mockOnClick = jest.fn();
    render(<Input onClick={mockOnClick} />);
    const sut = screen.getByRole('button');

    fireEvent.click(sut);

    expect(mockOnClick).toBeCalled();
  });
});
