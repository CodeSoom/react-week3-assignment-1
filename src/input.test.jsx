import { render, fireEvent, screen } from '@testing-library/react';

import Input from './Input';

// describe - context(optional) - it 패턴으로 사용하시면 좋습니다 :)
// describe 는 테스트 하려는 주체를 적어주세요 !!
// Input or Input component
describe('Input', () => {
  const onClick = jest.fn();
  const onChange = jest.fn();

  // describe -it 형태로 읽었을때 자연스러운게 좋습니다! -> 'Input renders "할일"'
  it('renders "할 일"', () => {
    const { container, getByText } = render((
      <Input
        onClick={onClick}
        onChange={onChange}
      />
    ));

    // 테스트는 서로 독립적이여야 합니다!
    // 1개의 테스트에서는 1개의 기능을 테스트 하도록 적어주세요!
    expect(container).toHaveTextContent('할 일');
  });

  it('renders "추가"', () => {
    const { container, getByText } = render((
      <Input
        onClick={onClick}
        onChange={onChange}
      />
    ));

    expect(container).toHaveTextContent('추가');
  });

  it('추가 버튼을 누르면, onClick 함수가 실행된다.', () => {
    render((
      <Input
        onClick={onClick}
        onChange={onChange}
      />
    ));

    // getBy... 이랑 queryBy... , findBy... 이랑 차이점이 어떤걸까요?
    // const { getByText } = render(...) 을 통해서 테스트를 진행할수도 있지만, screen 을 이용해서도 테스트가 가능합니다!
    // getby <-> queryBy : QueryBy는 해당 element가 존재하지 않아도 에러발생 X
    // findby : 원하는 element가 나올때까지 대기후 반환한다.
    fireEvent.click(screen.queryByText('추가'));

    expect(onClick).toBeCalled();
  });

  // 문제1이 통과하려면 어떻게 해야할까요??
  // render 함수가 반복되는것 같은데! [DRY 법칙](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)을 지키려면 어떻게 해야할까요?
  // 문제의 의미를 정확하게 인지를 못했어요...
  const redering = () => render((
    <Input
      onClick={onClick}
      onChange={onChange}
    />
  ));

  it('문제1', () => {
    const { container, getByText } = redering();

    fireEvent.click(getByText('추가'));
    onClick.mockClear();
    expect(onClick).not.toBeCalled();
  });
});
