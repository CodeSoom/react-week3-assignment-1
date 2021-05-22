import { render } from '@testing-library/react';
import Input from './Input';

describe('<Input />', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  it('renders header', () => {
    const { container } = render(
      <Input
        value="뭐라도하기?"
        onChange={onChange}
        onClick={onClick}
      />,
    );
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });
});
