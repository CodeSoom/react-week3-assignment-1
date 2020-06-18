import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';

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
      {
        id: 2,
        title: '할 일2',
      },
    ];
    it('추가된 할 일과 완료버튼이 보인다.', () => {
      const { container } = render(
        <List tasks={tasks} onClickDelete={handleClickDeleteTask} />,
      );
      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');

      expect(container).toHaveTextContent('완료');
    });

    context(' "할 일 1"의 완료 버튼을 클릭하면', () => {
      const tasks2 = [
        {
          id: 1,
          title: '할 일1',
        },
      ];

      it(' "할 일 1"이 보이지 않는다.', async () => {
        const { container, getByText } = render(
          <List tasks={tasks2} onClickDelete={handleClickDeleteTask} />,
        );

        expect(container).toHaveTextContent('할 일1');

        expect(handleClickDeleteTask).not.toBeCalled();

        fireEvent.click(getByText('완료'));

        expect(handleClickDeleteTask).toBeCalledTimes(1);

        const text = await waitFor(() => getByText('완료'));

        expect(text).not.toHaveTextContent('할 일1');
      });
    });
  });
});
