import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const taskTitle = 'test';
  const label = '할 일';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('Add tasks', () => {
    const { container, getByRole, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText(label), {
      target: {
        value: taskTitle,
      },
    });

    expect(getByLabelText(label).value).toBe(taskTitle);

    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(container).toHaveTextContent(taskTitle);
  });

  it('Clear Input After Click add.', () => {
    const { getByLabelText, getByRole } = render(<App />);
    fireEvent.change(getByLabelText(label), {
      target: {
        value: taskTitle,
      },
    });
    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(getByLabelText(label).value).toBe('');
  });

  it('Delete Tasks', () => {
    const task = { id: 100, title: '숨 쉬기' };

    const { container, getByRole, getAllByRole, getByLabelText } = render(
      <App />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');

    fireEvent.change(getByLabelText(label), {
      target: {
        value: task.tiotle,
      },
    });
    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(container).not.toHaveTextContent('할 일이 없어요!');

    const buttons = getAllByRole('button', { name: '완료' });

    expect(buttons).toHaveLength(1);
    fireEvent.click(buttons[0]);
    expect(container).not.toHaveTextContent(task.title);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
