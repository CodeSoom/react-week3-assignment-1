test('simple', () => {
  // assertion A(actual)가 B(except)여야 한다.
  expect(1 + 1).toBe(2);
});


// Signature: 메서드나 펑션에 대한 구별할 수 있는 특징
// Signatuire - name(add), parameters(x, y), return(result)
function add(x, y) {
  return x + y;
}

test('add', () => {
  expect(add(1, 3)).toBe(4);
});

// TDD Cycle: Red - Green -Refactopring
