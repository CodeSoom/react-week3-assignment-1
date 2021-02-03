import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const onClickDelete = jest.fn();

  const tasks = [
    { id: 1, title: '어서와 TDD는 처음이지?' },
    { id: 2, title: '아직 시작도 안했어 ^^' },
    { id: 3, title: '재미난 TDD 출바알~' },
  ];

  const renderList = (items = []) => render((
    <List tasks={items} onClickDelete={onClickDelete} />
  ));

  context('when null type', () => {
    it('prompts empty message', () => {
      const { container } = renderList(null);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('without tasks', () => {
    it('prompts empty message', () => {
      const { container } = renderList();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders title of the tasks', () => {
      const { container } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('renders 완료 button', () => {
      const { getAllByText } = renderList(tasks);

      const completeButtonLength = getAllByText('완료').length;

      expect(completeButtonLength).toBe(tasks.length);
    });

    it('triggers onClickDelete attached to the button with text 완료', () => {
      const { getAllByText } = renderList(tasks);

      const completeButton = getAllByText('완료');

      completeButton.forEach((button) => {
        fireEvent.click(button);
      });

      expect(onClickDelete).toBeCalledWith(tasks.length);
    });
  });
});
