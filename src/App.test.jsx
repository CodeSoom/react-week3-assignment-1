/*
 * TODO:
 * 1. 처음 렌더링이 되면
 *   1-1. 할 일이 없을 때
 *     1-1-1. To-do 타이틀이 보여야 한다.
 *    1-1-2. 할 일 이라는 입력창 타이틀과 입력창이 보여야 한다.
 *    1-1.3 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 *
 * 2. 글을 추가 할 때
 *   2-1. 글을 입력할 때
 *     2-1-1. 입력한 글이 입력창에 보여야 한다.
 *   2-2. 추가 버튼 클릭 시
 *     2-2-1. 할 일 목록에 보여야 한다.
 *     2-2-2. 추가된 글과 함께 완료 버튼도 보여야 한다.
 *     2-2-3. 입력창의 입력값이 비워지고 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 * 3. 글을 삭제 할 때
 *   3-1. 완료 버튼 클릭 시
 *     3-1-1. 해당 글이 삭제 되야 한다.
 *     3-1-2. 모든 글이 완료되어 삭제 되면 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('렌더링 되면', () => {
    it('할 일이 없을 때', () => {
      const { container } = render(<App />);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('글을 추가 할 때', () => {
    it('입력창에 입력된 값을 보여 준다', () => {
      const taskTitle = '테스트 하기';

      const { getByPlaceholderText } = render(<App />);

      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputNode, {
        target: { value: taskTitle },
      });

      expect(inputNode).toHaveProperty('value', '테스트 하기');
    });

    it('추가 버튼을 클릭하면 입력창의 글이 삭제 된다', () => {
      const taskTitle = '테스트 하기';

      const { getByPlaceholderText, getByText } = render(<App />);

      const buttonNode = getByText('추가');
      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(inputNode, {
        target: { value: taskTitle },
      });

      expect(inputNode).toHaveProperty('value', '테스트 하기');

      fireEvent.click(buttonNode);

      expect(inputNode).toHaveProperty('value', '');
    });
  });

  context('할일 목록의 글이 있을 때', () => {
    const tasks = [
      {
        id: 1,
        title: '테스트하기',
      },
      {
        id: 2,
        title: '운동하기',
      },
    ];

    it('할 일 목록과 완료 버튼이 보여야 한다', () => {
      const {
        container, getByPlaceholderText, getByText, queryAllByText,
      } = render(<App />);

      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');
      const buttonNode = getByText('추가');

      tasks.forEach((task) => {
        fireEvent.change(inputNode, {
          target: { value: task.title },
        });

        fireEvent.click(buttonNode);
      });

      const buttons = queryAllByText('완료');
      expect(container).toHaveTextContent('테스트하기');
      expect(container).toHaveTextContent('운동하기');
      expect(tasks.length).toBe(buttons.length);
    });

    it('완료 버튼 클릭시 글이 삭제 된다', () => {
      const {
        container, getByPlaceholderText, getByText, queryAllByText,
      } = render(<App />);

      const inputNode = getByPlaceholderText('할 일을 입력해 주세요');
      const buttonNode = getByText('추가');

      tasks.forEach((task) => {
        fireEvent.change(inputNode, {
          target: { value: task.title },
        });

        fireEvent.click(buttonNode);
      });

      const buttons = queryAllByText('완료');

      buttons.map((button) => fireEvent.click(button));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
