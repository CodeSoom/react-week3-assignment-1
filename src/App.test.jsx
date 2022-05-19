import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('App 컴포넌트를 렌더한다', () => {
    const { container, getByPlaceholderText, getByText } = render(<App />);

    expect(container).toHaveTextContent('To-do');

    getByPlaceholderText('할 일을 입력해 주세요');
    getByText('추가');

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});

describe('Input', () => {
  context('텍스트가 입력되면', () => {
    const taskTitle = '아무거나 입력하기';

    it('입력한 텍스트가 보여된다', () => {
      const { getByPlaceholderText } = render(<App />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveAttribute('value', taskTitle);
    });
  });

  context('추가 버튼을 클릭하면', () => {
    const taskTitle = '아무거나 추가하기';

    it('할 일 목록에 추가되고 입력창은 초기화된다.', () => {
      const { getByText, getByPlaceholderText, container } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent(taskTitle);
      expect(container).toHaveTextContent('완료');

      expect(input).toHaveAttribute('value', '');
    });
  });
});

describe('List', () => {
  context('할 일이 없으면', () => {
    it('초기값을 보여준다', () => {
      const { container } = render(<App />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있으면', () => {
    const taskTitle = '아무거나 하기';

    it('할 일을 목록에 출력한다.', () => {
      const { getByText, getByPlaceholderText, container } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent(taskTitle);
      expect(container).toHaveTextContent('완료');
    });
  });

  context('할 일이 있고, 완료 버튼을 누르면', () => {
    const taskTitle = '아무거나 추가하고 삭제하기';

    it('목록에서 할 일이 삭제된다', () => {
      const { getByText, getByPlaceholderText, container } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: taskTitle } });

      fireEvent.click(getByText('추가'));
      expect(container).toHaveTextContent(taskTitle);

      fireEvent.click(getByText('완료'));
      expect.not.toHaveTextContent(taskTitle);
    });
  });
});
