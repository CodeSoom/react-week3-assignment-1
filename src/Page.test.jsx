import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('App', () => {
  it('renders title', () => {
    const { container } = render(<Page tasks={[]} />);

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
  });

  it('calls handleChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Page
        taskTitle="타이틀"
        onChangeTitle={handleChange}
        tasks={[{ id: 1, title: '일어나기' }]}
      />
    );

    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
    expect(handleChange).toBeCalled();
  });

  it('calls handleClickAddTask', () => {
    const handleClickAddTask = jest.fn();

    const { getByText } = render(
      <Page onClickAddTask={handleClickAddTask} tasks={[]} />
    );

    expect(handleClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });

  it('calls handleClickDeleteTask ', () => {
    const handleClickDeleteTask = jest.fn();
    const { getByText } = render(
      <Page
        tasks={[{ id: 1, title: '일어나기' }]}
        onClickDeleteTask={handleClickDeleteTask}
      />
    );

    expect(handleClickDeleteTask).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(handleClickDeleteTask).toBeCalledWith(1);
  });
});
