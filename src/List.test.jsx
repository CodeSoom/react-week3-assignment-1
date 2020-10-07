import React from 'react';

import {
  render,
} from '@testing-library/react';

import List from './List';

describe('List', () => {
  const setup = ({ tasks }) => {
    const utils = render(<List tasks={tasks} />);
    return { ...utils };
  };

  context('tasks의 값이 없을 때', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = setup({ tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks의 값이 존재할 때', () => {
    const tasks = [
      { id: 1, title: '코드숨 과제하기' },
      { id: 2, title: '아무것도 하지 않기' },
    ];

    it('"tasks.title이 화면에 표시되는지 확인한다."', () => {
      const { container } = setup({ tasks });

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });
  });
});
