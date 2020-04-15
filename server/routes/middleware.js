const requireAuth = (req, res, next) =>
  !req.user ? res.status(401).send({ message: 'User not authenticated' }) : next();

const requireStaffingAuth = (req, res, next) => {
  if (!req.user.isStaffing) {
    res.status(401).send({ message: 'Only staffing department authorized' }) 
  }
  else{
    next();
  }
}
module.exports = {
  requireAuth,
  requireStaffingAuth,
};
