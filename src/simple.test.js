// 첫 번째 인자 테스트 이름
// 테스트할 함수
test('simple', () => {
  // assertion:: A(actual)가 B(expect)이어야 한다.
  expect(1 + 1).toBe(2);
});

// ★TDD cycle
// RED - GREEN(return 4) - REFACTORING(x,y)
function add(x, y) {
  // TODO;
  return x + y;
}

test('add', () => {
  expect(add(1, 3)).toBe(4);
});

// signature:: name(add), parameters(x, y), return(result)
// 어떤 메서드 이름, 인자 개수, 그 메서드 실행 결과
