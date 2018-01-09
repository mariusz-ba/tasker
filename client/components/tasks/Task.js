import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTask, updateTask, addComment, deleteComment } from '../../actions/tasksActions';
import Card from '../ui/Card';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }
  componentDidMount() {
    const { id, task } = this.props.match.params;
    this.props.fetchTask(id, task);
  }

  setCompleted = (completed) => {
    const { id, task } = this.props.match.params;
    this.props.updateTask(id, task, { completed });
  }

  onChangeComment = (e) => {
    this.setState({ comment: e.target.value });
  }

  onPublishComment = () => {
    const { id, task } = this.props.match.params;
    this.props.addComment(id, task, { content: this.state.comment });
  }

  onDeleteComment = (comment) => {
    const { id, task } = this.props.match.params;
    this.props.deleteComment(id, task, comment);
  }

  render() {
    const { tasks } = this.props.tasks;
    const task = tasks[this.props.match.params.task];
    const completed = task && task.completed ? <span className="badge badge-success">Completed</span> : <span className="badge badge-danger">Not Completed</span>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="text-muted" style={{marginBottom: 8}}>Status</p>
            <div className="card">
              <img className="card-img-top" src="/img/task.png"/>
              <div className="card-block">
                <h6 className="card-title">Author</h6>
                <p className="card-text text-muted">{task && task.author}</p>
              { task &&
                task.completed ?
                  (<button className="btn btn-sm btn-primary" onClick={() => this.setCompleted(!task.completed)}><span className="fa fa-check" aria-hidden="true"></span> Completed</button>) :
                  (<button className="btn btn-sm btn-warning" onClick={() => this.setCompleted(!task.completed)}><span className="fa fa-times" aria-hidden="true"></span> Not Completed</button>)
              }
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <p className="text-muted" style={{marginBottom: 8}}>Description</p>
            <div className="card">
              <div className="card-body">
                <h5>{task && task.description}</h5>
              </div>
            </div>
            <p className="text-muted" style={{marginBottom: 8}}>Comments</p>
            <div className="card">
              <div className="card-body">
              { task &&
                task.comments.length ?
                ( task.comments.map(comment => ( <div key={comment._id}><p>{comment.content}</p><button className="btn btn-sm btn-danger" onClick={() => this.onDeleteComment(comment._id)}>Delete</button></div> ))) :
                ( <p>No comments.</p> )
              }
              </div>
              <div className="card-footer">
                <input type="text" className="form-control" placeholder="Comment" value={this.state.comment} onChange={this.onChangeComment}/>
                <button className="btn btn-primary" onClick={this.onPublishComment}>Publish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tasks }) {
  return { tasks }
};

export default connect(mapStateToProps, { fetchTask, updateTask, addComment, deleteComment })(Task);