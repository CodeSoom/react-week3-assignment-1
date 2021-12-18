import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('App이 그려진다.', () => {
    const { container } = render(<App />);
    expect(container);
  });

  it('할 일을 입력할 수 있다.', () => {
    const { container, getByRole, getByLabelText } = render((<App />));
    const taskTitle = 'test';

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: taskTitle,
      },
    });

    expect(getByLabelText('할 일').value).toBe(taskTitle);

    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(container).toHaveTextContent(taskTitle);
  });

  it('할 일을 추가하면, 입련 란이 빈 값이 된다.', () => {
    const { getByLabelText, getByRole } = render((<App />));
    const taskTitle = 'test';

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: taskTitle,
      },
    });
    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(getByLabelText('할 일').value).toBe('');
  });

  it('할 일을 추가하고 모두 삭제하면 "할 일이 없어요!"가 뜬다. ', () => {
    const tasks = [
      { id: 100, title: '숨 쉬기' },
    ];

    const {
      container, getByRole, getAllByRole, getByLabelText,
    } = render((<App />));

    tasks.forEach((task) => {
      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: task,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));
    });
    const buttons = getAllByRole('button', { name: '완료' });

    expect(buttons).toHaveLength(1);
    fireEvent.click(buttons[0]);
    expect(container).not.toHaveTextContent(tasks[0].title);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
