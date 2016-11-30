const AuthenticationController = require('./controllers/authentication'),
      UserController = require('./controllers/user'),
      UploadController = require('./controllers/upload'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();
        userRoutes = express.Router();

  // Setting endpoint for apiRoutes
  app.use('/', apiRoutes);

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  authRoutes.post('/login', AuthenticationController.login);

  // Set user routes
  apiRoutes.use('/users', userRoutes);

  // View user profile route
  userRoutes.get('/:username', UserController.viewProfile);

  // View user profile route
  userRoutes.put('/:uid', UserController.editProfile);

  // image upload
  apiRoutes.put('/files', requireAuth, UploadController.uploadAvatar);
}
