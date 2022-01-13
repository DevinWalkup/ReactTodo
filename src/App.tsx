import React, {useState} from 'react';
import './App.css';
import {TodoCard} from "./components/TodoCard/TodoCard";
import {TodoForm} from "./components/TodoForm/TodoForm";
import {Todo} from "../lib/types/Todo";

const INIT_TODO: Todo[] = [{
    id: 1,
    title: 'Example Todo',
    body: 'This is an example of an todo',
    isComplete: false
}]

const NEW_TODO: Todo = {
    id: 0,
    title: '',
    body: '',
    isComplete: false
}

function App() {
    const [todos, setTodos] = useState<Todo[]>(INIT_TODO);
    const [editTodo, setEditTodo] = useState<Todo | null>(null)

    const onRemove = (todo: Todo) => {
        let newTodos = todos.filter((t) => {
            return t.id !== todo.id;
        })

        setTodos(newTodos || [])
    }

    const onComplete = (index: number) => {
        setTodos(todos.map((todo, idx) => {
            if (idx === index) {
                todo.isComplete = !todo.isComplete
            }

            return todo;
        }))
    }

    const onSave = (todo: Todo) => {
        setEditTodo(null);

        let existingTodo = todos.find(({id}) => id === todo.id);

        if (existingTodo !== null && existingTodo !== undefined) {
            setTodos(todos.map((t) => {
                if (t.id === existingTodo?.id) {
                    t = todo;
                }

                return t;
            }))
        } else {
            let newTodos = todos;

            let id = todos.sort((a, b) => a.id - b.id)[0]?.id || 0;
            todo.id = id + 1;

            newTodos.push(todo);
            setTodos(newTodos);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto p-4">
                <div className="w-full mb-5">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">React Todo
                            App</h2>
                    </div>
                </div>
                {!editTodo ? <div className="flex flex-col gap-4">
                    <TodoCard todo={null} onEdit={() => setEditTodo(NEW_TODO)}/>

                    {todos && todos.length > 0 && todos.map((todo, idx) => {
                        return <TodoCard key={idx}
                                         todo={todo}
                                         onRemove={() => onRemove(todo)}
                                         onComplete={() => onComplete(idx)}
                                         onEdit={() => setEditTodo(todo)}/>
                    })}
                </div> :
                <div>
                    <TodoForm todo={editTodo}
                              onCancel={() => setEditTodo(null)}
                              onSave={(todo: Todo) => onSave(todo)} />
                </div>}
            </div>
        </div>
    );
}

export default App;
