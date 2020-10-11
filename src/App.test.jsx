import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const inputText = '할 일';
  const task = '아무것도 하지 않기';

  const renderApp = () => render((
    <App />
  ));

  context('initial loading', () => {
    it('해당 태그가 존재하는지 확인한다.', () => {
      const { container, getByLabelText } = renderApp();

      expect(container).toHaveTextContent(inputText);
      expect(getByLabelText(inputText)).toBeTruthy();
    });

    it('"할 일이 없어요!"를 화면에 나타나있는지 확인한다.', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  it('"taskTitle" 추가하기 후 추가 버튼 클릭 후 완료 버튼 클릭', () => {
    const { getByLabelText, getByText, container } = renderApp();
    const input = getByLabelText(inputText);

    expect(input).toHaveDisplayValue('');

    fireEvent.change(input, { target: { value: task } });

    expect(input).toHaveDisplayValue(task);

    fireEvent.click(getByText('추가'));

    expect(input).toHaveDisplayValue('');
    expect(container).toHaveTextContent(task);

    fireEvent.click(getByText('완료'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
