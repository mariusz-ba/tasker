import User from '../models/user';
import Project from '../models/project';
import Teams from '../models/team';

/**
 * Check if currently signed in user has access to project
 * 
 * @param {Object} req - Request object that has req.params.id, req.user
 * @param {Object} res - Response object
 * @param {Function} next - Next function
 */
export function accessProject(req, res, next) {
  User.findOne({ _id: req.user.id }, (err, user) => {
    if(err) return next(err);

    Project.findOne(
      {
        _id: req.params.id, 
        $or: [
          {teams: {$in: user.teams}}, 
          {author: user._id}
        ] 
      }, (err, project) => {
        if(err) return next(err);
        if(project)
          next();
        else
          res.status(403).json({ error: "You don't have access to this project"});
      }
    )
  })
}

export function accessTeam(req, res, next) {
  User.findOne(
    {
      _id: req.user._id, 
      teams: req.params.id 
    }
  )
  .then(user => {
    if(user)
      next();
    else
      res.status(403).json({ error: "You dont't have access to this team"});
  })
  .catch(err => next(err));
}