import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  render(<List tasks={[]} />);
});
