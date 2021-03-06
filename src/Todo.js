import { Button, List, ListItem, ListItemText, Modal } from "@material-ui/core";
//rfce use for by default write function and return func
import React, { useState } from "react";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    const updateTodo = () => {
        //update todo with new input text
        db.collection("todos").doc(props.todo.id).set(
            {
                todo: input,
            },
            { merge: true }
        );
        setOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>I am Modal</h1>
                    <input
                        placeholder={props.todo.todo}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List>
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary="Todo" />
                    {/* props.todo.todo mid todo is object and end todo is text in todo */}
                </ListItem>
                {/* <li>{props.text}</li> */}
                <button onClick={(e) => setOpen(true)}>Edit</button>
                <DeleteForeverIcon
                    onClick={(event) =>
                        db.collection("todos").doc(props.todo.id).delete()
                    }
                />
            </List>
        </>
    );
}

export default Todo;
