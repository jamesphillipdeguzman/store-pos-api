import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';

// Load all environment variables first
dotenv.config();

// Add admin here using their emails
const adminEmails = [
  'jamesphillipdeguzman@gmail.com',
  'samuel.riverosb@gmail.com',
].map((e) => e.toLowerCase());

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
      console.log('Google profile:', profile);
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          existingUser.lastLogin = new Date();
          await existingUser.save();
          return done(null, existingUser);
        }

        const email = profile.emails?.[0]?.value; //This line safely extracts the primary email (usually the first one) with optional chaining. Google's OAuth profile object may include multiple emails or none at all
        if (!email) {
          console.error('Missing email in Google profile', profile);
          return done(new Error('Email is required'), null);
        }

        try {
          const normalizedEmail = email.trim().toLowerCase();
          const role = adminEmails.includes(normalizedEmail)
            ? 'admin'
            : 'cashier';

          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            role, // assigned based on email
            lastLogin: new Date(),
          });
          return done(null, newUser);
        } catch (err) {
          console.log('User create error', err);
          return done(err, null);
        }
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
