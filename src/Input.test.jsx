import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input component', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('when todo input value enter', () => {
    it('changed', () => {
      const { getByPlaceholderText } = render((
        <Input
          onChange={handleChange}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toBeDefined();
      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, {
        target: {
          value: 'something',
        },
      });

      expect(handleChange).toBeCalled();
      expect(input.value).toBe('something');
    });
  });

  it('can click add button', () => {
    const { getByText } = render((
      <Input
        onClick={handleClick}
      />
    ));

    const addButton = getByText('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(addButton);

    expect(handleClick).toBeCalled();
  });
});
