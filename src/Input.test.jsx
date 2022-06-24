import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const handleChangeTitle = jest.fn();
const handleClickAddTask = jest.fn();

function renderInput(taskTitle = '') {
  return render((
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  ));
}

beforeEach(() => {
  handleChangeTitle.mockClear();
  handleClickAddTask.mockClear();
});

describe('<Input />', () => {
  it('input이 보인다.', () => {
    const { getByPlaceholderText } = renderInput('');

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toBeInTheDocument();
  });

  it('추가 버튼이 보인다.', () => {
    const { getByText } = renderInput('');

    expect(getByText('추가')).toBeInTheDocument();
  });

  context('입력 값이 있다면', () => {
    it('input의 현재 값과 props.value의 값이 서로 같다.', () => {
      const taskTitle = '할일';

      const { getByPlaceholderText } = renderInput(taskTitle);

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(taskTitle);
    });
  });

  describe('추가 버튼 클릭', () => {
    it('handleClickAddTask 함수가 호출된다.', () => {
      const { getByText } = renderInput('');

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });
  });

  describe('input에 할 일을 입력', () => {
    it('handleChangeTitle이 실행된다.', () => {
      const event = {
        target: {
          value: '할일',
        },
      };

      const { getByLabelText } = renderInput('');

      const input = getByLabelText('할 일');

      fireEvent.change(input, event);

      expect(handleChangeTitle).toBeCalled();
    });
  });
});
