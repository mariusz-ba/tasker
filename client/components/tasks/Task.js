import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTask, updateTask, addComment, deleteComment } from '../../actions/tasksActions';
import Card from '../ui/Card';
import { prettyDate, prettyDateTime } from '../../utils/date';

import { fetchTaskPage } from '../../actions/pages/project';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }
  componentDidMount() {
    const { id, task } = this.props.match.params;
    //this.props.fetchTaskWithAuthor(id, task);
    //this.props.fetchCommentsWithUsers(id, task);
    this.props.fetchTaskPage(id, task);
  }

  setCompleted = (completed) => {
    const { id, task } = this.props.match.params;
    this.props.updateTask(id, task, { completed });
  }

  onChangeComment = (e) => {
    this.setState({ comment: e.target.value });
  }

  onPublishComment = () => {
    if(this.state.comment.length == 0) return;
    const { id, task } = this.props.match.params;
    this.props.addComment(id, task, { content: this.state.comment });
    this.state.comment = '';
  }

  onDeleteComment = (comment) => {
    const { id, task } = this.props.match.params;
    this.props.deleteComment(id, task, comment);
  }

  render() {
    const { tasks } = this.props.tasks;
    const { users } = this.props.users;
    const task = tasks[this.props.match.params.task];
    const completed = task && task.completed ? <span className="badge badge-success">Completed</span> : <span className="badge badge-danger">Not Completed</span>;
    
    const publishClass = this.state.comment.length == 0 ? 'disabled' : '';

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="text-muted" style={{marginBottom: 8}}>Status</p>
            <div className="card">
              <img className="card-img-top" src="/img/task.png"/>
              <div className="card-block">
                <h6 className="card-title">Author</h6>
                <p className="card-text text-muted">
                { task &&
                  users &&
                  users[task.author] &&
                  (users[task.author].fullName ? users[task.author].fullName: users[task.author].username)
                }
                </p>
                <h6 className="card-title">Created at</h6>
                <p className="card-text text-muted">
                { task &&
                  prettyDate(new Date(task.createdAt))
                }
                </p>
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
              { task &&
                task.comments.length ?
                ( task.comments.map(comment => ( 
                  <div key={comment._id} className="card comment">
                    <img src="/img/profile.jpg" alt="profile"/>
                    <p className="card-header"><b>
                      {
                        users &&
                        users[comment.author] &&
                        (users[comment.author].fullName ? users[comment.author].fullName : users[comment.author].username)
                      }</b>
                      &nbsp;commented on&nbsp;
                      {
                        prettyDateTime(new Date(comment.updatedAt))
                      }
                      <button className="btn btn-sm btn-danger pull-right" onClick={() => this.onDeleteComment(comment._id)}>Delete</button>
                    </p>
                    <div className="card-body"><p>{comment.content}</p></div>
                  </div>
                ))) :
                ( <p>No comments.</p> )
              }
            <div className="card comment comment-editor">
              <img src="/img/profile.jpg" alt="profile"/>
              <p className="card-header">
                Publish as <b>
                {this.props.auth.user.fullName ? this.props.auth.user.fullName : this.props.auth.user.username}
                </b>
                <button className={`btn btn-sm btn-dark pull-right ${publishClass}`} onClick={this.onPublishComment}>Publish</button>
              </p>
              <div className="card-body">
                <textarea
                  className="form-control"
                  placeholder="Write your comment here"
                  value={this.state.comment}
                  onChange={this.onChangeComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, tasks, users }) {
  return { auth, tasks, users }
};

export default connect(mapStateToProps, { fetchTask, updateTask, addComment, deleteComment, fetchTaskPage })(Task);