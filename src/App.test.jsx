import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  context('when listening input change event ', () => {
    it('renders input value', () => {
      const { getByRole } = render(<App />);

      const input = getByRole('textbox');
      const changeValue = '할 일 입력 중';
      expect(input.value).toBe('');

      userEvent.type(input, changeValue);

      expect(input.value).toBe(changeValue);
    });
  });

  it('adds task and renders', () => {
    const { container, getByRole, getByText } = render(<App />);

    const input = getByRole('textbox');
    const addButton = getByText('추가');
    const changeValue = '할 일 추가 하기!';
    const emptyTaskMessage = '할 일이 없어요!';

    expect(container).toHaveTextContent(emptyTaskMessage);

    userEvent.type(input, changeValue); // 추가할 내용 입력
    userEvent.click(addButton); // 할일 추가하기 클릭

    expect(container).not.toHaveTextContent(emptyTaskMessage);
    expect(container).toHaveTextContent(changeValue);
  });

  it('remove task and renders', () => {
    const { container, getByRole, getByText } = render(<App />);

    const input = getByRole('textbox');
    const addButton = getByText('추가');
    const changeValue = '할 일 추가 하기!';
    const emptyTaskMessage = '할 일이 없어요!';

    expect(container).toHaveTextContent(emptyTaskMessage);

    userEvent.type(input, changeValue); // 추가할 내용 입력
    userEvent.click(addButton); // 할일 추가하기 클릭

    expect(container).not.toHaveTextContent(emptyTaskMessage);
    expect(container).toHaveTextContent(changeValue);

    const doneButton = getByText('완료');
    userEvent.click(doneButton);// 할일 완료하기 클릭

    expect(container).not.toHaveTextContent(changeValue);
    expect(container).toHaveTextContent(emptyTaskMessage);
  });
});
