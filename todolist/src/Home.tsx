import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const handleEdit = (id: string) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  const handleDel = (id: string) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodo(result.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="h-dvh w-full flex justify-center items-center bg-gradient-to-r from-green-600 via-green-700 to-green-400">
        <div className="border border-green-500 w-1/3 h-2/3 flex flex-col items-center bg-white">
          <h1 className="text-4xl">Todo List</h1>
          <Create />
          <div className=" overflow-y-scroll w-2/4 no-scrollbar flex  flex-col items-center justify-center">
            {todo.length === 0 ? (
              <div className=" ">
                <h2>No Records</h2>
              </div>
            ) : (
              todo.map((todo) => {
                return (
                  <div className="w-full flex justify-between py-1 ">
                    <div className="bg-green-600 w-full flex justify-between p-3 ">
                      <div
                        className="flex gap-2 cursor-pointer"
                        onClick={() => {
                          return handleEdit(todo._id);
                        }}
                      >
                        {todo.done ? (
                          <i className="bi bi-check-circle-fill"></i>
                        ) : (
                          <i className="bi bi-circle"></i>
                        )}
                        <div className={todo.done ? "line-through" : ""}>
                          {todo.task}
                        </div>
                      </div>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          handleDel(todo._id);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
