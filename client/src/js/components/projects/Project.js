import React, { Component } from 'react';

export default class Project extends Component {
  render() {
    const cards = [
      { _id: 1, name: 'First card', tasks: ['dfsafdsafdas', 'fdsafsafdasfdsa']},
      { _id: 2, name: 'Second card', tasks: ['dfsafdsafdas', 'fdsafsafdasfdsa']},
      { _id: 3, name: 'Third card', tasks: ['dfsafdsafdas', 'fdsafsafdasfdsa']}
    ]
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
            <a href="#" className="btn simple-button">ADD NEW CARD</a>
            <input style={{width: '200px'}} type="text" placeholder="Filter cards by label" className="form-control pull-right"/>
          </div>
        </div>  
        <div className="row">
        {
          cards.map(card => (
          <div key={card._id} className="col-md-12">
            <div className="card group-card">
              <h6 className="card-header">{card.name}<small> <i className="fa fa-comment-o" aria-hidden="true"></i> 3</small></h6>
              <div className="card-body">
                <div className="card-tags">
                  <span className="badge badge-success">Feature</span>
                  <a href="#" className="badge badge-primary">+ Add Tag</a>
                </div>
                { card.tasks && 
                  card.tasks.map((task, index) => 
                  <div key={index} className="task-row">
                    <input type="checkbox"/>
                    <span>{task}</span>
                    <span className="badge badge-secondary"><i className="fa fa-comment-o" aria-hidden="true"></i> 3</span>
                    <span className="badge badge-primary">Mariusz Baran - Sun, Jul 10</span>
                  </div>)
                }
                <a href="#" className="btn simple-button">Add a task</a>
              </div>
            </div> 
          </div>
          ))
        }
        </div>
      </div>
    )
  }
}