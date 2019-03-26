# use-cofx [![Build Status](https://travis-ci.org/neurosnap/use-cofx.svg?branch=master)](https://travis-ci.org/neurosnap/use-cofx)

Use `cofx` with react hooks

Awhile ago I created [cofx](https://github.com/neurosnap/cofx) which is a
library with a similar API to `redux-saga` but without redux.  Since then I
have spawned a few libraries built on top of it and `use-cofx` is the latest iteration.
What this library allows you to do is call a generator function within your
react component and the results will get memoized.  It has a `loading` state,
`value`, and `error`.  Since the API is extremely similar to redux-saga, it
would be trivial to convert these generator functions into sagas at a later time if so desired.

For those who don't know, the biggest value added to using a declarative
side-effects library like `cofx` is the ability to test async io in a
synchronous manner.  Because the generators you write simply yield JSON, it
is very easy to test using a library like
[gen-tester](https://github.com/neurosnap/gen-tester)

```js
import useCofx from 'use-cofx';

function* fetchMovies() {
  const resp = yield call(fetch, '/movies');
  const json = yield call([resp, 'json']);
  return json;
}

const App = () => {
  const { loading, error, value } = useCofx(fetchMovies);

  if (loading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      {value.map((movie) => {
        return <div>{movie.title}</div>
      })}
    </div>
  );
};
```

See [cofx](https://github.com/neurosnap/cofx) for more information on what `cofx` can do
