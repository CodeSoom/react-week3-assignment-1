import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page/>', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const appComponent = (tasks) => render(
    <Page
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />,
  );

  const tasks = [
    { id: 1, title: '뭐라도 하기' },
    { id: 2, title: '코드숨 과제' },
  ];

  context('with tasks', () => {
    it('renders <Input/> and <List/> component', () => {
      const { container } = appComponent(tasks);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('코드숨 과제');
    });

    it('clicks "완료" buttons to delete tasks', () => {
      const { getAllByText } = appComponent(tasks);

      expect(handleClickDelete).not.toBeCalled();

      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);

      expect(handleClickDelete).toBeCalledTimes(2);
    });
  });

  context('without tasks', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = appComponent([]);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  it('changes input value', () => {
    const { getByPlaceholderText } = appComponent([]);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: 'Changed' } });

    expect(input.value).toBe('Changed');
  });

  it('clicks "추가" button to add a task', () => {
    const { getByText } = appComponent([]);

    expect(handleClickAdd).not.toBeCalled();

    const button = getByText('추가');
    fireEvent.click(button);

    expect(handleClickAdd).toBeCalled();
  });
});
