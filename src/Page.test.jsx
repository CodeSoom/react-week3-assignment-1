import React from 'react';

import { render } from '@testing-library/react';
import Page from './Page';

describe('<Page />', () => {
  const dom = (props = {}) => {
    const {
      taskTitle,
      onChangeTitle,
      onClickAddTask,
      onClickDeleteTask,
    } = props;
    return render(
      <Page
        tasks={[]}
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        onClickDeleteTask={onClickDeleteTask}
      />,
    );
  };

  context('로딩 되면', () => {
    it('"To-do" 타이틀이 있다.', () => {
      const { getByText } = dom();
      expect(getByText('To-do')).toBeTruthy();
    });
    it('<Input />이 렌더링 됐다.', () => {
      const { getByText } = dom();
      expect(getByText('할 일')).toBeTruthy();
    });
    it('<List />가 렌더링 됐다.', () => {
      const { getByText } = dom();
      expect(getByText('할 일이 없어요!')).toBeTruthy();
    });
  });
});
