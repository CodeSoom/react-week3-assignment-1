import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and add button', () => {
    const { container } = render((
      <Input
        value=""
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  context('when the input is changed', () => {
    it('calls handleChange', () => {
      const { getByRole } = render((
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });

      expect(handleChange).toBeCalled();
    });
  });

  context('when the add button is clicked', () => {
    it('calls handleClick', () => {
      const { getByText } = render((
        <Input
          value=""
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
