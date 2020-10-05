function add() {
  return 4;
}

// test의 기본 구조
test('simple', () => {
  // assertion => A(actual)가 B(expect)여야 한다.
  expect(1 + 1).toBe(2);
});

test('add', () => {
  expect(add(1, 3)).toBe(4);
});

//Signature - name(add), parameters(x, y), return(result) 이것을 모두 가지고 있을 때

// npx jest --watchAll : project에 있는 test코드들을 모두 감시한다. 

// 1. 실패하는 test 코드를 작성 : Red
// 2. 통과하는 test 코드를 작성 : Green
// 3. 올바른 test 코드를 작성 : Refactoring