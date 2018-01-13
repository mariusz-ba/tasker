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
    User.find({ teams: req.params.id }, { password: false })
    .then(users => res.status(200).json({ _id: team._id, name: team.name, users }))
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

/**
 * Updates team with received data
 * req.params.id - Id of a team that will be updated
 * req.body = {
 *    name: string - New name for that team (required)
 *    users: [] - Array with users ids that will be assigned to that team
 * }
 */
export const updateTeam = (req, res, next) => {
  // Update team information
  Team.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: req.body.name,
      updatedAt: Date.now()
    }},
    {new: true}
  )
  .then(team => (
    // Add specified users to team
    User.update(
      { _id: { $in: req.body.users }},
      { $addToSet: { teams: team._id }},
      {multi: true}
    )
    .then(() => (
      // Remove other users from team
      User.update(
        { _id: { $nin: req.body.users }},
        { $pull: { teams: team._id }},
        {multi: true}
      )
    ))
    .then(() => User.find({ _id: req.body.users }))
    .then(users => res.status(200).json({
      ...team._doc,
      users
    }))
  ))
  .catch(err => next(err));
}

/**
 * Delete team and remove its connections with 
 * users and projects.
 */
export const deleteTeam = (req, res, next) => {
  // Delete team with specified id
  Team.deleteOne({ _id: req.params.id })
  // Remove users from that team
  .then(() => User.update(
    { teams: req.params.id },
    { $pull: { teams: req.params.id }},
    { multi: true }
  ))
  // Remove that team from all projects that it's assigned to
  .then(() => Project.update(
    { teams: req.params.id },
    { $pull: { teams: req.params.id }}
  ))
  .then(() => res.status(200).json(req.params.id))
  .catch(err => next(err));
}