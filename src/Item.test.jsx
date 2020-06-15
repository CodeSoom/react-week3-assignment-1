import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Item from './Item';

describe('<Item />', () => {
  const dom = (props = {}) => {
    const { task, onClickDelete } = props;
    const utils = render(<Item task={task} onClickDelete={onClickDelete} />);
    const { getByText } = utils;
    const button = getByText('완료');
    return {
      ...utils,
      button,
    };
  };

  it('완료 텍스트가 있다.', () => {
    const task = {
      id: 1,
      title: 'first title',
    };
    const { button } = dom({ task });
    expect(button).toBeTruthy();
  });

  it('완료 버튼을 클릭 할 수 있다.', () => {
    const task = {
      id: 1,
      title: 'first title',
    };
    const onClickDelete = jest.fn();
    const { button } = dom({ task, onClickDelete });

    expect(onClickDelete).not.toBeCalled();
    fireEvent.click(button);
    expect(onClickDelete).toBeCalledTimes(1);
  });

  it('테스크의 타이틀이 보인다.', () => {
    const task = {
      id: 1,
      title: 'first title',
    };
    const { getByText } = dom({ task });
    getByText(task.title);
  });

  it('완료를 클릭하면 task.id를 파라미터로 갖는다.', () => {
    const task = {
      id: 1,
      title: 'first title',
    };
    const onClickDelete = jest.fn();
    const { button } = dom({ task, onClickDelete });
    fireEvent.click(button);
    expect(onClickDelete).toBeCalledWith(task.id);
  });
});
