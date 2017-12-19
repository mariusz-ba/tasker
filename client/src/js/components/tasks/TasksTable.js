import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

export default class TasksTable extends Component {

  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onUpdate(e, id) {
    e.preventDefault();
    console.log(id);
  }

  onDelete(e, id) {
    e.preventDefault();
    console.log(id);
    this.props.actions.deleteTask(id);
  }

  render() {
    const { tasks } = this.props;
    
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        { tasks &&
          tasks.map((task, index) => (
            <tr key={task._id ? task._id : index}>
              <td><span className="badge badge-info">{task._id}</span></td>
              <td>{task.description}</td>
              <td><span className="badge badge-success">{task.completed ? 'Completed' : 'Not completed'}</span></td>
              <td>
                <Link className="btn btn-primary btn-sm" to={"/tasks/" + task._id}>View</Link>
                &nbsp;
                <a className="btn btn-danger btn-sm" href="#" onClick={(e) => this.onDelete(e, task._id)}>Delete</a>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }
}