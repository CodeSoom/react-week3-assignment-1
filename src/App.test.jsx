import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('할 일을 입력하고 추가 버튼을 누르면', () => {
  test('리스트가 추가된다.', () => {
    const { container, getByRole } = render(
      <App />,
    );

    const input = getByRole('textbox', { name: /할 일/ });
    const addButton = getByRole('button', { name: /추가/ });

    fireEvent.change(input, { target: { value: '코드숨 과제하기' } });

    expect(input.value).toBe('코드숨 과제하기');

    fireEvent.click(addButton);

    expect(container).toHaveTextContent('코드숨 과제하기');
    expect(input.value).toBe('');
  });
});

describe('완료 버튼을 누르면', () => {
  test('해당 항목이 리스트에서 사라진다.', () => {
    const { container, getByRole, getByText } = render(
      <App />,
    );

    const input = getByRole('textbox', { name: /할 일/ });
    const addButton = getByRole('button', { name: /추가/ });

    fireEvent.change(input, { target: { value: '코드숨 과제하기' } });

    expect(input.value).toBe('코드숨 과제하기');

    fireEvent.click(addButton);

    expect(container).toHaveTextContent('코드숨 과제하기');

    const doneButton = getByRole('button', { name: /완료/ });

    expect(doneButton).toBeInTheDocument();

    fireEvent.click(doneButton);

    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
