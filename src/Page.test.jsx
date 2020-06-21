import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  it('display Input component', () => {
    const PLACEHOLDER = '할 일을 입력해 주세요';

    const { getByPlaceholderText } = render((
      <Page
        tasks={[]}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
      />
    ));

    const input = getByPlaceholderText(PLACEHOLDER);

    expect(input).toBeInTheDocument();

    expect(handleChangeTitle).not.toBeCalled();
    expect(handleClickAddTask).not.toBeCalled();
  });
});

describe('Page List', () => {
  const handleClickDeleteTask = jest.fn();
  context('when Page loaded', () => {
    it('display List component', () => {
      const { queryByText } = render((
        <Page
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      const list = queryByText('할 일이 없어요!');

      expect(list).toBeInTheDocument();
    });
  });
});
