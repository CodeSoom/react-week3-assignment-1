function add(x, y) {
  return x + y;
}

// 첫번째 인자는 test의 이름이다.
test("add", () => {
  // assertion => A(actual)가 B(expect)여야 한다.
  expect(add(1, 3)).toBe(4); // 앞에 있는 1+1이 actual 2가 expect가 된다.
});

// Signature = name(add), parameters(x,y), return(result)
