import style from "./todos-fields.module.css";

export const NewTask = ({ addNewTask }) => {
  return (
    <div>
      <button onClick={addNewTask} className={style.buttonEdit}>
        Add new task
      </button>
    </div>
  );
};
