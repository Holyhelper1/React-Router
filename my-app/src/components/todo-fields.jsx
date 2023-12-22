import styles from "./todos-fields.module.css";
import { Field } from "./Field";


export const Fields = ({
  tasks,
  requestDeleteTask,
  editTodos,
  handleChange,
  search,
  handleSort,
}) => {
  

  return (
    <>
      <div>
        <div className={styles.searchWrapper}>
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            className={styles.abcSearch}
            onClick={handleSort}
          />
          <p className={styles.abcText}>Sort by Abc</p>
        </div>

        {tasks.map(({ id, author, title }) => (
          <Field
            key={id}
            id={id}
            author={author}
            title={title}
            requestDeleteTask={requestDeleteTask}
            editTodos={editTodos}
          />
        ))}
      </div>
    </>
  );
};
