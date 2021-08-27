import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => ((
    render(<App />)
  ));

  context('when input value and click 추가 button', () => {
    it('renders new list', () => {
      const { getByText, getByLabelText, container } = renderApp();

      const inputNode = getByLabelText('TodoContent');

      fireEvent.change(inputNode, { target: { value: '밥먹기' } });
      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent('밥먹기');
    });
  });

  context('when click 완료 button on the list', () => {
    it('deletes the list', () => {
      const { getByText, getByLabelText, container } = renderApp();

      const inputNode = getByLabelText('TodoContent');

      fireEvent.change(inputNode, { target: { value: '밥먹기' } });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));

      expect(container).not.toHaveTextContent('밥먹기');
    });
  });
});
