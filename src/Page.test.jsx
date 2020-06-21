import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('when render', () => {
    it('exist input element', () => {
      const { container } = render(<Page tasks={[]} />);

      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  context('when tasks is empty', () => {
    it('render empty message', () => {
      const { container } = render(<Page tasks={[]} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
