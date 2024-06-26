import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { todoObj } from "./models/models";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./redux/todotApi";
import Navbar from "./components/Navbar";

import { Amplify } from "aws-amplify";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./Amp";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setUserName } from "./redux/loggedUserReducer";
import InputForm from "./components/InputForm";
Amplify.configure(config);

function App({ signOut }: WithAuthenticatorProps) {
  useEffect(() => {
    // Fetch the authenticated user on component mount
    handleFetchUserAttributes();
  }, []);
  const loggedUserName = useSelector(
    (state: RootState) => state.loggingUser.name
  );
  const dispatch = useDispatch();
  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      dispatch(setUserName(userAttributes.name));
    } catch (error) {
      console.log(error);
    }
  }

  const [input, setInput] = useState({} as todoObj);

  // const [list, setList] = useState<todoObj[]>([]);
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editIndx, setEditIndx] = useState<string>("");
  const { data, isLoading, error, isSuccess } = useGetTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  // const fetchTodos = async () => {
  //   try {
  //     // const res = await fetch("http://localhost:5555/todos");
  //     // if (!res.ok) {
  //     //   throw new Error("Fetching error!!");
  //     // }
  //     // const { response } = await res.json();
  //     // setList(data ? data : []);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // sss
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (editOn === false) {
      // postTodos({ id: input.id, task: input.task });
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
    deleteTodo(_id);
    // () =>   (Down function I had implemented before)
    //   setList((prev) =>
    //     prev.filter((_, ind) => ind !== index)
    //   )
    // const deleteTodo = async () => {

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
    <div className="flex flex-col w-full">
      <Navbar />
      <div>
        <h1>Hello {loggedUserName}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
      <div className="flex flex-col gap-10 mx-auto items-center bg-green-300 px-3 py-4 mt-5 rounded-md shadow-md">
        <div className="mx-auto font-bold text-xl">
          <h1>ToDo App</h1>
        </div>
        <div onClick={handleClick}>
          {/* <div className="flex gap-3">kkkoppklkkkk</div> */}
          <InputForm />
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
