import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('잘 그려질 때', () => {
    it('App이 그려진다.', () => {
      const { container } = render(<App />);
      expect(container);
    });
  });
});

context('잘 작동할 때', () => {
  const AppComponent = () => render((<App />));
  const taskTitle = 'test';
  const tasks = [
    { id: 100, title: '숨 쉬기' },
    { id: 101, title: '물 마시기' },
  ];

  it('할 일 1개 입력할 수 있다.', () => {
    const { container, getByRole, getByLabelText } = AppComponent();

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: taskTitle,
      },
    });

    expect(getByLabelText('할 일').value).toBe(taskTitle);

    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(container).toHaveTextContent(taskTitle);
  });

  it('할 일을 1개 입력 후 추가 버튼을 클릭하면, 입련 란이 빈 값이 된다.', () => {
    const { getByLabelText, getByRole } = AppComponent();

    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: taskTitle,
      },
    });
    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(getByLabelText('할 일').value).toBe('');
  });

  it('할 일을 2개 입력하고 2개 삭제하면 "할 일이 없어요!"가 뜬다. ', () => {
    const {
      container, getByRole, getAllByRole, getByLabelText,
    } = AppComponent();

    tasks.forEach((task) => {
      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: task,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));
    });
    const buttons = getAllByRole('button', { name: '완료' });

    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);
    expect(container).not.toHaveTextContent(tasks[1].title);
    fireEvent.click(buttons[0]);
    expect(container).not.toHaveTextContent(tasks[0].title);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
