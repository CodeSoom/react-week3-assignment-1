import React from 'react';

import { render } from '@testing-library/react';

import List from './List';


describe('List', () => {
  const onClickDelete = jest.fn();

  context("할 일이 없을 때", () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={onClickDelete} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context("할 일이 있을 때", () => {
    // ??
  });
});
