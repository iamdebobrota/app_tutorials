import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";




function TodoApp() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  // const classes = useStyles();
  const { setIsOpen } = useTour();

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      setTodos([...todos, { val: inputVal, isDone: false, id: editedId }]);
    }
    setInputVal("");
    setIsEdited(false);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.val);
    setTodos(newTodos);
    setIsEdited(true);
  };

// const classes = useStyles();
  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ marginTop: "20px" }}
      className=""
      //  className={classes.container}
    >
       <button onClick={() => setIsOpen(true)}>Open Tour</button>

      <TextField
        variant="outlined"
        onChange={onChange}
        label="type your task"
        value={inputVal}
        data-tour="step-1"
        // className={classes.input}
      />
      <Button
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        // className={classes.addButton}
        disabled={inputVal ? false : true}
        data-tour="step-2">
        {isEdited ? "Edit Task" : "Add Task"}
      </Button>
      
      <List data-tour='step-3'>
        {todos.map((todo) => {
          return (
            <Stack>
              <ListItem
                divider="bool"
                // className={classes.list}
              >
                <Checkbox
                  onClick={() => handleDone(todo.id)}
                  checked={todo.isDone}
                />
                <Typography
                  // className={classes.text}
                  style={{ color: todo.isDone ? "green" : "" }}
                  key={todo.id}>
                  {todo.val}
                </Typography>
                <Button
                  onClick={() => handleEdit(todo.id)}
                  variant="contained"
                  // className={classes.listButtons}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(todo.id)}
                  color="secondary"
                  variant="contained"
                  // className={classes.listButtons}
                >
                  delete
                </Button>
              </ListItem>
            </Stack>
          );
        })}
      </List>
    </Container>
  );
}

export default TodoApp;
