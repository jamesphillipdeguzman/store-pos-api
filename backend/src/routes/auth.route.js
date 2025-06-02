import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initiate Google OAuth login
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

// Google OAuth callback url for login
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log('User:', req.user);
    console.log('Session:', req.session);
    console.log('Session ID:', req.sessionID);
    console.log('Cookies', req.cookies);

    res.send(`
            <html>
                <body> 
                    <script>
                        if(window.opener) {
                            window.opener.postMessage({
                                type: 'GOOGLE_AUTH_SUCCESS',
                                user: ${JSON.stringify(req.user)}
                            }, '${process.env.CLIENT_ORIGIN}');
                            window.close();
                        } else {
                            window.location.href = '${process.env.CLIENT_ORIGIN}';
                        }
                    </script>
                </body>
            </html>
        `);
  },
);

// Check for current authentication status
router.get('/auth/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) {
        console.log('Failed to destroy session during logout:', err);
      }
      // Clear the cookie so browser removes session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        sameSite: 'none',
        secure: true,
      });
      res.redirect('/');
    });
  });
});

// Set a secure test cookie

router.get('/set-cookie', (req, res) => {
  res.cookie('test', 'cookie-value', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60000,
  });
  res.send('Cookie set');
});

export default router;
