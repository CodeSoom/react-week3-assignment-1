import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('초기 화면일 때', () => {
    it('To-do 문구가 화면에 보인다', () => {
      const { container } = render((
        <App />
      ));

      expect(container).toHaveTextContent('To-do');
    });

    it('라벨과 인풋과 버튼이 화면에 보인다', () => {
      const { container, getByPlaceholderText } = render((
        <App />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
      expect(container).toHaveTextContent('추가');
    });

    it('할 일이 없어요! 문구가 보인다', () => {
      const { container } = render((
        <App />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('인풋창에 문자를 입력할 때', () => {
    it('입력한 문자가 화면 인풋창에 보인다', () => {
      const { getByPlaceholderText } = render((
        <App />
      ));
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveDisplayValue('');

      fireEvent.change(input, { target: { value: '할' } });

      expect(input).toHaveDisplayValue('할');

      fireEvent.change(input, { target: { value: '할 일' } });

      expect(input).toHaveDisplayValue('할 일');
    });
  });

  context('추가버튼을 클릭할 때', () => {
    it('인풋창이 빈값으로 초기화된다', () => {
      const { getByPlaceholderText, getByText } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: '할 일' } });

      expect(input).toHaveDisplayValue('할 일');

      fireEvent.click(getByText('추가'));

      expect(input).toHaveDisplayValue('');
    });

    it('목록에 추가된 할 일이 보여진다.', () => {
      const { container, getByPlaceholderText, getByText } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: '할 일' } });
      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent('할 일');
    });
  });

  context('세개의 할 일을 추가할 때', () => {
    it('세개가 순서 대로 보여진다.', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];

      const { getByPlaceholderText, getByText, getAllByRole } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      tasks.forEach((task) => {
        fireEvent.change(input, { target: { value: task.title } });
        fireEvent.click(getByText('추가'));
      });

      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });
  });

  context('3개의 할 일 목록의 삭제버튼을 누를 때', () => {
    it('클릭한 순서 대로 할 일이 삭제된다.', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];
      const {
        container, getByPlaceholderText, getByText, getAllByText,
      } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      tasks.forEach((task) => {
        fireEvent.change(input, { target: { value: task.title } });
        fireEvent.click(getByText('추가'));
      });

      const firstbutton = getAllByText('완료');

      fireEvent.click(firstbutton[1]);
      expect(container).toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).toHaveTextContent('세번째 할 일');
      fireEvent.click(firstbutton[0]);
      expect(container).not.toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).toHaveTextContent('세번째 할 일');
      fireEvent.click(firstbutton[2]);
      expect(container).not.toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).not.toHaveTextContent('세번째 할 일');

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
