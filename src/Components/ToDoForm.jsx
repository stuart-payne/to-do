import React from 'react';

export default class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: 'Urgent',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority: event.target.value });
  }

  handleSubmit(event) {
    const { submit } = this.props;
    const { name, priority } = this.state;
    event.preventDefault();
    submit({
      name,
      completed: false,
      priority,
    });
  }

  render() {
    const { value } = this.state;
    const { priorities } = this.props;
    return (
      <form className="border p-2 m-2" onSubmit={this.handleSubmit}>
        <div className="form-inline w-100 my-2">
          <input placeholder="Add task here" className="form-control mr-2" type="text" name="task" value={value} onChange={this.handleNameChange} />
          <label className="mx-2" htmlFor="prio">
            Priority:
            <select className="form-control ml-1" name="prio" onChange={this.handlePriorityChange} value={value}>
              {priorities.map((val, key) => (
                <option key={key.toString()} value={val}>{val}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    );
  }
}
