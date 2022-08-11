import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FaPlusCircle } from "react-icons/fa";

import { todoList } from "./data/dummy";

import "./app.css";
import { Modal, Switch, Task } from "./components";

import { useStateContext } from "./contexts/context-provider";

const LOCALSTORAGE_TASKS_KEY = "todolist-tasks";

const App = () => {
  const {
    currentMode,
    setMode,
    isLoading,
    setIsLoading,
    taskList,
    setTaskList,
    showModal,
    setShowModal,
  } = useStateContext();

  const updateTaskList = (taskId) => {
    const taskIndex = taskList.findIndex((task) => task.id === taskId);

    const updatedTask = [...taskList];
    updatedTask[taskIndex].isChecked = !updatedTask[taskIndex].isChecked;

    const destinationIndex = updatedTask[taskIndex].isChecked
      ? taskList.length - 1
      : updatedTask.findIndex((task) => task.isChecked);

    reorderItems(taskIndex, destinationIndex, updatedTask);
  };

  const removeTask = (taskId) => {
    setTaskList((currentState) =>
      currentState.filter((task) => task.id !== taskId)
    );
  };

  const addNewItem = (input) => {
    const title = input.current.value;
    const items = [...taskList] || [];
    const currentCount = items?.length || 0;
    const newItem = [
      ...items,
      {
        id: currentCount + 1,
        title: title,
        description: "Newly Added Task!",
        createdAt: new Date().toLocaleString(),
        isChecked: false,
      },
    ];

    setTaskList(newItem);

    const firstIndex = newItem.findIndex((task) => task.isChecked);
    const index = newItem.length - 1;
    const destination = firstIndex > 0 ? firstIndex : 0;
    reorderItems(index, destination, newItem);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // This code block is fired every time the array of
  // tasks undergo some change(add, remove, update)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(taskList));
    }
  }, [taskList]);

  // This code block is fired when the user page is loaded
  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY);
    tasksLocal && setTaskList(JSON.parse(tasksLocal));
    setIsLoading(false);
  }, []);

  const handleEnd = ({ source, destination }) => {
    if (!destination) return;
    reorderItems(source.index, destination.index);
  };

  const reorderItems = (index, destination, itemList) => {
    const items = itemList ? [...itemList] : [...taskList];
    let finalDestinationIndex = destination;

    if (itemList) {
      if (destination - index === 1 && index !== 0) {
        finalDestinationIndex = index;
      } else if (destination === -1 || index === 0) {
        finalDestinationIndex = items.length - 1;
      }
    }

    const [reorderedItem] = items.splice(index, 1);
    items.splice(finalDestinationIndex, 0, reorderedItem);
    setTaskList(items);
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg min-h-screen w-screen">
        <div className="flex flex-col items-center w-full">
          <span className="font-extrabold text-9xl dark:text-gray-50 my-10">
            To-Do App
          </span>
          <div className="border-2 border-solid border-gray-100 rounded-xl p-5">
            <div className="my-5 flex justify-between items-center">
              <button
                type="button"
                className="flex items-center text-3xl font-bold dark:text-gray-50 border-2 border-solid border-gray-500 p-2 rounded-md dark:hover:bg-gray-400 dark:hover:text-neutral-900"
                onClick={toggleModal}
              >
                <FaPlusCircle /> <span className="ml-2">Add New Item</span>
              </button>
              <div>
                <Switch currentMode={currentMode} setMode={setMode} />
              </div>
            </div>
            <DragDropContext onDragEnd={handleEnd}>
              <Droppable droppableId="to-dos" mode="standard">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskList.length > 0 &&
                      taskList.map((item, index) => (
                        <Task
                          key={`task-${item.id}`}
                          {...item}
                          updateTaskList={updateTaskList}
                          removeTask={removeTask}
                          index={index}
                          reorder={reorderItems}
                        />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          addNewItem={addNewItem}
        />
      </div>
    </div>
  );
};

export default App;
