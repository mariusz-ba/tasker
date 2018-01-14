import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjectPage } from '../../actions/pages/project';
import { createTask, updateTask, deleteTask } from '../../actions/tasksActions';
import { createCard, updateCard, deleteCard } from '../../actions/cardsActions';
import { withRouter, Link } from 'react-router-dom';

import Card from './card/Card';
import TasksList from './tasks/TasksList';
import TasksListItem from './tasks/TasksListItem';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { values } from 'lodash';

Object.defineProperty(Array.prototype, 'sortBy', {
  enumerable: false,
  value: function(param, asc = true) { 
    return this.sort((lhs, rhs) => {
      if(asc)
        return lhs[param] > rhs[param];
      return lhs[param] < rhs[param];
    })
  }
})

class Project extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchProjectPage(id);
  }

  onCreateCard = (e) => {
    e.preventDefault();
    this.props.createCard(this.props.match.params.id, 'new cards heheh');
  }

  onCreateTask = (e, card) => {
    e.preventDefault();
    this.props.createTask(this.props.match.params.id, {
      description: 'Noweeee',
      completed: false,
      card
    });
  }

  render() {
    const { id } = this.props.match.params;
    const { teams, projects, cards, tasks } = this.props;
    const { fetching } = projects;
    
    const project = projects.projects[id];
    const uicards = values(cards.cards).map(card => {
      return {
        ...card,
        tasks: values(tasks.tasks).filter(task => task.card === card._id)
      }
    });

    const cardsTransitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    };

    if(fetching)
      return null;
    return (
      <div className="container">
        <header>
          <div className="row">
            <div className="col-md-9">
              <h4>
                <small>
                  <span className="badge badge-pill badge-secondary">
                    {tasks && Object.keys(tasks.tasks).length}
                  </span>
                </small>&nbsp;
                {project && project.name}
              </h4>
              <p className="text-muted">{project && project.description}</p>
              <Link className="btn btn-secondary" to={`/projects/${this.props.match.params.id}/edit`}>Edit</Link>
            </div>
            <div className="col-md-3">
              <div className="card">
                <h6 className="card-header">Teams</h6>
                <div>
                  <ul className="list-group teams-list">
                  { teams &&
                    values(teams.teams).map(team => (
                      <li key={team._id} className="list-group-item">{team.name}</li>
                    ))
                  }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <hr/>
        <div className="row" style={{margin: '16px 0'}}>
          <div className="col" style={{padding: '0'}}>
            <a href="#" className="btn btn-sm btn-primary" onClick={this.onCreateCard}>Add new card</a>
            <input style={{width: '200px'}} type="text" placeholder="Filter cards by label" className="form-control pull-right"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <ReactCSSTransitionGroup {...cardsTransitionOptions}>
          {
            uicards
            .sortBy('createdAt', false)
            .map(card => (
              <Card 
                key={card._id}
                name={card.name} 
                onCardNameChanged={(name) => {this.props.updateCard(id, card._id, { name })}}
                onCardDelete={() => {this.props.deleteCard(id, card._id)}}>             
                <TasksList>
                  {
                    card.tasks &&
                    card.tasks
                    .sortBy('createdAt', true)
                    .map(task => (
                      <TasksListItem
                        key={task._id}
                        {...task}
                        onTaskToggled={(completed) => {this.props.updateTask(id, task._id, { completed })} }
                        onDescriptionChanged={(description) => {this.props.updateTask(id, task._id, { description })} }
                        onDescriptionClicked={() => {this.props.history.push(`/projects/${id}/tasks/${task._id}`)}}
                        onDeleteClicked={() => this.props.deleteTask(id, task._id)}/>
                    ))
                  }
                </TasksList>
                <div style={{marginTop: 10}}>
                  <a href="#" className="btn btn-sm btn-primary" onClick={(e) => this.onCreateTask(e, card._id)}>Add a task</a>
                </div>
              </Card>
            ))
          }
          </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ teams, projects, cards, tasks }) {
  return {
    teams,
    projects,
    cards,
    tasks
  }
}

export default withRouter(connect(mapStateToProps, { 
  fetchProjectPage,
  createTask, updateTask, deleteTask,
  createCard, updateCard, deleteCard
})(Project));