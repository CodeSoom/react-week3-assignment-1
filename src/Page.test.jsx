/* 계획
1. 보여야 할 화면이 잘 보이는가
*/

import { render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {

context('when Input, List is exists', () => {
    it('render Page', () => {
        const { container, getByPlaceholderText } = render((
            <Page />
        ));
    
        expect(container).toHaveTextContent('To-do');
        expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
        expect(container).toHaveTextContent('추가');
        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    })  
});
