import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const emptyTask = [];
  const notEmptyTasks = [
    {
      id: 1,
      title: '숨쉬기',
    },
    {
      id: 2,
      title: '아무것도 안하기',
    },
  ];

  test('Page가 렌더링 되는지 확인합니다.', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <Page tasks={emptyTask} />
    ));

    expect(container).toHaveTextContent('To-do');

    const buttonEl = getByText('추가');
    const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();

    expect(inputEl.value).toBe('');
  });

  test('Input에 onChangeTitle이 전달되어 이벤트를 수행하는지 체크합니다.', () => {
    const { getByPlaceholderText } = render(
      <Page
        tasks={emptyTask}
        onChangeTitle={handleChange}
      />,
    );

    const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputEl, { target: { value: '숨쉬기' } });

    expect(inputEl.value).toBe('숨쉬기');
  });

  test('List에 Tasks가 잘 전달되는 지 확인합니다.', () => {
    const { container } = render((
      <Page
        tasks={notEmptyTasks}
      />
    ));

    expect(container).toHaveTextContent('숨쉬기');
    expect(container).toHaveTextContent('아무것도 안하기');
  });

  test('완료 버튼을 눌렀을 때 해당 할 일이 사라집니다.', () => {
    const { container, getAllByText } = render((
      <Page
        tasks={notEmptyTasks}
        onClickDeleteTask={handleClick}
      />
    ));

    expect(container).toHaveTextContent('숨쉬기');
    expect(container).toHaveTextContent('완료');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getAllByText('완료')[0]);
    fireEvent.click(getAllByText('완료')[1]);

    expect(handleClick).toBeCalledWith(2);
  });

  test('Input에서 Taks를 추가합니다.', () => {
    // 진행 예정입니다...!
  });
});
