import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../resources/User/userModel.mjs";

const jwtSecret = process.env.JWT_SECRET;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

passport.use(new Strategy(opts, async function(jwtPayload, done) {
    try {
        const user = await User.findById(jwtPayload.id);

        if(!user){
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        
        return done(error, false);
    }
}));
