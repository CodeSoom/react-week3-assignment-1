import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { container } = render((
    <App />
  ));

  it('App을 렌더링한다', () => {
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
