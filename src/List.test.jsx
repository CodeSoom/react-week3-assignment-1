import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('<List/>', () => {
  const onClickDelete = jest.fn();

  const TASK = [{
    id: 1,
    title: '뭐라도 하기',
  },
  ];

  function rendererList({ tasks }) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    context('tasks가 비어있지 않을 시', () => {
      it('해당 tasks의 title이 보입니다.', () => {
        const { container } = rendererList({ tasks: TASK });

        TASK.forEach((task) => {
          expect(container).toHaveTextContent(task.title);
        });
      });
    });

    context('tasks가 비어있을 시', () => {
      it('"할 일이 없어요!"가 출력됩니다.', () => {
        const { container } = rendererList({ tasks: [] });

        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    });
  });

  describe('button', () => {
    context('유저가 "완료" 버튼을 클릭하면', () => {
      it('onClickDelete가 호출됩니다.', () => {
        const { getByText } = rendererList({ tasks: TASK });

        fireEvent.click(getByText('완료'));

        expect(onClickDelete).toBeCalledTimes(1);
      });
    });
  });
});
