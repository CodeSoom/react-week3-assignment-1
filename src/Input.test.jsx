import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  function rendererInput(taskTitle = '') {
    return render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('Input컴포넌트가 렌더링되면', () => {
    it('label이 보입니다.', () => {
      const { container } = rendererInput();

      expect(container).toHaveTextContent('할 일');
    });

    it('button이 보입니다.', () => {
      const { getByText } = rendererInput();

      expect(getByText('추가')).toBeInTheDocument();
    });

    it('input이 보입니다.', () => {
      const { getByPlaceholderText } = rendererInput();

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  describe('input', () => {
    context('할 일을 입력하면', () => {
      it('onChangeTitle이 호출됩니다.', () => {
        const event = {
          target: {
            value: '숨쉬기',
          },
        };

        const { getByLabelText } = rendererInput('');

        const input = getByLabelText('할 일');

        fireEvent.change(input, event);

        expect(onChangeTitle).toBeCalled();
      });
    });
  });

  describe('button', () => {
    context('유저가 "추가" 버튼을 클릭하면', () => {
      it('onClickAddTask함수가 호출됩니다.', () => {
        const { getByText } = rendererInput();

        fireEvent.click(getByText('추가'));

        expect(onClickAddTask).toBeCalledTimes(1);
      });
    });
  });
});
