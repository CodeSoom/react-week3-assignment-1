import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('No Todo & Input test', () => {
    const { container, getByText } = render((
      <App />
    ));

    const inputBox = container.querySelector('#input-task-title');

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(inputBox).toBeInTheDocument();
    expect(container).toHaveTextContent('추가');
    expect(inputBox.value).toBe('');

    expect(container).toHaveTextContent('할 일이 없어요!');

    fireEvent.change(inputBox, { target: { value: 'Distribute new version' } });
    expect(inputBox.value).toBe('Distribute new version');

    fireEvent.click(getByText('추가'));
    expect(container).not.toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('Distribute new version');
    expect(container).toHaveTextContent('완료');

    fireEvent.click(getByText('완료'));
    expect(container).not.toHaveTextContent('Distribute new version');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
