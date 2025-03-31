import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    axios
      .post("http://localhost:3000/add", { task: task })
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form className="p-2 w-full flex justify-center items-center">
        <input
          className="h-8 border border-green-500 outline-0 p-1 "
          type="text"
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="border border-green-500 h-8 px-2 bg-green-500"
          type="submit"
          onClick={handleAdd}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Create;
