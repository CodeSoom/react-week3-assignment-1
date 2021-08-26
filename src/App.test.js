import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

// const [state, setState] = useState({
//     newId: 100,
//     taskTitle: '',
//     tasks: [],
//   });

//   const { newId, taskTitle, tasks } = state;

describe('App', () => {
  // 초기화면: 아무것도 입력되지 않았을 때
  it('default', () => {
    // render를 통해 App에서 text를 가져온다.
    const { getByText } = render(<App />);

    // 아무것도 추가 되지 않은 초기화면에서
    // 할 일이 없어요라는 text가 dom에 있는지 검사한다.
    expect(getByText('할 일이 없어요!')).toBeInTheDocument();
  });
});
