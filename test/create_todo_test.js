const assert = require('assert');

Feature('Create To-do');

Scenario('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다.', (I) => {
  I.amOnPage('/');

  I.fillField('input', '아무것도 하지 않기');
  I.click('추가');

  I.see('아무것도 하지 않기');
});

Scenario('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다.', async (I) => {
  I.amOnPage('/');

  I.fillField('input', '아무것도 하지 않기');

  I.click('추가');

  I.see('아무것도 하지 않기');

  const value = await I.grabValueFrom('input');

  assert.equal('', value);
});
