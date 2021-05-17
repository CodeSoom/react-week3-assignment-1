function add(x, y) {
  //ToDo :
 return x + y;
}

test('add', () => {
  expect(add(1, 3)).toBe(4);
});

//signature - name(add), parmeters(x, y), return(result)