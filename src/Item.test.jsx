import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

// 테스트 항목
// item 컴포넌트가 렌더링 되면
// 1. 타이틀이 보인다.
// 2. 완료버튼이 보인다.
// 완료버튼을 클릭하면
// 1. id를 인자로 넘긴 함수가 호출된다.

const task = {
  id: 1,
  title: '뭐라도 하기',
};
const handleClick = jest.fn();
function renderItem() {
  return render(<Item task={task} onClickDelete={handleClick} />);
}

describe('Item', () => {
  it('아이템의 타이틀이 보인다', () => {
    const { container } = renderItem();
    expect(container).toHaveTextContent('뭐라도 하기');
  });
  it('완료버튼이 보인다', () => {
    const { getByText } = renderItem();
    expect(getByText('완료')).toBeInTheDocument();
  });

  context('완료버튼이 클릭 되면', () => {
    it('id를 인자로 받은 핸들클릭 함수가 호출된다.', () => {
      const { getByText } = renderItem();
      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalledWith(1);
    });
  });
});
