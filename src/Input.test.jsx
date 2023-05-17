import { fireEvent, render, screen } from '@testing-library/react';
import Input from './Input';

// 무엇을 테스트할 것인가
// 1. input이 보인다. -> input에 텍스트를 입력하면 텍스트가 보인다
// 2. 할 일 텍스트가 보인다.
// 3. 추가 버튼이 보인다. -> 추가 버튼을 클릭했을 때 handleClick 함수가 실행된다.

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function rendererInput(taskTitle = '') {
    return render(
      <Input value={taskTitle} onChange={handleChange} onClick={handleClick} />
    );
  }

  context('Input컴포넌트가 렌더링되면', () => {
    it('label이 보입니다.', () => {
      const { container } = rendererInput();

      expect(container).toHaveTextContent('할 일');
    });
    it('input이 보입니다.', () => {
      const { getByPlaceholderText } = rendererInput();

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
    it('button이 보입니다.', () => {
      const { getByText } = rendererInput();

      expect(getByText('추가')).toBeInTheDocument();
    });
  });

  context('Input에 입력이 일어나면', () => {
    it('handleChange 함수가 실행된다.', () => {
      const { getByLabelText } = rendererInput();

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '변경됨',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('추가 버튼을 클릭하면', () => {
    it('handleClick함수가 호출됩니다.', () => {
      const { getByText } = rendererInput();

      fireEvent.click(getByText('추가'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
