
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import "./App.css";

function App() {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Create Homepage",
        },
      ],
    },

    progress: {
      id: "progress",
      title: "In Progress",
      tasks: [],
    },

    done: {
      id: "done",
      title: "Done",
      tasks: [],
    },
  });

  const [files, setFiles] = useState({});

  const handleFileChange = (taskId, file) => {
    setFiles((previous) => ({
      ...previous,
      [taskId]: file,
    }));
  };

  const uploadFile = async (taskId) => {
    const file = files[taskId];

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/attachment`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      alert("File uploaded successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Server se connection nahi ho raha.");
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const tasks = [...sourceColumn.tasks];

      const [movedTask] = tasks.splice(source.index, 1);

      tasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks,
        },
      });

      return;
    }

    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        tasks: destinationTasks,
      },
    });
  };

  return (
    <div>
      <h1>My Kanban Board</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.values(columns).map((column) => (
            <Droppable
              key={column.id}
              droppableId={column.id}
            >
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column.title}</h2>

                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <strong>{task.title}</strong>

                          <div style={{ marginTop: "10px" }}>
                            <input
                              type="file"
                              onChange={(e) =>
                                handleFileChange(
                                  task.id,
                                  e.target.files[0]
                                )
                              }
                            />

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                uploadFile(task.id);
                              }}
                            >
                              Upload File
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
