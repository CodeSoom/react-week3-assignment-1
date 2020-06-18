import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const handleOnClickDeleteTask = jest.fn();

  context('할 일이 없다면', () => {
    const tasks = [];

    it(' "할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleOnClickDeleteTask} />,
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
      {
        id: 2,
        title: '할 일2',
      },
    ];
    it(' 추가된 할 일들이 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleOnClickDeleteTask} />,
      );
      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
    });
  });

  context('할 일에서 완료 버튼을 클릭하면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일1',
      },
    ];
    it('onClickDelete이 실행된다.', () => {
      const { getByText } = render(
        <List tasks={tasks} onClickDelete={handleOnClickDeleteTask} />,
      );

      expect(handleOnClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleOnClickDeleteTask).toBeCalledWith(1);
    });
  });
});
