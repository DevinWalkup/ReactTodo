import {CheckCircleIcon, PlusCircleIcon, TrashIcon} from "@heroicons/react/solid";
import {Todo} from "../../../lib/types/Todo";

interface Props {
    todo: Todo | null,
    onComplete?: () => void,
    onRemove?: () => void,
    onEdit: () => void
}

export function TodoCard({todo, onComplete, onRemove, onEdit}: Props) {
    return todo ? <div className="bg-white overflow-hidden shadow rounded-lg group">
        <div className="p-5">
            <div className="flex items-center">
                <div className="ml-5 w-0 flex-1">
                    <div>
                        <div className="flex flex-1 justify-between items-center">
                            <h1 className="text-sm font-medium text-gray-500 truncate">{todo.title}</h1>
                            <div className="flex flex-row gap-2 opacity-0 group-hover:opacity-100">
                                <div>
                                    <CheckCircleIcon className="w-4 h-4 text-green-500 cursor-pointer" onClick={() => onComplete?.()}/>
                                    <span className="sr-only">Complete</span>
                                </div>
                                <div>
                                    <TrashIcon className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => onRemove?.()}/>
                                    <span className="sr-only">Remove</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-lg font-medium text-gray-900">{todo.body}</div>
                        <div>
                            {todo.isComplete ?
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                                    Completed
                                </span> :
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm bg-red-100 text-red-800">
                                    Not Complete
                                </span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
                <button className="font-medium text-cyan-700 hover:text-cyan-900" type="button" onClick={() => onEdit()}>
                    Edit
                </button>
            </div>
        </div>
    </div> : <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group"
                  onClick={() => onEdit()}
    >
        <div className="flex flex-1 justify-center">
            <PlusCircleIcon className="w-10 h-10 text-gray-300 group-hover:text-gray-900"/>
        </div>
        <span
            className="mt-2 block text-sm font-medium text-gray-300 group-hover:text-gray-900">Create a new todo</span>
    </div>
}