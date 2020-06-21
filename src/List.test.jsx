import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

import tasks from './__fixture__/tasks';

describe('<List />', () => {
  const handleClickDeleteTask = jest.fn();

  context('할 일이 없다면', () => {
    it(' "할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(
        <List tasks={[]} onClickDelete={handleClickDeleteTask} />,
      );
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있다면', () => {
    it('추가된 할 일이 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleClickDeleteTask} />,
      );

      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
      expect(container).toHaveTextContent('할 일3');
    });

    it('할 일을 삭제하는 완료 버튼이 보인다.', () => {
      const { getByText } = render(
        <List tasks={tasks} onClickDelete={handleClickDeleteTask} />,
      );

      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });
});
