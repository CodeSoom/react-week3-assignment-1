import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트', () => {
  context('화면을 그릴때', () => {
    it('Page 컴포넌트를 보여준다', () => {
      const { container } = render((
        <App />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가할 일이 없어요!');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('값이 입력되면', () => {
    it('input에 값이 보여진다', () => {
      const { getByLabelText } = render((
        <App />
      ));
      const input = getByLabelText('할 일');
      fireEvent.change(input, { target: { value: '입력 값' } });

      expect(input).toHaveDisplayValue('입력 값');
    });
  });

  context('추가를 누르면', () => {
    const taskTitle = 'newTask';

    it('할일 목록에 추가된다', () => {
      const { container, getByText, getByLabelText } = render((
        <App />
      ));

      const button = getByText('추가');
      const input = getByLabelText('할 일');

      fireEvent.change(input, { target: { value: taskTitle } });

      expect(input).toHaveDisplayValue('newTask');

      fireEvent.click(button);

      expect(input).toHaveDisplayValue('');
      expect(container).toHaveTextContent('newTask');
    });
  });

  describe('handleClickDeleteTask', () => {
    context('완료를 누르면', () => {
      const tasks = [
        {
          id: 1,
          title: '할일1',
        },
        {
          id: 2,
          title: '할일2',
        },
        {
          id: 3,
          title: '할일3',
        },
      ];

      it('할일 목록에서 삭제된다', () => {
        const {
          container, getByText, getByLabelText, getAllByText,
        } = render((
          <App />
        ));

        const input = getByLabelText('할 일');
        const button = getByText('추가');

        tasks.forEach((task) => {
          fireEvent.change(input, { target: { value: task.title } });

          fireEvent.click(button);
        });

        expect(container).toHaveTextContent('할일1');
        expect(container).toHaveTextContent('할일2');
        expect(container).toHaveTextContent('할일3');

        getAllByText('완료').forEach((complete) => {
          fireEvent.click(complete);
        });

        expect(container).not.toHaveTextContent('할일1');
        expect(container).not.toHaveTextContent('할일2');
        expect(container).not.toHaveTextContent('할일3');
      });
    });
  });
});
