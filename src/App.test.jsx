import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import App from './App';
import List from './List';
import Item from './Item';


configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('렌더링이 제대로 되어야 한다.', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });

  it('새로운 테스크가 생긴다.', () => {
    const state = {
      newId: 100,
      taskTitle: '',
      tasks: [],
    };

    const newTask = {
      id: state.newId,
      task: '오늘의 할 일',
    };


    const nextState = {
      ...state,
      newId: state.newId + 1,
      taskTitle: '',
      tasks: [newTask, ...state.tasks],
    };

    expect(nextState.newId).toBe(101);
    expect(nextState.tasks.length).toBe(1);
    expect(nextState.tasks[0]).toEqual(newTask);
  });


  it('타이틀을 제거 해본다.', () => {
    const tasks = [{
      id: 100,
      title: '100번 할 일',
    }, {
      id: 101,
      title: '101번 할 일',
    }];
    function handleClickDeleteTask(id) {
      const index = tasks.findIndex((task) => task.id === id);
      tasks.splice(index, 1);
    }

    const wrapper = shallow(<Item task={tasks[0]} onClickDelete={handleClickDeleteTask} />);
    expect(tasks.length).toBe(2);
    wrapper
      .find('button')
      .simulate('click', () => {
        // handleClickDeleteTask(100);
        expect(handleClickDeleteTask).toBeCalledWith(100);
      });
    expect(tasks.length).toBe(1);
  });
});
