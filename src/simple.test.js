function add(x, y) {
  return x + y;
}
test('add', () => {
  expect(add(1, 3)).toBe(4);
});

//signature : method, func에 대해 구분할 수 있는 특징 name(add), parameters(x,y), return(result)
