import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { delay } from 'cofx';

import useCofx from './index';

describe('useCofx', () => {
  describe('when passing a generator', () => {
    it('should return success text', () => {
      function* fn() {
        yield delay(100);
        return 'success';
      }

      const App = () => {
        const { value } = useCofx(fn);
        return <div>{value}</div>;
      };

      const tree = TestRenderer.create(<App />);
      console.log(tree.toJSON());
    });
  });
});
