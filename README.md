# hooks-cofx

Use `cofx` with react hooks

```js
import useCofx from 'hooks-cofx';

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
    return <div>Error: {value}</div>
  }

  return <div>{value}</div>
};
```

See [cofx](https://github.com/neurosnap/cofx) for more information on what `cofx` can do
