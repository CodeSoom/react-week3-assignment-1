import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input/>', () => {
  const value = '헷갈리지 않게 props 모두 기재';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  it('renders <Input/> field', () => {
    const { container } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('clicks "추가" button to add a task', () => {
    const { getByText } = render(
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

    expect(handleClick).not.toBeCalled();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
