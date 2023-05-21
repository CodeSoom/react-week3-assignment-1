import { render, fireEvent } from '@testing-library/react';
import App from './App';

// E2E 테스트 목적
// 1. App 컴포넌트가 렌더링 된다.
// 1-1. input이 보인다.
// 1-2. 할일이 보인다.
// 1-3. 추가가 보인다.

// 2.할 일이 변경되면
// 2-1. 변경된 할 일이 input의 value로 있어야한다.

// 3. 추가 버튼이 클릭되면
// 3-1. 빈 값이라면 아무것도 추가되지 않는다.
// 3-2. 빈 값이 아니라면 list에 해당 값이 보여야한다.

// 4. 완료 버튼이 클릭되면
// 4-1. list에서 해당 item이 보이면 안된다.

function renderApp() {
  return render(<App />);
}

describe('App', () => {
  it('할일 라벨이 보인다', () => {
    const { container } = renderApp();
    expect(container).toBeInTheDocument('할일');
  });
  it('input이 보인다', () => {
    const { getByPlaceholderText } = renderApp();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });
  it('추가버튼이 보인다', () => {
    const { container } = renderApp();
    expect(container).toBeInTheDocument('추가');
  });

  describe('할 일을 적는 input에 텍스트를 입력한다.', () => {
    it('입력한 텍스트로 값이 변경된다.', () => {
      const { container, getByPlaceholderText } = renderApp();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: {
          value: '변경됨',
        },
      });
      expect(container).toBeInTheDocument('변경됨');
    });
  });

  describe('할 일을 등록한다.', () => {
    context('빈 텍스트를 등록할 경우', () => {
      it('아무것도 보이지 않는다', () => {
        const { container, getByText } = renderApp();
        fireEvent.click(getByText('추가'));
        expect(container).not.toHaveTextContent('');
      });
    });

    context('텍스트가 1글자 이상 등록될 경우', () => {
      it('아이템리스트에 추가 되어야한다.', () => {
        const {
          getByText, getByPlaceholderText, getByRole,
        } = renderApp();
        fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
          target: {
            value: '아무거나',
          },
        });
        fireEvent.click(getByText('추가'));
        expect(getByRole('listitem')).toHaveTextContent('아무거나', '완료');
      });
    });
  });

  describe('완료 버튼을 누른다.', () => {
    const {
      container,
    } = renderApp();
    it('해당 아이템이 리스트에서 제거된다.', () => {
      const {
        getByText, getByPlaceholderText,
      } = renderApp();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: {
          value: '너무재밌어',
        },
      });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));
      expect(container).not.toHaveTextContent('너무재밌어');
    });
  });
});
