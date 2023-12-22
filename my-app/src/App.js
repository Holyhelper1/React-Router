import styles from "./app.module.css";
import { Fields } from "./components/todo-fields.jsx";
import { NewTask } from "./components/new-task.jsx";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

export const App = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [originalTasks, setOriginalTasks] = useState([]);
  const debounceValue = useDebounce(search, 2000);
  
  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:3005/posts?q=${debounceValue}`)
      .then((loadedData) => loadedData.json())
      .then((loadedTasks) => {
        setTasks(loadedTasks);
        setOriginalTasks(loadedTasks);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debounceValue]);

  const requestDeleteTask = (id) => {
    setIsDeleting(true);
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена", response);
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const addNewTask = () => {
    fetch("http://localhost:3005/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Новая заметка",
        author: "'Укажите ваше имя'",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Новая задача создана", response);
        setTasks([...tasks, response]);
      });
  };

  const editTodos = async (id, payload) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const responce = await fetch(`http://localhost:3005/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const updateTask = await responce.json();
    const copyTasks = tasks.slice();
    copyTasks[taskIndex] = updateTask;
    setTasks(copyTasks);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = () => {
    if (sort === "") {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setTasks(sortedTasks);
      setSort("asc");
    } else {
      setTasks(originalTasks);
      setSort("");
    }
  };

  return (
    <div className={styles.app}>
      {isLoading ? (
        <h1 className={styles.todosLoader}>Loading...</h1>
      ) : (
        <div className={styles.app}>
          <Fields
            tasks={tasks}
            requestDeleteTask={requestDeleteTask}
            isDeleting={isDeleting}
            editTodos={editTodos}
            handleChange={handleChange}
            search={search}
            handleSort={handleSort}
          />
          <NewTask addNewTask={addNewTask} />
        </div>
      )}
    </div>
  );
};

export default App;
