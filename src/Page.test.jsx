import { render } from '@testing-library/react';

import Page from './Page';

describe('<Page/>', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const taskTitle = '테스트 코드 재밌다.';
  const tasks = [
    { id: 1, title: '뭐라도 하기' },
    { id: 2, title: '코드숨 과제' },
  ];

  context('with tasks', () => {
    it('renders <h1>, <label>, <button> tags', () => {
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
    });
  });

  it('renders changed input value', () => {

  });

  it('clears <input> value after "추가" button clicked', () => {

  });

  context('without tasks', () => {

  });
});
