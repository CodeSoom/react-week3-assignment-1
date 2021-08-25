import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

// 공식 문서 https://jestjs.io/docs/tutorial-react

// 아래는 공식문서에서 연결된 사이트. good 여기 위주로 참고
// https://testing-library.com/docs/react-testing-library/example-intro/
// https://testing-library.com/docs/dom-testing-library/cheatsheet/

// jest-dom git
// https://github.com/testing-library/jest-dom

// context, describe , it 문법 사용하기
// https://rinae.dev/posts/react-testing-tutorial-kr 참고.

// render() = DOM에 컴포넌트 렌더링
// fireEvent = 특정 이벤트 발생.

describe('Page', () => {
  it('Page', () => {
    const tasks = [];
    const taskTitle = '';

    const handleChangeTitle = jest.fn();
    const handleClickAddTask = jest.fn();
    const handleClickDeleteTask = jest.fn();

    // getByText 는 text가 있는지 검사
    const { getByText } = render(
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />,
    );

    // jest-dom 함수인 toBeIntheDocument
    // = This allows you to assert whether an element is present in the document or not.
    expect(getByText('To-do')).toBeInTheDocument();
  });
});
