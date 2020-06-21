import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('when has no tasks', () => {
    it('renders empty message', () => {
      const tasks = [];

      const onChange = jest.fn();
      const handleClick = jest.fn();
      const handleClickDelete = jest.fn();

      const { container } = render((
        <Page
          tasks={tasks}
          onChange={onChange}
          onClick={handleClick}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(onChange).not.toBeCalled();
      expect(handleClick).not.toBeCalled();
      expect(handleClickDelete).not.toBeCalled();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('When has tasks', () => {
    it('renders List component', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기 1',
        },
        {
          id: 2,
          title: '뭐라도 하기 2',
        },
      ];

      const onChange = jest.fn();
      const handleClick = jest.fn();
      const handleClickDelete = jest.fn();

      const { container, getByText, getAllByText } = render((
        <Page
          tasks={tasks}
          onChange={onChange}
          onClick={handleClick}
          onClickDelete={handleClickDelete}
        />
      ));


      expect(onChange).not.toBeCalled();
      expect(handleClick).not.toBeCalled();
      expect(handleClickDelete).not.toBeCalled();

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
        fireEvent.click(getByText(title));
      });

      tasks.forEach(({ title }, index) => {
        expect(container).toHaveTextContent(title);
        fireEvent.click(getAllByText('완료')[index]);
      });

      tasks.forEach(({ title }) => {
        expect(container).not.toHaveTextContent(title);
      });
    });
  });
});
