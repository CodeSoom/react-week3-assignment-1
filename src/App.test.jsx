import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  context('task가 없으면', () => {
    it('빈 메시지를 보여준다', () => {
      const { container } = render((
        <App />
      ));
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task가 있으면', () => {
    const taskTitle = '아리 산책가기';

    it('할 일 목록을 보여주고 초기화한다.', async () => {
      const user = userEvent.setup();

      const { getByPlaceholderText, getByText, container } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      await user.type(input, taskTitle);
      expect(input).toHaveValue(taskTitle);

      await user.click(getByText('추가'));
      expect(input).toHaveValue('');

      expect(container).toHaveTextContent(taskTitle);
    });
  });

  describe('완료 버튼 클릭은', () => {
    it('할 일 목록을 삭제한다.', async () => {
      const user = userEvent.setup();
      const taskTitle = '아리 산책가기';

      const { getByPlaceholderText, getByText, container } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      await user.type(input, taskTitle);

      expect(input).toHaveValue(taskTitle);

      await user.click(getByText('추가'));
      expect(input).toHaveValue('');

      expect(container).toHaveTextContent(taskTitle);

      await user.click(getByText('완료'));

      expect(container).not.toHaveTextContent(taskTitle);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
