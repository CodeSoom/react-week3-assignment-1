// import React from 'react';

// import { render, fireEvent } from '@testing-library/react';

// import App from './App';

// describe('App', () => {
//   function renderApp() {
//     return render((
//       <App />
//     ));
//   }

//   it('input 입력시 input이 업데이트 된다.', () => {
//     const { getByPlaceholderText } = renderApp();

//     fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
//     expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
//   });

//   it('추가버튼을 누르면 input내용이 비워집니다.', () => {
//     const { container, getByText, getByPlaceholderText } = renderApp();

//     fireEvent.click(getByText('추가'));
//     expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
//     expect(container).toHaveTextContent('TDD 과제하기');
//   });

//   it('완료버튼을 누르면 onClickDeleteTask가 실행된다.', () => {
//     const { getByText } = renderApp();

//     fireEvent.click(getByText('완료'));
//   });
// });
import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App에서', () => {
  function renderApp() {
    return render(<App />);
  }

  it('Input을 입력하면 Input이 변경된다.', () => {
    const { getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '누워있기',
      },
    });
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('누워있기');
  });

  it('추가버튼을 클릭하면 Input은 비워지고 list에 추가된다.', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '누워있기' } });
    fireEvent.click(getByText('추가'));
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
    expect(container).toHaveTextContent('누워있기');
  });

  it('완료버튼을 클릭하면 list에서 사라진다.', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '누워있기' } });
    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('누워있기');
    fireEvent.click(getByText('완료'));
    expect(container).not.toHaveTextContent('누워있기');
  });
});
