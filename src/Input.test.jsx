import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('Show specific text (할 일 & 추가)', () => {
    const { container } = render(<Input />);

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  context('When put a value in Input', () => {
    it('Onchange event occurred', () => {
      render(<Input />);

      const task = screen.getByLabelText('할 일');

      fireEvent.change(task, { target: { value: '아무거나' } });

      expect(task.value).toBe('아무거나');
    });
  });

  context('When click 추가 button', () => {
    it('Calls handleClick)', () => {
      const handleClick = jest.fn();

      render((
        <Input
          onClick={handleClick}
        />
      ));

      const button = screen.getByText('추가');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });
  });
});
