import React from 'react';

export default function ToDoItem(props) {
  const { complete, value, deleteTask } = props;
  const { name, priority, completed } = value;
  let style;
  if (!completed) {
    switch (priority) {
      case 'Urgent':
        style = 'list-group-item-danger';
        break;
      case 'Medium':
        style = 'list-group-item-warning';
        break;
      case 'Low':
        style = 'list-group-item-info';
        break;
      default:
        style = '';
    }
  } else {
    style = 'list-group-item-success';
  }
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center" ${style}`}>
      {name}
      <div>
        { !completed && (
        <button type="button" className="btn btn-link" onClick={complete}>
          <i className="far fa-check-circle" />
        </button>
        ) }
        <button type="button" className="btn btn-link" onClick={deleteTask}>
          <i className="far fa-times-circle" />
        </button>
      </div>
    </li>
  );
}
