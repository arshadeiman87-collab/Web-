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
          id: "task-1",
          title: "Create Homepage",
        },
        {
          id: "task-2",
          title: "Design Navbar",
        },
      ],
    },

    progress: {
      id: "progress",
      title: "In Progress",
      tasks: [
        {
          id: "task-3",
          title: "Create Dashboard",
        },
      ],
    },

    done: {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "task-4",
          title: "Setup React Project",
        },
      ],
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Agar task board ke bahar drop ho
    if (!destination) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // Same column ke andar move
    if (source.droppableId === destination.droppableId) {
      const newTasks = [...sourceColumn.tasks];

      const [movedTask] = newTasks.splice(source.index, 1);

      newTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: newTasks,
        },
      });

      return;
    }

    // Ek column se doosre column mein move
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
    <div className="app">

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
                          {task.title}
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