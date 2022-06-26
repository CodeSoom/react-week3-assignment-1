import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const renderApp = () => ((
    render(<App />)
  ));

  it('새로운 할 일을 입력 후 추가 버튼을 누르면 목록에 새로운 할 일이 보임', () => {
    const { container, getByLabelText, getByText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '공부' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('공부');
  });

  it('완료 버튼을 누르면 해당 할 일이 목록에서 삭제됨', () => {
    const { container, getByLabelText, getByText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), { target: { value: '공부' } });
    fireEvent.click(getByText('추가'));
    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('공부');
  });
});
