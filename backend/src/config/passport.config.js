import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';

// Load all environment variables first
dotenv.config();

// Configure GoogleStrategy to use pre-loaded env variables
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create user in DB
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          existingUser.lastLogin = new Date();
          await existingUser.save();
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          role: 'cashier', // default role
          lastLogin: new Date(),
        });
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

//Serialize the user to store user data in the session (usually user ID)
passport.serializeUser((user, done) => {
  done(null, user._id); // Only store user ID
});
// Deserialize the user from the session using the stored data (e.g., user ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
