Feature('Complete To-do');

const tasks = ['코드숨 과제하기', '아무것도 하지 않기'];

Scenario('할 일을 완료하면 할 일이 목록에서 보이지 않는다.', (I) => {
  I.amOnPage('/');

  tasks.forEach((it) => {
    I.fillField('input', it);
    I.click('추가');
  });

  tasks.forEach(() => I.click('완료'));

  tasks.forEach((it) => I.dontSee(it));
});
