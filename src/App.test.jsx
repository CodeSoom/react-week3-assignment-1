import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('App 컴포넌트를 렌더한다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('task를 추가하면 input창은 초기화하고 추가한 할 일을 렌더한다.', () => {
    const { container, getByRole, getByText } = renderApp();

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(getByText('추가'));
    expect(input.value).toBe('');

    expect(container).toHaveTextContent('테스트');
    expect(container).toHaveTextContent('완료');
  });

  it("task를 추가하고 제거하면 '할 일이 없어요'를 출력한다.", () => {
    const { container, getByRole, getByText } = renderApp();

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
