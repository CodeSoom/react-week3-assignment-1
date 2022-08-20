import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page/>', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const tasks = [
    { id: 1, title: '뭐라도 하기' },
    { id: 2, title: '코드숨 과제' },
  ];

  it('renders <Input/> field', () => {
    const { container } = render(
      <Page
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAdd}
        tasks={tasks}
        onClickDeleteTask={handleClickDelete}
      />,
    );

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('changes input value', () => {
    const { getByPlaceholderText } = render(
      <Page
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAdd}
        tasks={tasks}
        onClickDeleteTask={handleClickDelete}
      />,
    );

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: 'Changed' } });

    expect(input.value).toBe('Changed');
  });

  context('with tasks', () => {
    it('renders <List/> field', () => {
      const { container } = render(
        <Page
          onChangeTitle={handleChange}
          onClickAddTask={handleClickAdd}
          tasks={tasks}
          onClickDeleteTask={handleClickDelete}
        />,
      );

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('코드숨 과제완료');
    });

    it('clicks "추가" button for adding task', () => {

    });
  });

  context('without tasks', () => {

  });
});
