import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

// 아래 주석은 과정을 기록용입니다.
// 문제 해결하는 과정을 기록하여
// 자기객관화 및 트레이너님께 코딩습관을 공유드리기 위해 작성해보았습니다.
// 정식으로 과제 제출을 하기전에는 삭제하도록 하겠습니다.

/**  Item 컴포넌트의 기능은 무엇인가?
---------------------------------------------------------------------------
  1) title 보여주기
  2)완료버튼 누르면 해당 컴포넌트를 list에서 제외 시키는 것

    => 1)은 샘플코드로 구현되어있다
    => 2)의 기능은 누구의 책임인가? (Item vs List)
    => 만약 Item에서 처리한다면 어떻게 test할 수 있을까?

---------------------------------------------------------------------------
문제 해결 과정 기록
---------------------------------------------------------------------------

=> 일단 Item은 onClickDelete를 실행하는 곳이다. onClickDelete 기능테스트를 추가해보기 (완료)
=> onClickDelete 실행시 let tasks (array)에서 해당되는 id값을 가진 값을 제거하라 (완료)
=> let을 사용하지 말고, const로 array를 선언하라 (완료)
=> 테스트를 2개로 분리하라 : Item 컴포넌트 그리기 테스트, onClickDelete 작동테스트 (완료)
=> 코드 중복을 제거하라 : 공통으로 사용하는 값 셋팅을 분리 해야함. (부분 완료)
=> 한벌의 테스트로 묶어라
*/
describe('Item Component Test', () => {
  const task = {
    id: 1,
    title: '뭐라도 하기',
  };
  const expectedTasks = [
    { id: 2, title: 'jest 공부 하기' },
    { id: 3, title: 'mock 공부 하기' },
  ];
  const defaultTasks = [task].concat(expectedTasks);
  const state = { tasks: defaultTasks };
  const handleClickDelete = jest.fn((id) => {
    state.tasks = defaultTasks.filter((item) => item.id !== id);
  });

  /** getByText도 두테스트에서 같이 사용하고 싶었으나, 오류가 나서 각각 선언.
   * 오류 위치 : run onClickDelete 의 getByText 부분
   * 오류 내용은 PR comment에도 기록하겠습니다!
   */

  // const { container, getByText } = render(
  //   <Item task={task} onClickDelete={handleClickDelete} />,
  // );
  beforeEach(() => {
    state.tasks = defaultTasks;
  });

  test('rendering Item component', () => {
    const { container, getByText } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );

    expect(container).toHaveTextContent('뭐라도 하기');
    expect(container).toHaveTextContent('완료');

    expect(handleClickDelete).not.toBeCalled();

    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalledWith(1);
  });

  test('run onClickDelete Button in Item Component', () => {
    const { getByText } = render(
      <Item task={task} onClickDelete={handleClickDelete} />,
    );
    expect(defaultTasks).toEqual(state.tasks);
    fireEvent.click(getByText('완료'));

    expect(handleClickDelete).toBeCalledWith(1);
    expect(expectedTasks).toEqual(state.tasks);
  });
});
