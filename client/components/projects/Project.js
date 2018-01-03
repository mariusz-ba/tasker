import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, createTask, updateTask } from '../../actions/tasksActions';
import { fetchCards, createCard, updateCard, deleteCard } from '../../actions/cardsActions';
import { withRouter } from 'react-router-dom';

import Card from './card/Card';
import TasksList from './tasks/TasksList';

class Project extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchCards(id);
    this.props.fetchTasks(id);
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
    const cards = this.props.cards.map(card => {
      const tasks = this.props.tasks.filter(task => task.card === card._id);
      return {
        _id: card._id,
        name: card.name,
        tasks
      }
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4><small><span className="badge badge-pill badge-secondary">123</span></small> Project name</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet...</p>
          </div>
        </div>
        <hr/>
        <div className="row" style={{margin: '16px 0'}}>
          <div className="col" style={{padding: '0'}}>
            <a href="#" className="btn simple-button" onClick={this.onCreateCard}>ADD NEW CARD</a>
            <input style={{width: '200px'}} type="text" placeholder="Filter cards by label" className="form-control pull-right"/>
          </div>
        </div>
        <div className="row">
        {
          cards.map(card => (
          <div key={card._id} className="col-md-12">
            <Card 
              name={card.name} 
              onCardNameChanged={(name) => {this.props.updateCard(this.props.match.params.id, card._id, { name })}}
              onCardDelete={() => {this.props.deleteCard(this.props.match.params.id, card._id)}}>
              <div className="card-tags">
                <span className="badge badge-success">Feature</span>
                <a href="#" className="badge badge-primary">+ Add Tag</a>
              </div>
              <TasksList
                tasks={card.tasks}
                onTaskToggled={(id, completed) => {
                  console.log(`Task (${id}) toggled to ${completed}`);
                  this.props.updateTask(this.props.match.params.id, id, { completed })
                }}
                onTaskDescriptionChanged={(id, description) => {
                  console.log(`Task (${id}) changed name to "${description}"`);
                  this.props.updateTask(this.props.match.params.id, id, { description })
                }}/>
              <a href="#" className="btn simple-button" onClick={(e) => this.onCreateTask(e, card._id)}>Add a task</a>
            </Card>
          </div>
          ))
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ cards, tasks }) {
  return {
    cards,
    tasks
  }
}

export default withRouter(connect(mapStateToProps, { 
  fetchTasks, createTask, updateTask,
  fetchCards, createCard, updateCard, deleteCard
})(Project));