import { render, screen, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Input', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기1',
  },
  {
    id: 2,
    title: '뭐라도 하기2',
  },
  {
    id: 3,
    title: '뭐라도 하기3',
  },
  ];

  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const title = '제목!!';

  it('Input에 제목!!이 출력된다.', () => {
    const { container, getByText, queryByDisplayValue } = render((
      <Page
        taskTitle={title}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    ));
    expect(screen.getByDisplayValue('제목!!')).toBeInTheDocument();
  });

  it('To-do가 출력된다.', () => {
    const { container } = render((
      <Page
        taskTitle={title}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    ));

    expect(container).toHaveTextContent('To-do');
  });
  it('onChageTitle이 호출되면 title이 바꿔진다.', () => {
    const { container } = render((
      <Page
        taskTitle={title}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    ));

    // fireEvent.change(onChangeTitle('!!!!!!!!!!'));
  });
});
