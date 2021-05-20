import { fireEvent, screen, render } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  it('changes taskTitle', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });

    expect(screen.getByLabelText('할 일')).toHaveAttribute('value', '뭐라도 하기');
  });

  it('creates new task', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });
    fireEvent.click(screen.getByRole('button', { name: '추가' }));

    screen.getByText('뭐라도 하기');
  });

  it('deletes a task', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });
    fireEvent.click(screen.getByRole('button', { name: '추가' }));
    fireEvent.click(screen.getByRole('button', { name: '완료' }));

    screen.getByText('할 일이 없어요!');
  });
});
