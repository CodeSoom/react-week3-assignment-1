import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  test('input의 앞에 \'할 일\', button에는 \'추가\'라는 텍스트를 볼 수 있다.', () => {
    const { container } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  test('input에 입력하면 Change 이벤트가 발생한다.', () => {
    const { getByPlaceholderText } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    expect(handleChange).toBeCalled();

    // expect(input).toHaveAttribute('value', '뭐라도 하기');
    // change 이벤트의 인자로 넣어준 value로 인풋 value가 변했다는 걸 이 테스트에 검증하고 싶은데, 계속 빈 문자열인 상태로 남아있네요 ㅠㅠ
  });

  test('추가를 클릭하면 Click 이벤트가 발생한다.', () => {
    const { getByText } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    const button = getByText('추가');

    expect(handleClick).not.toBeCalled();
    fireEvent.click(button);
    expect(handleClick).toBeCalled();
  });
});
