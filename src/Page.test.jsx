import { render } from '@testing-library/react';

import Page from './Page';

describe('Page component', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const setup = ({ taskTitle = '', tasks = [] } = {}) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  it('renders h1', () => {
    const { getByText } = setup();

    expect(getByText('To-do')).not.toBeNull();
  });

  context('When tasks is empty', () => {
    const { getByText } = setup();

    expect(getByText('할 일이 없어요!')).toBeTruthy();
  });

  // context('When tasks exist', () => {
  //   const tasks = [
  //     {
  //       id: 1,
  //       title: '뭐라도 하기',
  //     },
  //     {
  //       id: 2,
  //       title: '코드숨 화이팅!',
  //     },
  //     {
  //       id: 3,
  //       title: '리뷰 감사합니다!',
  //     },
  //   ];

  //   const {} = setup();
  // });
});
