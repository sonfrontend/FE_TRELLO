import useRouteElements from './hook/useElementRoute';

function App() {
  const routeElements = useRouteElements();
  return <div>{routeElements}</div>;
}

export default App;
