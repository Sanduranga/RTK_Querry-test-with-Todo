import { todoObj2 } from "../models/models";

import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function InputForm() {
  // const [input, setInput] = useState({} as todoObj);
  // const [editOn, setEditOn] = useState<boolean>(false);
  // const [editIndx] = useState<string>("");

  // const [updateTodo] = useUpdateTodoMutation();
  // const [postTodos] = usePostTodosMutation();

  const onSubmit = (data: todoObj2) => {
    // if (editOn === false) {
    //   postTodos({ id: input.id, task: input.task });
    // } else {
    //   updateTodo({ _id: editIndx, id: input.id, task: input.task });

    //   setEditOn(false);
    // }
    console.log(data);
  };

  const { register, handleSubmit } = useForm<todoObj2>({
    defaultValues: { id: "33" },
  });

  return (
    <Grid container spacing={2}>
      <Grid
        component="form"
        onClick={handleSubmit(onSubmit)}
        item
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <TextField
          {...register("id", { required: "Id is required!" })}
          label="Id"
          type="id"
        />
        <TextField {...register("task")} label="Task" type="task" />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
