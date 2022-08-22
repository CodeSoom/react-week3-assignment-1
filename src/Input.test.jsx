import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input/>', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const value = '헷갈리지 않게 props 모두 기재';
  const appComponent = () => render(
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  it('renders <Input/> field', () => {
    const { container } = appComponent();

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('clicks "추가" button to add a task', () => {
    const { getByText } = appComponent();

    expect(handleClick).not.toBeCalled();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClick).toBeCalled();
  });
});
