import React, {ChangeEvent, useState} from "react";
import {Todo} from "../../../lib/types/Todo";

interface Props {
    todo: Todo,
    onCancel: () => void
    onSave: (todo: Todo) => void
}

type EventType = "TITLE" | "BODY" | "COMPLETED"

export function TodoForm({todo, onCancel, onSave}: Props) {
    const [editTodo, setEditTodo] = useState({...todo});

    const handleFormEvent = (event: EventType, payload: string | boolean) => {
        if (event === "COMPLETED") {
            if (typeof payload !== 'boolean') {
            console.error("Invalid payload");
            return;
            }

            editTodo.isComplete = payload;
            return;
        }
        else if (typeof payload !== 'string') {
            console.error("Invalid payload");
            return;
        }

        switch (event) {
            case "TITLE":
                editTodo.title = payload;
                setEditTodo(editTodo);
                return;
            case "BODY":
                editTodo.body = payload;
                setEditTodo(editTodo);
                return;
            default:
                console.error("Invalid event type");
        }
    }

    return <div className="p-4 bg-gray-50 rounded-md shadow-md">
        <form onSubmit={(e) => {
            e.preventDefault();
            onSave(editTodo)
        }}>
            <div>
                <label htmlFor="todoName" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input name="title"
                       id="todoName"
                       className="my-2 rounded-md p-2 block w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                       defaultValue={editTodo.title}
                       onChange={(e) => handleFormEvent("TITLE", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    Note
                </label>
                <div className="mt-1">
                    <textarea
                        rows={4}
                        name="note"
                        id="note"
                        className="shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={editTodo.body}
                        onChange={(e) => handleFormEvent('BODY', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-1 gap-3 items-center my-3">
                <input name="isCompleted"
                       type="checkbox"
                       id="isCompleted"
                       className="rounded-md p-2 block w-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                       defaultValue={editTodo.isComplete.toString()}
                       onChange={(e) => handleFormEvent("COMPLETED", e.target.checked)}
                />
                <label htmlFor="todoName" className="block text-sm font-medium text-gray-700">
                    Is Completed
                </label>
            </div>
            <div className="mt-4 flex flex-1 justify-end gap-4">
                <button
                    type="submit"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100"
                    onClick={() => onCancel()}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
}