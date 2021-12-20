/* 계획
1. 보여야 할 화면이 잘 보이는가
*/

import { render } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
    context('when tasks is exists', () => {
        it('render Page', () => {
            const tasks = [
                {id: 1, title: '리뷰하기'},
                {id: 2, title: '공부하기'},
            ]
            const { container, getByPlaceholderText, getByText } = render((
                <Page tasks = {tasks} />
            ));
        
            expect (getByText('리뷰하기')).not.toBeNull();
            expect (getByText('공부하기')).not.toBeNull();

            expect(container).toHaveTextContent('To-do');
            expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
            expect(container).toHaveTextContent('추가');
        });
    })  

    context('when tasks is not exists', () => {
        it('render Page', () => {
            const tasks = []
            const { container, getByPlaceholderText, getByText } = render((
                <Page tasks = {tasks} />
            ));

            expect(container).toHaveTextContent('To-do');
            expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
            expect(container).toHaveTextContent('추가');
            expect(container).toHaveTextContent('할 일이 없어요!')
        });        
    })
});
