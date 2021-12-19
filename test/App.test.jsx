import { fireEvent, render } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
  const renderApp = () => {
    const { container, getByRole } = render(<App />);
    const input = getByRole('textbox', { name: /할 일/i });

    return { container, input, getByRole };
  };

  it('App 컴포넌트가 렌더링 된다.', () => {
    const { container } = renderApp();

    expect(container).not.toBe(null);
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('input 에 입력 시, 입력값이 input 에 노출된다.', () => {
    const { input } = renderApp();

    fireEvent.change(input, { target: { value: 'Study' } });
    expect(input).toHaveValue('Study');
  });

  it('할 일을 추가 시, 입력 값이 화면에 렌더링 된다.', () => {
    const { container, getByRole, input } = renderApp();

    fireEvent.change(input, { target: { value: 'Study' } });
    fireEvent.click(getByRole('button', { name: /추가/i }));
    expect(input).toHaveValue('');
    expect(container).toHaveTextContent('Study');
  });

  it('리스트 아이템의 완료를 클릭 시, 해당 리스트 아이템이 삭제된다.', () => {
    const { container, getByRole, input } = renderApp();
    fireEvent.change(input, { target: { value: 'Study' } });
    fireEvent.click(getByRole('button', { name: /추가/i }));
    fireEvent.click(getByRole('button', { name: /완료/i }));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
