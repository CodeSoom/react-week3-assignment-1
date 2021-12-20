import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

// Input
//  -renders Input
// 1. with same text
//  -not call onChange handler
// 2. with change input
//  -calls onChange handler
// 3. when click "추가" button
//  -calls onClick handler

describe('Input', () => {
  const value = '할 일이 없음';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderInput = () => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Input', () => {
    const { container, getByLabelText, getByText } = renderInput();

    expect(container).toHaveTextContent('할 일');
    expect(getByLabelText('할 일').value).toBe(value);
    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
  });

  context('with same text', () => {
    it('not call onChange handler', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), {
        target: { value },
      });

      expect(handleChange).not.toBeCalled();
    });
  });

  context('with change input', () => {
    it('calls onChange handler', () => {
      const { getByLabelText } = renderInput();

      fireEvent.change(getByLabelText('할 일'), {
        target: { value: '운동하기' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('when click "추가" button', () => {
    it('calls onClick handler', () => {
      const { getByText } = renderInput();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
