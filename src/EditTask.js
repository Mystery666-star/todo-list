import React, { useState } from "react";

const EditTask = ({ taskList, onEditTask }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleEdit = (task) => {
        setSelectedTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setCategory(task.category);
        setDueDate(task.dueDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            id: selectedTaskId,
            title,
            description,
            category,
            dueDate,
            completed: false // Assuming default value for now, adjust as necessary
        };

        try {
            const response = await fetch(`/api/tasks/${selectedTaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                onEditTask(updatedTask);
                // Clear form after submission
                setTitle('');
                setDescription('');
                setCategory('');
                setDueDate('');
                setSelectedTaskId(null);
            } else {
                console.error("Failed to edit the task.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div>
            <div>
                <h3>Edit Task</h3>
                <select onChange={(e) => handleEdit(taskList.find(task => task.id === parseInt(e.target.value)))}>
                    <option value="">Select a task to edit</option>
                    {taskList.map((task) => (
                        <option key={task.id} value={task.id}>{task.title}</option>
                    ))}
                </select>

                {selectedTaskId && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Shopping">Shopping</option>
                            </select>
                        </div>
                        <div>
                            <label>Due date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => { setDueDate(e.target.value) }}
                            ></input>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditTask;
