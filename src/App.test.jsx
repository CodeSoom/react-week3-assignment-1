import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('App App Test', () => {
    it('render has empty THing', () => {
      const { getByText } = render((
        <App />
      ));

      expect(getByText(/To-do/)).not.toBeNull();
      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
      expect(getByText(/추가/)).not.toBeNull();
    });
  });
});
