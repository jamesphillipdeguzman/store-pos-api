import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initiate Google OAuth login
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect user to Google OAuth for login
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Initiate Google OAuth login via browser
 */
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }),
);

// Google OAuth callback url for login
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback url for login
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: OAuth login success, JWT returned to client via postMessage
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<script>window.opener.postMessage({ token: 'JWT_TOKEN' })</script>"
 *       302:
 *         description: Redirect if login fails
 */
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

    // Create JWT payload
    const payload = {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails[0]?.value || null,
    };

    // Sign JWT with secret and expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Callback - JWT token:', token);

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
/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Check the current authentication status
 *     description: Returns whether the user is currently authenticated and includes user profile if logged in
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Returns auth status and user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     displayName:
 *                       type: string
 *                       example: James Phillip De Guzman
 *                     emails:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            value:
 *                              type: string
 *                              example: jamesphillipdeguzman@gmail.com
 */
router.get('/auth/status', (req, res) => {
  let authenticated = false;
  let user = null;

  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Use regext to extract token safely
    const tokenMatch = authHeader.match(/^Bearer (.+)$/);
    const token = tokenMatch ? tokenMatch[1] : null;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
      authenticated = true;
    } catch (error) {
      console.error('JWT verification failed', error.message);
      authenticated = false;
    }
  } else {
    authenticated = req.isAuthenticated();
    user = req.user || null;
  }

  res.json({ authenticated, user });
});

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logs out the current user and redirects to home
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to homepage after logout
 */
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
/**
 * @swagger
 * /set-cookie:
 *   get:
 *     summary: Set a secure, test cookie
 *     description: Useful for debugging cookie behavior
 *     tags:
 *       - Development
 *     responses:
 *       200:
 *         description: Cookie set successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Cookie set
 */
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
