import React from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";
import ToDoControl from "./ToDoControl";

export default class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    const storedTasks = localStorage.getItem("tasks");
    let parsedTasks;

    if (storedTasks !== null) {
      try {
        parsedTasks = JSON.parse(storedTasks);
      } catch (error) {
        console.error(error);
      }
    }

    const tasksToRender = parsedTasks || [];

    this.priorities = ["Urgent", "Medium", "Low"];
    this.filterTable = {
      All: () => () => true,
      Completed: (task) => task.completed,
      Incomplete: (task) => !task.completed,
      Urgent: (task) => task.priority === "Urgent",
      Medium: (task) => task.priority === "Medium",
      Low: (task) => task.priority === "Low",
    };
    this.state = {
      tasks: parsedTasks ?? [],
      tasksToRender,
      taskFilter: "All",
    };
  }

  componentWillUnmount() {
    this.saveTasks();
  }

  saveTasks() {
    const { tasks } = this.state;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTask(task) {
    const { tasks } = this.state;
    this.setState(
      {
        tasks: [...tasks, task],
      },
      () => this.runCurrentFilter()
    );
  }

  deleteTask(index) {
    const { tasks } = this.state;
    tasks.splice(index, 1);
    this.setState(
      {
        tasks,
      },
      () => this.runCurrentFilter()
    );
  }

  changeFilter(filterKey) {
    this.setState(
      {
        taskFilter: filterKey,
      },
      () => this.runCurrentFilter()
    );
  }

  runCurrentFilter() {
    const { taskFilter, tasks } = this.state;
    const filter = this.filterTable[taskFilter];
    this.setState({
      tasksToRender: tasks.filter((task) => filter(task)),
    });
  }

  completeTask(key) {
    const { tasks } = this.state;
    tasks[key].completed = true;
    this.setState({ tasks }, () => this.runCurrentFilter());
  }

  render() {
    const { tasksToRender } = this.state;
    return (
      <div className="toDoContainer">
        <h1>To Do</h1>
        <ToDoForm
          priorities={this.priorities}
          submit={(task) => this.addTask(task)}
        />
        <div className="m-2">
          {Object.keys(this.filterTable).map((key) => (
            <ToDoControl
              key={key}
              value={key}
              changeFilter={() => this.changeFilter(key)}
            />
          ))}
        </div>
        <ul className="list-group task-list m-2">
          {tasksToRender.map((task, ind) => (
            <ToDoItem
              complete={() => this.completeTask(ind)}
              deleteTask={() => this.deleteTask(ind)}
              value={task}
              key={ind.toString()}
            />
          ))}
        </ul>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => this.saveTasks()}
        >
          Save
        </button>
      </div>
    );
  }
}
