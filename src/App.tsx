import { useState } from 'react';
import './App.css';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type FilterType = 'All' | 'Active' | 'Completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<FilterType>('All');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true; // All
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
          <p className="text-indigo-200 text-sm">Organize your tasks efficiently</p>
        </div>

        <div className="p-6">
          <form onSubmit={addTask} className="mb-6 flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="What needs to be done?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add
            </button>
          </form>

          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            {(['All', 'Active', 'Completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {filter === 'All'
                  ? "You don't have any tasks yet. Add one above!"
                  : `No ${filter.toLowerCase()} tasks found.`}
              </p>
            ) : (
              <ul className="space-y-2">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                      task.completed
                        ? 'bg-gray-50 border-gray-100 text-gray-400'
                        : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`flex-1 break-all ${
                        task.completed ? 'line-through' : 'font-medium text-gray-700'
                      }`}
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-100">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total • {tasks.filter(t => !t.completed).length} active • {tasks.filter(t => t.completed).length} completed
        </div>
      </div>
    </div>
  );
}

export default App;
