import React from "react";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({
  id,
  title,
  createdAt,
  isChecked,
  updateTaskList,
  removeTask,
}) => (
  <div className="flex items-center p-5 w-full">
    <div
      className="border-1 border-solid w-12 h-12 cursor-pointer"
      onClick={() => updateTaskList(id)}
    >
      <span>
        {isChecked && (
          <GiCheckMark className="w-full h-full text-green-400 font-extrabold p-1" />
        )}
      </span>
    </div>
    <div className="flex flex-col items-start w-full">
      <span
        className={`dark:text-gray-50 font-bold text-2xl ml-5 ${
          isChecked && "line-through"
        }`}
      >
        {title}
      </span>
      <span className="dark:text-gray-400 font-bold text-sm ml-5">
        Created At: {createdAt}
      </span>
    </div>
    <div>
      <GiCrossMark
        className="text-3xl text-red-400 cursor-pointer"
        onClick={() => removeTask(id)}
      />
    </div>
  </div>
);

const Task = ({
  id,
  title,
  createdAt,
  isChecked,
  updateTaskList,
  removeTask,
  index,
}) => {
  const defaultTaskCardClass =
    "flex items-center rounded-lg w-800 border-2 border-solid border-gray-500 my-5 relative";
  return (
    <>
      {!isChecked ? (
        <Draggable
          key={`draggable-${id}`}
          draggableId={`draggable-${id}`}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              key={`todo-list-${id}`}
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              className={`${defaultTaskCardClass} ${
                snapshot.isDragging ? "selected" : "not-selected"
              }`}
            >
              <TaskCard
                id={id}
                title={title}
                createdAt={createdAt}
                isChecked={isChecked}
                updateTaskList={updateTaskList}
                removeTask={removeTask}
              />
            </div>
          )}
        </Draggable>
      ) : (
        <div className={defaultTaskCardClass}>
          <TaskCard
            id={id}
            title={title}
            createdAt={createdAt}
            isChecked={isChecked}
            updateTaskList={updateTaskList}
            removeTask={removeTask}
          />
        </div>
      )}
    </>
  );
};

export default Task;
