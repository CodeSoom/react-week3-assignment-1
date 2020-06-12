Feature('To-do');

Scenario('아무런 To-do가 등록되어 있지 않으면 "할 일이 없어요!"라는 메시지가 보인다.', (I) => {
  I.amOnPage('/');

  I.see('할 일이 없어요!');
});
