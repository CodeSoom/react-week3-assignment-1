// assertion A(actual)가 B(expect)여야 한다.

function add(x, y) {
  // TODO:
  return x + y;
}

test('add', () => {
  expect(add(1, 3)).toBe(4);
});

// Signature - name(add), parameters, return(result)

// TDD Cycle: RED - GREEN - REACTORING
