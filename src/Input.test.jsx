import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input/>', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  it('renders <label> and <button> tags', () => {
    const { container } = render(<Input />);

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('renders clickable "추가" button', () => {
    const { getByText } = render(<Input onClick={handleClick} />);

    expect(handleClick).not.toBeCalled();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
