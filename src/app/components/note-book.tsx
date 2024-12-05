// components/Notebook.js

import styles from '../css/Notebook.module.css';
interface props{
    text?:string
}
const  Notebook:React.FC<props> = ({text}) =>  {
  return (
    <div className={styles.notebook}>
      <div className={styles.cover}>
        <h1 className='h1'>Notes</h1>
      </div>
      <div className={styles.pages}>
        <div className={styles.page}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
export default Notebook;