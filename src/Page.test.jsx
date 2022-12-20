import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const initailState = {
    taskTitle: '',
    tasks: [],
  };
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelte = jest.fn();

  const renderPage = ({ taskTitle, tasks }) => render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      tasks={tasks}
      onClickDeleteTask={handleClickDelte}
    />
  ));

  context('when first render', () => {
    it('renders "To-do"', () => {
      const { container } = renderPage(initailState);

      expect(container).toHaveTextContent('To-do');
    });

    it('renders Input', () => {
      const { getByRole, getByText } = renderPage(initailState);

      expect(getByRole('textbox')).toBeInTheDocument();
      expect(getByRole('textbox')).toHaveAttribute('placeholder', '할 일을 입력해 주세요');
      expect(getByText('추가')).toBeInTheDocument();
    });

    it('renders List', () => {
      const { container } = renderPage(initailState);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when change input', () => {
    it('renders change input', () => {
      const { getByRole } = renderPage(initailState);

      fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });
      expect(handleChange).toBeCalled();
    });

    it('handles click add', () => {
      const { getByText } = renderPage(initailState);

      fireEvent.click(getByText('추가'));
      expect(handleClickAdd).toBeCalled();
    });
  });

  context('with tasks', () => {
    const tasks = [
      {
        id: 1,
        title: 'study',
      },
      {
        id: 2,
        title: 'play',
      },
    ];
    it('renders tasks', () => {
      const { container } = renderPage({ ...initailState, tasks });

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('handles click delete', () => {
      const { getAllByText } = renderPage({ ...initailState, tasks });

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDelte).toBeCalledTimes(tasks.length);
    });
  });
});
