import { FormEvent, useState } from "react";
import { todoObj } from "../models/models";
import { usePostTodosMutation, useUpdateTodoMutation } from "../redux/todotApi";

export default function InputForm() {
  const [input, setInput] = useState({} as todoObj);
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editIndx] = useState<string>("");

  const [updateTodo] = useUpdateTodoMutation();
  const [postTodos] = usePostTodosMutation();

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (editOn === false) {
      postTodos({ id: input.id, task: input.task });
    } else {
      updateTodo({ _id: editIndx, id: input.id, task: input.task });

      setEditOn(false);
    }
  };

  //   const handleEdit = (index: number, _id: string) => {
  //     const editItem: todoObj[] = data?.filter((_, indx) => indx === index) || [];
  //     setInput(editItem[0]);
  //     setEditOn(true);
  //     setEditIndx(_id);
  //   };

  return (
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
  );
}
