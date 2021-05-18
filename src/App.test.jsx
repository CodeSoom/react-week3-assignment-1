import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  test('empty page', () => {
    const { container } = render((
      <Page
        taskTitle=""
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        tasks={[]}
        onClickDeleteTask={onClickDeleteTask}
      />
    ));
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
