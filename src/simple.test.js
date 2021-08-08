function add(x, y) {
  return x + y;
}

test('add', () => {
  expect(add(1, 3)).toBe(4);
});
// test('simple', () => {
//   // A 가 B 여야한다.
//   // assertion A (actual)가 B(expects)여야한다.
//   expect(1 + 1).toBe(2);
// });

// Signature => name(add) , parameter (x, y) return (result)
// 첫번째 인자는 테스트의 이름 그다음 function
