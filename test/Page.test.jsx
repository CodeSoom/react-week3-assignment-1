import { render } from '@testing-library/react';

import Page from '../src/Page';

describe('Page', () => {
  it('Page 컴포넌트가 렌더링 된다.', () => {
    const { container } = render(<Page tasks={[]} />);
    expect(container).not.toBe(null);
  });
});
