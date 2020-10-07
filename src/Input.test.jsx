import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  context('value가 존재하지 않으면', () => {
    const value = '';

    it('placeholder를 보여준다', () => {
      const { container, getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('value가 존재하면', () => {
    const value = '받아온 문자';
    it('값을 보여준다.', () => {
      const { container, getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveDisplayValue('받아온 문자');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('value가 변하면', () => {
    it('onChange 이벤트가 실행된다.', () => {
      const value = '';

      const { container, getByPlaceholderText } = render((
        <Input value={value} onChange={handleChange} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(container).toHaveTextContent('할 일');
      expect(input).toHaveDisplayValue('');
      expect(container).toHaveTextContent('추가');

      expect(handleChange).not.toBeCalled();

      fireEvent.change(input, { target: { value: '입력한 문자' } });

      expect(handleChange).toBeCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('onClick 이벤트가 실행된다', () => {
      const value = '입력한 문자';

      const { getByText, getByPlaceholderText } = render((
        <Input value={value} onClick={handleClick} />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleClick).not.toBeCalled();
      expect(input).toHaveDisplayValue('입력한 문자');

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalled();
      expect(input).toHaveDisplayValue('');
    });
  });
});
