import { render, fireEvent } from '@testing-library/react';
import Item from './Item';

describe('Item', () => {
  const task = {
    id: 100,
    title: '운동하기',
  };
  const handleClick = jest.fn();

  const renderItem = () => render(
    <Item
      task={task}
      onClickDelete={handleClick}
    />,
  );

  // 테스트가 실행되기 전에 실행
  beforeEach(() => {
    // mocking 함수들을 초기화
    jest.clearAllMocks();
  });

  it('initial', () => {
    // Given
    const { container } = renderItem();

    // Then
    expect(container).toHaveTextContent('운동하기');
    expect(container).toHaveTextContent('완료');
  });

  describe('when click finish button', () => {
    it('get id', () => {
      // Given
      const { getByText } = renderItem();
      expect(handleClick).not.toBeCalled();

      // When
      fireEvent.click(getByText('완료'));

      // Then
      expect(handleClick).toBeCalledWith(100);
    });
  });
});
