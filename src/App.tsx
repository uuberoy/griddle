import Grid from './Grid';
import Nav from './Nav';

function App() {
  return (
    <>
      <Nav />
      <div>
        <Grid columns={15} rows={15} />
      </div>
    </>
  );
}

export default App;
