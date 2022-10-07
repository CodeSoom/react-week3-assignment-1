import { render, fireEvent, screen } from '@testing-library/react';

import List from './List';

// 등록된 테스크가 0개 일 때 
// 등록된 테스크가 1개 이상일 때
// onClickDelete

describe('List', () => {
    it('render 0 task', () =>{
        const tasks = [];
        const { container, toHaveTextContent } =render((
            <List
                tasks={tasks}
            />
        ));
        expect(container).toHaveTextContent('할 일이 없어요!');
    });


    describe('render 1 or more task', () =>{
        it('1', () =>{
            const tasks = [
                {
                    id: 0,
                    title: '호잇쨔'
                }
            ]
            const { container, toHaveTextContent } =render((
                <List
                    tasks={tasks}
                />
            ));
            expect(container).toHaveTextContent('호잇쨔');
        });    
        
        it('more', () =>{
            const tasks = [
                {
                    id: 0,
                    title: '호잇쨔'
                },
                {
                    id: 1,
                    title: '허잇쨔'
                }
            ]
            const { container } =render((
                <List
                    tasks={tasks}
                />
            ));
            expect(container).toHaveTextContent('호잇쨔');
            expect(container).toHaveTextContent('허잇쨔');
        });

        it('onClickDelete', () =>{
            const tasks = [
                {
                    id: 0,
                    title: '호잇쨔'
                }
            ]
            const handleClick = jest.fn();
            const { container, getByText } = render((
                <List
                    tasks={tasks}
                    onClickDelete={handleClick}
                />
            ));
            expect(container).toHaveTextContent('호잇쨔');
            expect(container).toHaveTextContent('완료');
            expect(handleClick).not.toBeCalled();
            fireEvent.click(getByText('완료'));
        });
    });
});