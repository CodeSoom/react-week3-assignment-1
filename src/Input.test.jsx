import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  function renderInput(taskTitle) {
    return render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );
  }

  context('when value is empty', () => {
    it('renders hint message', () => {
      const taskTitle = '';
      const { getByRole, queryByPlaceholderText } = renderInput(taskTitle);

      expect(getByRole(/textbox/)).toBeEmptyDOMElement();
      expect(queryByPlaceholderText(/할 일을 입력해 주세요/)).toBeInTheDocument();
    });
  });

  context('when value is not empty', () => {
    it('renders Input text', () => {
      const taskTitle = 'TDD 익숙해지기';
      const { getByRole, getByDisplayValue } = renderInput(taskTitle);

      expect(getByRole(/textbox/).value).toEqual(taskTitle);
      expect(getByDisplayValue(taskTitle)).not.toBeNull();
    });
  });

  it('listens input change event', () => {
    const taskTitle = '';
    const typing = '!';
    const { getByRole } = renderInput(taskTitle);

    const input = getByRole(/textbox/);
    userEvent.type(input, typing);

    expect(handleChangeTitle).toBeCalled();
  });

  it('listens click event', () => {
    const taskTitle = /할일 추가 하기/;
    const { getByText } = renderInput(taskTitle);

    expect(handleClickAddTask).not.toBeCalled();

    userEvent.click(getByText(/추가/));

    expect(handleClickAddTask).toBeCalled();
  });
});
