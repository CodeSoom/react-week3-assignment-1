import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Show text (To-do & 할 일 & 추가)', () => {
    const { queryByText } = render(<App />);

    expect(queryByText('To-do')).not.toBeNull();
    expect(queryByText('할 일')).not.toBeNull();
  });

  it('Render Input component', () => {
    render(<App />);

    const task = screen.getByLabelText('할 일');
    const button = screen.getByText('추가');

    expect(task).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Render List component', () => {
    const { queryByText } = render(<App />);

    expect(queryByText('할 일이 없어요!')).not.toBeNull();
  });

  context('When put a value in Input', () => {
    it('OnChange Event Occurred', () => {
      render(<App />);

      const task = screen.getByLabelText('할 일');

      fireEvent.change(task, { target: { value: '아무거나' } });

      expect(task.value).toBe('아무거나');
    });
  });

  context('When click 추가 button', () => {
    it('Adds task', () => {
      const { queryByText } = render(<App />);

      const task = screen.getByLabelText('할 일');

      fireEvent.change(task, { target: { value: '아무거나' } });

      expect(task.value).toBe('아무거나');

      fireEvent.click(screen.getByText('추가'));

      expect(queryByText('아무거나')).not.toBeNull();
    });
  });

  context('When click 완료 button', () => {
    it('Delete task', () => {
      const { queryByText } = render(<App />);

      const task = screen.getByLabelText('할 일');

      fireEvent.change(task, { target: { value: '아무거나' } });

      fireEvent.click(screen.getByText('추가'));

      fireEvent.click(screen.getByText('완료'));

      expect(queryByText('할 일이 없어요!')).not.toBeNull();
    });
  });
});
