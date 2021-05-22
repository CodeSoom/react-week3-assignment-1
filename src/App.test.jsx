import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
    
    const { container, getByText } = render((
        <App
        />
    ));
    
    expect(getByText(/추가/)).not.toBeNull();
    expect(getByText(/아무 것도 하지 않기 #1/)).not.toBeNull();  
    
    // TOOD: 통합 테스트 코드 작성
    // CodeceptJS => 실제 브라우저에서 사용자 테스트 실행 가능.
});

