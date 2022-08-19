import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input/>', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const value = '유닛 테스트 재밌다.';

  context('when component called', () => {
    it('renders <label> and <button> tags', () => {
      const { container } = render((
        <Input
          value={value}
          onChange={handleChange}
          onClick={handleClick}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });

    it('renders clickable "추가" button', () => {
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
