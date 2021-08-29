import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }
  it('입력됨에 따라 인풋의 텍스트가 변경된다.', () => {
    const { getByPlaceholderText } = renderApp();

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveAttribute('value', '');

    fireEvent.change(input, { target: { value: 'Do anything' } });

    expect(input).toHaveAttribute('value', 'Do anything');
  });

  it('추가 버튼을 누르면 완료 버튼을 포함한 리스트가 작성된다.', () => {
    const { container, getByText } = renderApp();

    const addBtn = getByText('추가');

    expect(container).not.toHaveTextContent('완료');

    fireEvent.click(addBtn);

    expect(container).toHaveTextContent('완료');
  });

  it('완료 버튼을 누르면 리스트가 삭제된다.', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const addBtn = getByText('추가');

    fireEvent.change(input, { target: { value: 'Do anything' } });
    fireEvent.click(addBtn);

    const delBtn = getByText('완료');
    const li = getByText('Do anything');

    expect(container).toContainElement(li);

    fireEvent.click(delBtn);

    expect(container).not.toContainElement(li);
  });
});
