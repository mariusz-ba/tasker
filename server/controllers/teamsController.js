// Models
import Team from '../models/team';
import Project from '../models/project';
import User from '../models/user';

/**
 * Responses with teams that user is assigned to
 * User id must be specified in req.user._id
 */
export const getUserTeams = (req, res, next) => {
  User.findById(req.user._id)
  .then(user => Team.find({ _id: { $in: user.teams }}))
  .then(teams => res.status(200).json(teams))
  .catch(err => next(err));
};

/**
 * Returns details for teams specified as
 * req.query.teams
 */
export const getTeams = (req, res, next) => {
  User.findById(req.user._id)
  .then(user => (
    Team.find({
      $and: [
        { _id: { $in: user.teams }},
        { _id: { $in: req.query.teams }}
      ]
    })
  ))
  .then(teams => res.status(200).json(teams))
  .catch(err => next(err));
}

/**
 * Returns team with members details. Team id
 * must be specified in req.params.id
 */
export const getTeam = (req, res, next) => {
  Team.findById(req.params.id)
  .then(team => {
    User.find({ teams: req.params.id }, { password: false }, (err, users) => {
      res.status(200).json({ _id: team._id, name: team.name, users });
    })
  })
  .catch(err => next(err));
}

/**
 * Creates new team and responses with new team data.
 * Team name must be provided in req.body.name and array
 * with members ids is passed in req.body.users
 */
export const createTeam = (req, res, next) => {
  // req.body.users === [id, id, id]
  Team.create({ name: req.body.name })
  .then(team => {
    User.update(
    { _id: { $in: [...req.body.users, req.user._id] }},
    { $push: { teams: team._id }},
    { multi: true }, (err) => {
      res.status(201).json({
        _id: team._id,
        name: team.name,
        users: [...req.body.users, req.user._id]
      })
    })
  })
  .catch(err => next(err));
}

export const updateTeam = (req, res, next) => {

}

export const deleteTeam = (req, res, next) => {

}