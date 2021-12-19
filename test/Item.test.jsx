import { fireEvent, render } from '@testing-library/react';

import Item from '../src/Item';

describe('Item', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleClick = jest.fn();

  const renderComponent = () => {
    const task = {
      id: 1,
      title: 'List1',
    };
    const { container, getByRole } = render((
      <Item
        task={task}
        onClickDelete={handleClick}
      />
    ));

    return { container, getByRole };
  };

  it('Input 컴포넌트가 렌더링 된다.', () => {
    const { container } = renderComponent();
    expect(container).toHaveTextContent('List1');
    expect(container).toHaveTextContent('완료');
  });

  it('완료 버튼 클릭 시, onClickDelete 가 호출된다.', () => {
    const { getByRole } = renderComponent();

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByRole('button', { name: '완료' }));
    expect(handleClick).toBeCalledWith(1);
  });
});
