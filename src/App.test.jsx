import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders To-do, input, button, text', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('adds task', () => {
    const { container, getByText, getByRole } = renderApp();
    fireEvent.change(getByRole('textbox'), { target: { value: '명상하기' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('명상하기');
  });

  it('deletes task', () => {
    const { container, getByText, getByRole } = renderApp();
    fireEvent.change(getByRole('textbox'), { target: { value: '명상하기' } });
    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('명상하기');

    fireEvent.click(getByText('완료'));
    expect(container).not.toHaveTextContent('명상하기');
  });
});
