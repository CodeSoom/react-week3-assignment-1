import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('<List /> ', () => {
  it('tasks 가 없으면 할 일이 없어요! 를 화면에 보여준다.', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);
    expect(container).toHaveTextContent(/^할 일이 없어요!$/);
  });

  it('tasks 가 있으면 해당 tasks를 화면에 보여준다.', () => {
    const tasks = [
      { id: 1, title: '자바스크립트 공부' },
      { id: 2, title: 'git 공부' },
      { id: 3, title: '운동하기' },
    ];

    const { container, getAllByText } = render(<List tasks={tasks} />);
    getAllByText('완료');
    expect(container).toHaveTextContent('자바스크립트 공부');
    expect(container).toHaveTextContent('git 공부');
    expect(container).toHaveTextContent('운동하기');
  });
});
