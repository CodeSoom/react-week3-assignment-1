import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  it('제목을 렌더링한다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
  });

  it('input-title을 렌더링한다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('할 일');
  });

  it('input-button을 렌더링한다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('추가');
  });

  it('list-title을 렌더링한다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
