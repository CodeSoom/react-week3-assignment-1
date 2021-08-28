import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const value = '과제하기';

  const renderApp = () => render((
    <App />
  ));

  context('input 타이핑을 하면', () => {
    it('타이핑한 내용이 input에 표시되어야 한다.', () => {
      const { container } = renderApp();
      expect(container.querySelector('input').value).toBe('');
      fireEvent.change(container.querySelector('input'), { target: { value } });
      expect(container.querySelector('input').value).toBe(value);
    });
  });

  context('"추가" 버튼을 누르면', () => {
    it('task가 추가되어야 한다.', () => {
      const { container, getByText } = renderApp();
      const prevCountOfItem = container.getElementsByTagName('li').length;
      fireEvent.change(container.querySelector('input'), { target: { value } });
      fireEvent.click(getByText('추가'));
      const nextCountOfItem = container.getElementsByTagName('li').length;
      expect(container).not.toHaveTextContent('할 일이 없어요!');

      expect(container.querySelector('ol')).toBeInTheDocument();
      expect(container.querySelector('ol')).toHaveTextContent(value);
      expect(nextCountOfItem).toBe(prevCountOfItem + 1);
    });

    it('input이 비워져야 한다.', () => {
      const { container, getByText } = renderApp();
      fireEvent.change(container.querySelector('input'), { target: { value } });
      expect(container.querySelector('input')).toHaveValue(value);
      fireEvent.click(getByText('추가'));
      expect(container.querySelector('input')).toHaveValue('');
    });
  });

  context('"완료" 버튼을 누르면', () => {
    it('완료된 task가 삭제 되어야 한다.', () => {
      const { container, getByText } = renderApp();
      fireEvent.change(container.querySelector('input'), { target: { value } });
      fireEvent.click(getByText('추가'));
      const prevCountOfItem = container.getElementsByTagName('li').length;
      fireEvent.click(getByText('완료'));
      const nextCountOfItem = container.getElementsByTagName('li').length;
      expect(nextCountOfItem).toBe(prevCountOfItem - 1);
    });
  });
});
