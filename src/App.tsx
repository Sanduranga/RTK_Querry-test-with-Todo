import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { todoObj } from "./models/models";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  usePostTodosMutation,
  useUpdateTodoMutation,
} from "./redux/todotApi";

function App() {
  const [input, setInput] = useState({} as todoObj);
  // const [list, setList] = useState<todoObj[]>([]);
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editIndx, setEditIndx] = useState<string>("");
  const { data, isLoading, error, isSuccess } = useGetTodosQuery();
  const [postTodos] = usePostTodosMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // const res = await fetch("http://localhost:5555/todos");
      // if (!res.ok) {
      //   throw new Error("Fetching error!!");
      // }
      // const { response } = await res.json();
      // setList(data ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (editOn === false) {
      postTodos({ id: input.id, task: input.task });
      // setList((prev) => [...prev, input]);
      // const postTodo = async () => {
      //   try {
      //     const res = await fetch("http://localhost:5555/todo", {
      //       method: "POST",
      //       headers: {
      //         "Content-type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         id: input.id,
      //         task: input.task,
      //       }),
      //     });
      //     if (!res.ok) {
      //       throw new Error("Data post failed!!");
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   fetchTodos();
      // };
      // postTodo();
    } else {
      // const editArray = [...list];
      // if (editIndx !== undefined) {
      //   editArray[editIndx] = input;
      // }
      // setList(editArray);
      // const updateTodo = async () => {
      //   try {
      //     const res = await fetch("http://localhost:5555/update_todo", {
      //       method: "PUT",
      //       headers: {
      //         "Content-type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         _id: editIndx,
      //         id: input.id,
      //         task: input.task,
      //       }),
      //     });

      //     if (!res.ok) {
      //       throw new Error("Todo delete failed!!");
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   fetchTodos();
      // };
      // updateTodo();
      updateTodo({ _id: editIndx, id: input.id, task: input.task });

      setEditOn(false);
    }

    setInput({ id: "", task: "", _id: "" });
  };

  const handleEdit = (index: number, _id: string) => {
    const editItem: todoObj[] = data?.filter((_, indx) => indx === index) || [];
    setInput(editItem[0]);
    setEditOn(true);
    setEditIndx(_id);
  };

  const handleDelete = (_id: string) => {
    // () =>   (Down function I had implemented before)
    //   setList((prev) =>
    //     prev.filter((_, ind) => ind !== index)
    //   )
    // const deleteTodo = async () => {

    deleteTodo(_id);
    //   try {
    //     const res = await fetch("http://localhost:5555/delete_todo", {
    //       method: "DELETE",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         id: _id,
    //       }),
    //     });
    //     if (!res.ok) {
    //       throw new Error("Todo delete failed!!");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   fetchTodos();
    // };
    // deleteTodo();
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-10 mx-auto items-center bg-green-300 px-3 py-4 mt-5 rounded-md shadow-md">
        <div className="mx-auto font-bold text-xl">
          <h1>ToDo App</h1>
        </div>
        <div>
          <div className="flex gap-3">
            <input
              type="text"
              className="border-black border-2 rounded-md"
              placeholder="Type Id here"
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={input.id}
              name="id"
            />
            <input
              type="text"
              className="border-black border-2 rounded-md"
              placeholder="Type Task here"
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              value={input.task}
              name="task"
            />
            <button
              onClick={handleClick}
              className="px-2 py-1 bg-green-600 rounded-md shadow-lg font-semibold"
            >
              Enter
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {isLoading && (
            <div>
              <h1 className="text-green-700 font-semibold ">Loading!</h1>
            </div>
          )}
          {isSuccess && (
            <div className="w-full">
              <ul className="flex flex-col gap-2">
                {data.map((data: todoObj, index) => (
                  <li key={index} className="flex justify-between gap-2">
                    <span>{data.id}</span>
                    <h1>{data.task}</h1>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="px-2 bg-red-600 rounded-md shadow-lg font-semibold"
                      >
                        dele
                      </button>
                      <button
                        onClick={() => handleEdit(index, data._id)}
                        className="px-2 bg-yellow-600 rounded-md shadow-lg font-semibold"
                      >
                        edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isSuccess && data.length === 0 && (
            <div className="w-full">
              <h1 className="text-red-700 font-semibold">
                There are no todo's to show
              </h1>
            </div>
          )}
          {error && (
            <div>
              <h1 className="text-red-700 font-semibold">
                Something went wrong!!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
