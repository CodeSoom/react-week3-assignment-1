import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const setup = ({ tasks, handleClick = jest.fn() }) => {
    const utils = render(<List tasks={tasks} onClickDelete={handleClick} />);

    return { ...utils };
  };

  context('empty tasks', () => {
    const tasks = [];

    it('"할 일이 없어요!" 확인', () => {
      const { container } = setup({ tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('exist tasks', () => {
    const tasks = [
      { id: 1, title: '아무것도 안하기' },
      { id: 2, title: '본격적으로 아무것도 안하기' },
    ];

    it('"아무것도 안하기", "본격적으로 아무것도 안하기" 확인', () => {
      const { container } = setup({ tasks });

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });

    it('완료 버튼 클릭 시 handleClick 호출 확인', () => {
      const handleClick = jest.fn();

      const { getAllByText } = setup({ tasks, handleClick });
      const buttons = getAllByText('완료');

      expect(handleClick).not.toBeCalled();

      buttons.forEach((button) => fireEvent.click(button));

      expect(handleClick).toBeCalledTimes(2);
    });
  });
});
