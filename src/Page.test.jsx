import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const newContents = '숨쉬기';

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

  context('Page가 렌더링 됩니다.', () => {
    it('엘리먼트가 존재하는지 확인합니다.', () => {
      const {
        container,
        getByText,
        getByPlaceholderText,
      } = render((
        <Page tasks={emptyTask} />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).toHaveTextContent('추가');

      const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

      expect(inputEl).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();

      expect(inputEl.value).toBe('');
    });
  });

  context('Page가 전달하는 Props들이 잘 전달되는지 확인합니다.', () => {
    it('onChangeTitle이 전달되어 이벤트를 수행하는지 체크합니다.', () => {
      const { getByPlaceholderText } = render(
        <Page
          tasks={emptyTask}
          onChangeTitle={handleChange}
        />,
      );

      const inputEl = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputEl, { target: { value: newContents } });

      expect(inputEl.value).toBe(newContents);
    });

    it('Tasks가 잘 전달되는 지 확인합니다.', () => {
      const { container } = render((
        <Page
          tasks={notEmptyTasks}
        />
      ));

      expect(container).toHaveTextContent('숨쉬기');
      expect(container).toHaveTextContent('아무것도 안하기');
    });

    it('DeleteTask가 잘 전달되는 지 확인합니다.', () => {
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
  });

  it('onClickAddTask가 잘 전달되는 지 확인합니다.', () => {
    const { getByText } = render((
      <Page
        tasks={emptyTask}
        onClickAddTask={handleClick}
      />
    ));

    const buttonEl = getByText('추가');

    expect(buttonEl).toBeInTheDocument();

    fireEvent.click(buttonEl);

    expect(handleClick).toBeCalledWith(1);
  });
});
