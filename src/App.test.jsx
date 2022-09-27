import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  it('App 컴포넌트에서 Page 컴포넌트를 호출하고 있는가?', () => {
    const { getByText } = render(
      <App />,
    );

    expect(getByText('To-do')).toBeInTheDocument(); // Page 컴포넌트의 h1요소 확인
  });

  it('App 컴포넌트에서 정의된 handleChangeTitle 함수 확인', () => {
    const { getByPlaceholderText } = render(
      <App />,
    );

    const input = getByPlaceholderText('할 일을 입력해 주세요'); // 인풋 요소의 onChange 함수 확인
    fireEvent.change(input, {
      target: {
        value: '할 일을 적는 중',
      },
    });

    expect(input).toHaveAttribute('value', '할 일을 적는 중');
  });

  it('App 컴포넌트에서 정의된 handleClickAddTask 함수 확인', () => {
    const { container, getByText, getByPlaceholderText } = render(
      <App />,
    );

    // 이벤트를 발생시켜서 새 항목을 추가
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '추가될 할일',
      },
    });

    const addButton = getByText('추가'); // 추가 버튼의 onClick 함수 확인
    fireEvent.click(addButton);

    expect(container).toHaveTextContent('추가될 할일');
  });

  it('App 컴포넌트에서 정의된 handleClickDeleteTask 함수 확인', () => {
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

    const deleteButton = getByText('완료'); // 완료 버튼의 onClick 함수 확인
    fireEvent.click(deleteButton);

    expect(container).not.toHaveTextContent('완료된 할일');
  });
});
