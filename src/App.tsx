import { FormEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  interface todoObj {
    _id: string;
    id: string;
    task: string;
  }

  const [input, setInput] = useState({} as todoObj);
  const [list, setList] = useState<todoObj[]>([]);
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editIndx, setEditIndx] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5555/todos");
        if (!res.ok) {
          throw new Error("Fetching error!!");
        }
        const { response } = await res.json();
        console.log(response);

        setList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (editOn === false) {
      // setList((prev) => [...prev, input]);
      const postTodo = async () => {
        try {
          const res = await fetch("http://localhost:5555/todo", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: input.id,
              task: input.task,
            }),
          });
          if (!res.ok) {
            throw new Error("Data post failed!!");
          }
        } catch (error) {
          console.log(error);
        }
      };
      postTodo();
    } else {
      // const editArray = [...list];
      // if (editIndx !== undefined) {
      //   editArray[editIndx] = input;
      // }
      // setList(editArray);
      const updateTodo = async () => {
        try {
          const res = await fetch("http://localhost:5555/update_todo", {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              _id: editIndx,
              id: input.id,
              task: input.task,
            }),
          });

          if (!res.ok) {
            throw new Error("Todo delete failed!!");
          }
        } catch (error) {
          console.log(error);
        }
      };
      updateTodo();
      setEditOn(false);
    }

    setInput({ id: "", task: "", _id: "" });
  };

  const handleEdit = (index: number, _id: string) => {
    const editItem: todoObj[] = list.filter((_, indx) => indx === index);
    setInput(editItem[0]);
    setEditOn(true);
    setEditIndx(_id);
  };

  const handleDelete = (_id: string) => {
    // () =>   (Down function I had implemented before)
    //   setList((prev) =>
    //     prev.filter((_, ind) => ind !== index)
    //   )
    const deleteTodo = async () => {
      try {
        const res = await fetch("http://localhost:5555/delete_todo", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: _id,
          }),
        });
        if (!res.ok) {
          throw new Error("Todo delete failed!!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteTodo();
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-10 mx-auto bg-green-300 px-3 py-4 mt-5 rounded-md shadow-md">
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
        <div className="flex">
          <div className="w-full">
            <ul className="flex flex-col gap-2">
              {list.map((data: todoObj, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;
