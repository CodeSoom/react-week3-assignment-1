import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input/>', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  context('when component called', () => {
    it('should render', () => {
      const { container } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });

    it('should be able to click "추가" button', () => {
      const { getByText } = render((
        <Input
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(handleClick).not.toBeCalled();

      const button = getByText('추가');
      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });
  });
});
