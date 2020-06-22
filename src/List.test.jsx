import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Lsit from './List';

describe('<List />', () => {
  const onClickDeleteTask = jest.fn();
  const renderList = (tasks) => (
    render((
      <Lsit
        tasks={tasks}
        onClickDelete={onClickDeleteTask}
      />
    ))
  );

  context('할 일이 없을 때', () => {
    it('할 일이 없어요 랜더링', () => {
      const tasks = [];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있을 때', () => {
    const tasks = [{
      id: 1,
      title: '뭐라도 하기',
    }];
    it('할 일 보여주기', () => {
      const { getByText } = renderList(tasks);
      expect(getByText(tasks[0].title)).toBeInTheDocument();
    });

    it('onClickDeleteTask 호출', () => {
      const { getByText } = renderList(tasks);
      fireEvent.click(getByText('완료'));

      expect(onClickDeleteTask).toBeCalledWith(1);
    });
  });
});
