import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  context('initial loading', () => {
    it('label "할 일" 확인한다.', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일');
    });

    it('input이 존재하는지 확인한다.', () => {
      const { getByLabelText } = renderApp();
      const input = getByLabelText('할 일');

      expect(input).toBeTruthy();
    });

    it('"할 일이 없어요!"를 화면에 나타나있는지 확인한다.', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('all flow test', () => {
    const task = '아무것도 하지 않기';

    it('"taskTitle" 추가하기 후 추가 버튼 클릭 후 완료 버튼 클릭', () => {
      const { getByLabelText, getByText, container } = renderApp();
      const input = getByLabelText('할 일');
      const addButton = getByText('추가');

      expect(input).toHaveDisplayValue('');

      fireEvent.change(input, { target: { value: task } });
      expect(input).toHaveDisplayValue(task);

      fireEvent.click(addButton);
      expect(input).toHaveDisplayValue('');
      expect(container).toHaveTextContent(task);

      const finishButton = getByText('완료');

      fireEvent.click(finishButton);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
