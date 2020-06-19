import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const handleClickDeleteTask = jest.fn();

  context('할 일이 없다면', () => {
    const tasks = [];

    it(' "할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleClickDeleteTask} />,
      );
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있다면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일1',
      },
    ];

    it('추가된 할 일이 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleClickDeleteTask} />,
      );

      expect(container).toHaveTextContent('할 일1');
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
