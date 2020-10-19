function add(x, y) {
  return x + y;
}

// test('simple', () => {
//   // assertion => A(actual)가 B(expect)여야 한다.
//   expect(1 + 1).toBe(2);
// });

test('add', () => {
  expect(add(1, 3)).toBe(4);
});
// Signature - name(add), parameters(x, y), return(result)

// TDD Cycle: RED - GREEN - REACTORING
