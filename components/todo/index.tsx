import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TodoApp({}: Props) {
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) return JSON.parse(saveTodos);
    return [];
  });
  const [todo, setTodo] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [row, setRow] = useState<string>("");

  const handleAddTodoList = () => {
    if (!todo) return;
    const save = [{ id: todos.length + 1, todo, isDone: false }, ...todos];
    localStorage.setItem("todos", JSON.stringify(save));
    setTodos([{ id: todos.length + 1, todo, isDone: false }, ...todos]);
    setTodo("");
  };

  const handleDeleteItem = (id: any) => {
    setTodos(todos.filter((item: any) => item.id !== id));
  };

  const handleCheckd = (id: any) => {
    const updatedTodos = todos.map((item: any) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id: any) => {
    setRow(id);
    setIsEdit(true);
  };

  const handleUpdateTodo = (id: any) => {
    if (!newTodo) return;
    const updatedTodos = todos.map((item: any) =>
      item.id === id ? { ...item, todo: newTodo } : item
    );
    setTodos(updatedTodos);
    setIsEdit(false);
    setNewTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Box>
      <Typography align="center" variant="h4">
        ToDoByNus
      </Typography>

      <Stack flexDirection={"row"} justifyContent={"center"} mt={5}>
        <TextField
          size="small"
          type="text"
          value={todo}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setTodo(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTodoList}>
          ADD
        </Button>
      </Stack>

      <Stack flexDirection={"row"} justifyContent={"center"} mt={5}>
        <List
          sx={{
            width: "100%",
            maxWidth: 700,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          <ul>
            {todos.map((item: any) => (
              <ListItem key={item.id}>
                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <ListItemText
                      primary={`${item.todo}`}
                      sx={{
                        textDecorationLine: item.isDone
                          ? "line-through"
                          : "none",
                      }}
                    />
                    <Checkbox
                      {...label}
                      defaultChecked={item.isDone}
                      value={isChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsChecked(e.target.checked);
                        handleCheckd(item.id);
                      }}
                    />
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    {!isEdit && (
                      <Button
                        variant="outlined"
                        onClick={() => handleEditTodo(item.id)}
                      >
                        Edit
                      </Button>
                    )}
                  </Stack>
                </Stack>

                {isEdit && item.id === row && (
                  <Stack flexDirection={"row"} sx={{ width: 600 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleUpdateTodo(item.id)}
                    >
                      Save
                    </Button>
                    <TextField
                      size="small"
                      fullWidth
                      value={newTodo}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => setNewTodo(e.target.value)}
                    />
                  </Stack>
                )}
              </ListItem>
            ))}
          </ul>
        </List>
      </Stack>
    </Box>
  );
}
