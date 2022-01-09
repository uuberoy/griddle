import Grid from './Grid';
import Nav from './Nav';
import { bodyContainerClass } from './styled';

function App() {
  return (
    <>
      <Nav />
      <div className={bodyContainerClass}>
        <Grid cols={15} rows={15} />
      </div>
    </>
  );
}

export default App;
