import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const onClickAddTask = jest.fn();
  const onChangeTitle = jest.fn();
  const onClickDeleteTask = jest.fn();

  const renderElement = (task) => (
    <Page
      tasks={task}
      onClickAddTask={onClickAddTask}
      onChangeTitle={onChangeTitle}
      onClickDeleteTask={onClickDeleteTask}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('처음 Page를 들어왔을 때', () => {
    it('요소들이 잘 보이는가', () => {
      const { getByPlaceholderText, getByText } = render(
        renderElement([]),
      );
      getByPlaceholderText('할 일을 입력해 주세요');
      getByText('할 일이 없어요!');
      getByText('추가');
    });
  });

  describe('할 일을 적었을 때', () => {
    it('onChange가 잘 전달 되는가', () => {
      const { getByPlaceholderText } = render(
        renderElement([]),
      );
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: 'test할일' } });

      expect(input.value).toEqual('test할일');
    });
  });

  describe('추가를 눌렀을 때', () => {
    it('onClickAddTask가 잘 전달 되는가', () => {
      const task = [{
        id: 1,
        title: '뭐라도 하기',
      }];
      const { getByText } = render((
        renderElement(task)
      ));

      expect(onClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(onClickAddTask).toBeCalled();
    });
  });

  describe('tasks가 있을 때', () => {
    it('목록들이 잘 보이는가', () => {
      const task = [{
        id: 1,
        title: '뭐라도 하기',
      }];
      const { getByText } = render((
        renderElement(task)
      ));

      getByText('뭐라도 하기');
    });
  });

  describe('task의 완료를 눌렀을 때', () => {
    it('onClickDeleteTask가 잘 전달 되는가', () => {
      const task = [{
        id: 1,
        title: '뭐라도 하기',
      }];
      const { container, getAllByText } = render((
        renderElement(task)
      ));

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('완료');

      expect(onClickDeleteTask).not.toBeCalled();

      fireEvent.click(getAllByText('완료')[0]);

      expect(onClickDeleteTask).toBeCalledWith(1);
    });
  });
});
