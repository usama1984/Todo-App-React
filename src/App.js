import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setinput] = useState([""]);

    //when the app loads we have to listen to database and fetch new todos that are added/removed
    useEffect(() => {
        //this code here run when when app.js loads
        db.collection("todos")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                // console.log(snapshot.docs.map((doc) => doc.data().todo));
                setTodos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        todo: doc.data().todo,
                    }))
                );
            });
    }, []); //this will fire once when app loads or age hm array me kch likhyn to jb wo event occur ho ga to call ho ga

    const addButtonClick = (event) => {
        //this will call when user click add button
        event.preventDefault(); // it will stop page refreshing

        db.collection("todos").add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        // setTodos([...todos, input]);
        setinput(""); // it will clear input field
    };

    return (
        <div className="App">
            <h1> Hello Usama Here </h1>
            <form>
                <FormControl>
                    <InputLabel>Enter A Todo</InputLabel>
                    <Input
                        value={input}
                        onChange={(event) => setinput(event.target.value)}
                    ></Input>
                </FormControl>

                <Button
                    disabled={!input}
                    type="submit"
                    onClick={addButtonClick}
                    variant="contained"
                    color="primary"
                >
                    ADD Todo
                </Button>
                {/* <button type="submit" onClick={addButtonClick}>
                    ADD Todo
                </button> */}
            </form>

            <ul>
                {/* this is loop. where todos is array and todo is element in array */}
                {todos.map((todo) => (
                    <Todo todo={todo} />
                    // <li>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
