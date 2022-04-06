import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders header, add button, and message `할 일이 없어요!`', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('adds tasks', () => {
    const { container, getByText, getByRole } = render((
      <App />
    ));

    fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('신나게 놀기');
  });

  it('removes tasks', () => {
    const { container, getByText, getByRole } = render((
      <App />
    ));

    fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('신나게 놀기');

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('신나게 놀기');
  });
});
