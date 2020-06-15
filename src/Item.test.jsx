import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Item from './Item';

describe('<Item />', () => {
  const dom = (props = {}) => {
    const { task, onClickDelete } = props;
    const utils = render(<Item task={task} onClickDelete={onClickDelete} />);
    const { getByText } = utils;
    const completeButton = getByText('완료');
    return {
      ...utils,
      completeButton,
    };
  };

  context('로딩 되면, ', () => {
    it('완료 텍스트가 있다.', () => {
      const task = {
        id: 1,
        title: 'first title',
      };
      const { completeButton } = dom({ task });
      expect(completeButton).toBeTruthy();
    });

    it('테스크의 타이틀이 보인다.', () => {
      const task = {
        id: 1,
        title: 'first title',
      };
      const { getByText } = dom({ task });
      getByText(task.title);
    });
  });

  context('완료 버튼을 클릭하면, ', () => {
    it('task id를 파라미터로 갖는 onClickDelete 함수가 호출된다.', () => {
      const task = {
        id: 1,
        title: 'first title',
      };
      const onClickDelete = jest.fn();
      const { completeButton } = dom({ task, onClickDelete });

      expect(onClickDelete).not.toBeCalled();
      fireEvent.click(completeButton);
      expect(onClickDelete).toBeCalledTimes(1);
      expect(onClickDelete).toBeCalledWith(1);
    });
  });
});
