import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  describe('마운트 되면', () => {
    it('"할 일" 라벨과 "추가" 버튼이 있다', () => {
      const { container } = render((
        <Input />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });
  });

  context('입력값이 주어지지 않으면', () => {
    it('value가 공백이어야 한다.', () => {
      const { getByPlaceholderText } = render(<Input />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      expect(input).toHaveValue('');
    });
  });

  context('입력값이 주어지면', () => {
    const textContent = '아리 산책가기';
    it('value가 입력값이어야 한다.', async () => {
      const user = userEvent.setup();

      const { getByPlaceholderText } = render(<Input />);

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      await user.type(input, textContent);

      expect(input).toHaveValue(textContent);
    });
  });
});
