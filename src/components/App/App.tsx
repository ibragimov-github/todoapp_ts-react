import styles from './App.module.scss';
import InputLabel from '../InputLabel/InputLabel';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>todos</h1>
      <InputLabel/>
    </div>
  );
}

export default App;
