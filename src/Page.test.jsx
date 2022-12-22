import { render, fireEvent } from '@testing-library/react';

import Page from './Page';
import items from './__fixtures__/items';

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
      tasks={tasks}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelte}
    />
  ));

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

  it('listens change input event', () => {
    const { getByRole } = renderPage(initailState);

    fireEvent.change(getByRole('textbox'), { target: { value: 'study' } });

    expect(handleChange).toBeCalled();
  });

  it('listens click add event', () => {
    const { getByText } = renderPage(initailState);

    fireEvent.click(getByText('추가'));
    expect(handleClickAdd).toBeCalled();
  });

  context('without task', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = renderPage(initailState);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const { container } = renderPage({ ...initailState, tasks: items });

      items.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('listens click delete event', () => {
      const { getAllByText } = renderPage({ ...initailState, tasks: items });

      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDelte).toBeCalledTimes(items.length);
    });
  });
});
