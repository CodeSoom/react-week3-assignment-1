import { fireEvent, render, getByText as getByTextWithContainer } from '@testing-library/react';
import App from './App';

const renderApp = () => render((
  <App />
));

/**
 * 시나리오 1. 테스크가 아무것도 없을때 '할 일이 없어요!' 를 렌더링 한다.
 * 시나리오 2. '인수 테스트 작성하기' 테스크를 추가하고 '안수 테스트 작성하기' 가 렌더링 된다.
 * 시나리오 3. '인수 테스트 작성하기' 테스크를 추가하고, 완료 버튼을 눌렀을때 '할 일이 없어요!' 가 렌더링 된다.
 * 시나리오 4. '인수 테스트', '통합 테스트', '유닛 테스트' 를 추가하고 '통합 테스트'를 완료했을때 '인수 테스트', '유닛 테스트'만 렌더링 된다.
 * 시나리오 5. '인수', '통합', '유닛'을 추가하고 '통합'을 완료한뒤 '테스트'를 추가했을때, '인수', '유닛', '테스트' 가 렌더링 된다.
 * 시나리오 6. '인수', '통합', '유닛'을 추가하고, '인수', '통합', '유닛'을 차례대로 완료하고 '할 일이 없어요!' 가 렌더링 된다.
*/

// TODO: 영어로 다시 작성하기

describe('App', () => {
  it('테스크가 아무것도 없을때 "할 일이 없어요!" 가 보인다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('"인수 테스트 작성하기" 테스크를 추가하면 "할 일이 없어요!"는 보이지 않는다.', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '인수 테스트 작성하기' } },
    );

    fireEvent.click(getByText('추가'));

    expect(container).not.toHaveTextContent('할 일이 없어요!');
  });

  it('"인수 테스트 작성하기" 테스크를 추가하면 "인수 테스트 작성하기" 가 보인다.', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '인수 테스트 작성하기' } },
    );

    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('인수 테스트 작성하기');
  });

  it('"인수 테스트 작성하기" 테스크를 추가하고, 완료 버튼을 눌렀을때 "할 일이 없어요!" 가 렌더링 된다.', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '인수 테스트 작성하기' } },
    );

    fireEvent.click(getByText('추가'));

    fireEvent.click(getByText('완료'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('"인수 테스트", "통합 테스트", "유닛 테스트" 를 추가하고 "통합 테스트"를 완료했을때 "인수 테스트", "유닛 테스트"만 렌더링 된다,', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    const addTask = (value) => {
      fireEvent.change(
        getByPlaceholderText('할 일을 입력해 주세요'),
        { target: { value } },
      );

      fireEvent.click(getByText('추가'));
    };

    addTask('인수 테스트');
    addTask('통합 테스트');
    addTask('유닛 테스트');

    fireEvent.click(
      getByTextWithContainer(getByText('통합 테스트'), '완료'),
    );

    expect(container).toHaveTextContent('인수 테스트');
    expect(container).toHaveTextContent('유닛 테스트');
    expect(container).not.toHaveTextContent('통합 테스트');
  });

  it('"인수", "통합", "유닛"을 추가하고 "통합"을 완료한뒤 "테스트"를 추가했을때, "인수", "유닛", "테스트" 가 렌더링 된다.', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    const addTask = (value) => {
      fireEvent.change(
        getByPlaceholderText('할 일을 입력해 주세요'),
        { target: { value } },
      );

      fireEvent.click(getByText('추가'));
    };

    addTask('인수');
    addTask('통합');
    addTask('유닛');

    fireEvent.click(
      getByTextWithContainer(getByText('통합'), '완료'),
    );

    addTask('테스트');

    expect(container).toHaveTextContent('인수');
    expect(container).toHaveTextContent('유닛');
    expect(container).toHaveTextContent('테스트');
    expect(container).not.toHaveTextContent('통합');
  });

  it('"인수", "통합", "유닛"을 추가하고, "인수", "통합", "유닛"을 차례대로 완료하고 "할 일이 없어요!" 가 렌더링 된다.', () => {
    const { container, getByPlaceholderText, getByText } = renderApp();

    const addTask = (value) => {
      fireEvent.change(
        getByPlaceholderText('할 일을 입력해 주세요'),
        { target: { value } },
      );

      fireEvent.click(getByText('추가'));
    };

    const deleteTask = (value) => {
      fireEvent.click(
        getByTextWithContainer(getByText(value), '완료'),
      );
    };

    addTask('인수');
    addTask('통합');
    addTask('유닛');

    deleteTask('인수');
    deleteTask('통합');
    deleteTask('유닛');

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
