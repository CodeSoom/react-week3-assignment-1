import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => ((
    render(<App />)
  ));

  it('renders new list when input value and click 추가 button', () => {
    const { getByText, getByLabelText, container } = renderApp();

    const inputNode = getByLabelText('TodoContent');

    fireEvent.change(inputNode, { target: { value: '밥먹기' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('밥먹기');
  });

  it('deletes the list when click 완료 button on the list', () => {
    const { getByText, getByLabelText, container } = renderApp();

    const inputNode = getByLabelText('TodoContent');

    fireEvent.change(inputNode, { target: { value: '밥먹기' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('밥먹기');
  });
});
