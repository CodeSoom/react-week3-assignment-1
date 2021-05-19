import { render, screen } from '@testing-library/react';
import List from './List';

describe('<List />', () => {
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 1,
      title: '뭐라도 하기 2',
    },
  ];

  const emptyTasks = [];
  it('renders text when tasks does not exist', () => {
    render(<List tasks={emptyTasks} />);

    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  it('renders tasks', () => {

  });

  it('calls onClickDelete', () => {});
});
