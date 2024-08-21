import styles from './NotFound.module.css';

const NotFound: React.FC = ()=>  {
  return (
    <div className={styles.main}>
      <br></br>
      <h1>404</h1>
      <h4>Страница не найдена</h4>
    </div>
  );
}

export default NotFound;
