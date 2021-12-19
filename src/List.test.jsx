// 짝 프로그래밍
// 협력 구현 - 짝 프로그래밍, 정밀 검토, 공식, 비공시적인 코드 검토
//  ㄴ 같이 구현한다.
// 진행 과정 - 3분 씩 코드를 짠다.

// 계획
/**
 * 어떤 것을 테스트할까?
 * 1. tasks가 잘 그려지는지
 *   ㄴ tasks가 비어있는 경우
 *   ㄴ tasks가 있는 경우
 * 2. 완료 버튼을 눌렀을 때 이벤트가 잘 전달되는지
 */

// End to end

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  // describe(테스트 대상) - context(with, when, without) - it(기대하는 결과)  
  context('when tasks is exists', () => {
    it('renders tasks', () => {
      const tasks = [
        { id: 1, title: '과제 하기'},
      ];
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('과제 하기');
    });
  });

  context('when tasks empty', () => {
    it('renders empty message', () => {
      const tasks = [];
      const { container } = render(<List tasks={tasks} />);
      
      expect(container).toHaveTextContent('할 일이 없어요');
    });
  });

  // 완료 버튼 눌렀을 떄, task의 id가 전달된다.
  describe('Clicking complete button', () => {
    it('calls onClickDelete handler', () => {
      const tasks = [
        { id: 1, title: '과제 하기'},
      ];

      const handleClick = jest.fn();

      const { getByText } = render(<List tasks={tasks} onClickDelete={handleClick}/>);
      
      const completeButton = getByText('완료');
      fireEvent.click(completeButton);

      expect(handleClick).toBeCalledWith(tasks[0].id);
    });
  });
});

// test('3+4 = 7', ()=> {
//   expect(3+4).toBe(7);
// });

// describe('Login Page', () => {
//   context('when user is not logged in', () => {
//     // GIVEN
//     beforeEach(() => {
//       user.logout();      
//     });

//     it('renders login form', () => {
//       // WHEN
//       // render!

//       // THEN
//       expect(container).toHaveTextContent('로그인해 주세요');
//     });
//   });
  
//   // when, with, wihtout
//   context('when already logged in', () => {
//     // GIVEN
//     beforeEach(() => {
//       user.login();      
//     });

//     it('renders user information', () => {
      
//     });
//   });
// });
