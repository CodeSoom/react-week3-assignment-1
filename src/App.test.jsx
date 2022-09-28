import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트에서는', () => {
  it('Page 컴포넌트를 리턴한다', () => {
    const { getByText } = render(
      <App />,
    );

    expect(getByText('To-do')).toBeInTheDocument();
  });

  it('정의된 handleChangeTitle 함수를 통해 인풋의 값을 변경할 수 있다', () => {
    const { getByPlaceholderText } = render(
      <App />,
    );

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '할 일을 적는 중',
      },
    });

    expect(input).toHaveAttribute('value', '할 일을 적는 중');
  });

  it('정의된 handleClickAddTask 함수를 통해 tasks를 추가할 수 있다', () => {
    const { container, getByText, getByPlaceholderText } = render(
      <App />,
    );

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '추가될 할일',
      },
    });

    const addButton = getByText('추가');
    fireEvent.click(addButton);

    expect(container).toHaveTextContent('추가될 할일');
  });

  it('정의된 handleClickDeleteTask 함수를 통해 완료된 할일을 삭제 할 수 있다', () => {
    const { container, getByText, getByPlaceholderText } = render(
      <App />,
    );

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '완료된 할일',
      },
    });

    fireEvent.click(getByText('추가'));

    getByText('완료된 할일');

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(container).not.toHaveTextContent('완료된 할일');
  });
});
