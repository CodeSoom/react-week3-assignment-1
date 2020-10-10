import React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';

import App from './App';

describe('App', () => {

  context('입력한 데이터가 있을 때', () => {
    it('데이터를 표시한다.', () => {
      const { getByPlaceholderText } = render((<App />));
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'),{target: { value: '할 일 테스트'}});
      expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe("할 일 테스트");
    });
  });

  context('추가를 누를 경우', () => {
    const handleClickAddTask = jest.fn();
    it('데이터에 값을 추가한다.', () => {
      const { getByPlaceholderText, getByText } = render((<App />));
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'),{target: { value: '할 일 테스트 #1'}});
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalledWith('할 일 테스트 #1');
    });
  });

  context('완료를 누를 경우', () => {
    it('데이터에서 값을 뺀다.', () => {

    });
  });
});