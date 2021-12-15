import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App Component', () => {
  const taskTitle = '코드숨 과제하기';
  const renderComponent = () => render((
    <App />
  ));

  context('Todo Appender', () => {
    it('할 일을 입력할 수 있다.', () => {
      const { getByPlaceholderText } = renderComponent();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      expect(input).toHaveAttribute('value', taskTitle);
    });

    it('할 일을 입력 후 추가 버튼을 클릭하면, 입련 란이 빈 값이 된다.', () => {
      const { getByPlaceholderText, getByRole } = renderComponent();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));

      expect(input).toHaveAttribute('value', '');
    });
  });
});
