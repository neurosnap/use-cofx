import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { delay } from 'cofx';

import useCofx from './index';

describe('useCofx', () => {
  describe('when passing a generator', () => {
    afterEach(cleanup);

    it('should return loading text', () => {
      function* fn() {
        yield delay(100);
        return 'success';
      }

      const App = () => {
        const { loading, value } = useCofx(fn);
        if (loading) {
          return <div>loading</div>;
        }
        return <div>{value}</div>;
      };

      const { getByText } = render(<App />);
      expect(getByText('loading')).toBeInTheDocument();
    });

    it('should return success text', async () => {
      function* fn() {
        yield delay(100);
        return 'success';
      }

      const App = () => {
        const { loading, value } = useCofx(fn);
        if (loading) {
          return <div>loading</div>;
        }
        return <div>{value}</div>;
      };

      const { getByText } = render(<App />);
      const node = await waitForElement(() => getByText('success'));
      expect(node).toBeInTheDocument();
    });
  });
});
