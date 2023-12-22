import styles from "./todos-fields.module.css";
import { useState } from "react";
export const Field = ({ id, author, title, requestDeleteTask, editTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState({ author, title });

  const hadleEdit = (id) => {
    setIsEdit((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTodos(id, value);

    setIsEdit(false);
  };

  const handleCancel = () => {
    setValue({ author, title });
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <div className={styles.todosText} key={id}>
          <p className={styles.todosNumber}>Заметка {id}.</p>
          <textarea
            type="text"
            value={value.title}
            className={styles.inputSearch}
            onChange={({ target }) =>
              setValue((prevState) => ({
                ...prevState,
                title: target.value,
              }))
            }
          />
          <input
            type="text"
            value={value.author}
            className={styles.inputSearch}
            onChange={({ target }) =>
              setValue((prevState) => ({
                ...prevState,
                author: target.value,
              }))
            }
          />
          <br />
          <form onSubmit={(event) => event.preventDefault()}>
            <button
              type="submit"
              className={styles.buttonEdit}
              onClick={handleSubmit}>
              Save
            </button>
            <button className={styles.buttonDelete} onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.todosText} key={id}>
          <p className={styles.todosNumber}>Заметка {id}.</p>
          <input type="checkbox" />
          Выполнено
          <p>{title}</p>
          <p>Добавил: {author}</p>
          <button
            className={styles.buttonDelete}
            onClick={() => requestDeleteTask(id)}>
            Delete
          </button>
          <button className={styles.buttonEdit} onClick={hadleEdit}>
            Edit
          </button>
        </div>
      )}
    </>
  );
};
