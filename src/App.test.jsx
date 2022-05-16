import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render(<App />);
  }

  it("1. '할 일이 없어요!'가 출력되어야 한다.", () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('2. task가 정상적으로 추가되어야 한다.', () => {
    const { container, getByRole, getByText } = renderApp();

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(getByText('추가'));
    expect(input.value).toBe('');

    expect(container).toHaveTextContent('테스트');
    expect(container).toHaveTextContent('완료');
  });

  it("3. 추가된 task를 완료 버튼 눌렀을 때, '할 일이 없어요'가 출력되어야 한다", () => {
    const { container, getByRole, getByText } = renderApp();

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
