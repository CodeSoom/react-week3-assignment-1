import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input /> ', () => {
  context('테스트가 시작하면', () => {
    it('input과 button으로 이루어져 있는지 확인한다.', () => {

      const { container,getByPlaceholderText } = render((
        <Input />
      ));

      expect(getByPlaceholderText('할 일을 입력해 주세요'));
      expect(container).toHaveTextContent('추가');

    });
  });

  context('input에 값을 입력하면', () => {
    it('onchange가 호출된다', () => {

      const value = 'input value test';

      const handleChange = jest.fn();

      const { container } = render((
        <Input
          value={value}
          onChange={handleChange}
        />
      ));

      // onChage 검증 아이디어가 필요합니다...
    });
  });

  context('버튼을 누르면', () => {
    it('onClick 호출된다.', () => {
      const handleClick = jest.fn();

      const { getByText } = render((
        <Input onClick={handleClick} />
      ));

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();

    });
  });

});
