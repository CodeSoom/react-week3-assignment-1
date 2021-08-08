import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from './Page';

test('Page 컴포넌트 구성요소는 h1, Input, List로 이루어져있다.', () => {
  const { container, getByPlaceholderText } = render(<Page tasks={[]} />);

  expect(container).toContainHTML('h1');
  expect(container).toHaveTextContent('To-do');

  // 여기를 Input, List로 테스트 할 수 있는 방법은 없는 것인가요?
  expect(container).toContainHTML('input');
  getByPlaceholderText('할 일을 입력해 주세요');

  expect(container).toContainHTML('ol');
  expect(container).toHaveTextContent('추가');

  expect(container.firstChild).toMatchSnapshot();
});

test('할 일을 작성하면, list에 목록이 추가된다.', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByPlaceholderText, getByText } = render(
    <Page tasks={[]} onChangeTitle={onChange} onClickAddTask={onClick} />,
  );
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const submitButton = getByText('추가');

  userEvent.type(input, '오늘의 할 일');
  expect(onChange).toBeCalled();

  userEvent.click(submitButton);
  expect(onClick).toBeCalled();

  // 추가가 되는 것을 테스트할 수 없음..
  // expect(container).toHaveTextContent('오늘의 할 일');
  // expect(container).toContainHTML('')
});

test('할 일을 완료하면, 리스트 목록에서 제거된다.', () => {
  const tasks = [{
    id: 1,
    title: '뭐라도 하기',
  }];

  const onDeleteItem = jest.fn();

  const { container, getByText } = render(
    <Page tasks={tasks} onClickDeleteTask={onDeleteItem} />,
  );

  expect(container).toHaveTextContent('뭐라도 하기');
  expect(container).toHaveTextContent('완료');
  expect(onDeleteItem).not.toBeCalled();

  userEvent.click(getByText('완료'));
  expect(onDeleteItem).toBeCalledWith(1);

  // 삭제가 되는 것을 테스트할 수 없음..
  expect(container).not.toHaveTextContent('뭐라도 하기');
});
