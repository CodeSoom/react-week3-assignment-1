import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

function addTask(getByText) {
  const addTaskBtn = getByText('추가');
  fireEvent.click(addTaskBtn);
}

describe('App', () => {
  describe('추가버튼을 클릭하면', () => {
    it('빈값이라도 등록된다', () => {
      // given
      const { getByText, getAllByRole } = render(<App />);

      // when
      addTask(getByText);

      // then
      const result = getAllByRole('listitem');
      expect(result).toHaveLength(1);
    });

    it('input box의 값이 등록된다', () => {
      // given
      const { getByText, getByRole, getAllByRole } = render(<App />);
      const sut = getByRole('textbox');
      const expectValue = '테스트';
      fireEvent.change(sut, { target: { value: expectValue } });

      // when
      addTask(getByText);

      // then
      const result = getAllByRole('listitem');
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveTextContent(expectValue);
    });

    it('클릭 회수만큼 등록된다', () => {
      // given
      const expectCount = 3;
      const { getByText, getAllByRole } = render(<App />);

      // when
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < expectCount; i++) {
        addTask(getByText);
      }

      // then
      const result = getAllByRole('listitem');
      expect(result).toHaveLength(expectCount);
    });
  });

  describe('완료버튼을 클릭하면', () => {
    it('마지막 1개이면 안내문구가 반환된다', () => {
      // given
      const expectValue = '할 일이 없어요!';
      const { getByText } = render(<App />);
      addTask(getByText);
      const sut = getByText('완료');

      // when
      fireEvent.click(sut);

      // then
      const result = getByText(expectValue);
      expect(result).toBeDefined();
    });

    it('해당 Item은 제거된다', () => {
      // given
      const { getByText, getAllByText, getAllByRole } = render(<App />);
      addTask(getByText);
      addTask(getByText);
      const sut = getAllByText('완료');

      // when
      fireEvent.click(sut[0]);

      // then
      const result = getAllByRole('listitem');
      expect(result).toHaveLength(1);
    });
  });
});
