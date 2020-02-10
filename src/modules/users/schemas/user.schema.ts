import * as bcrypt from "bcryptjs";
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "/avatars/default.png"
  }
});
// tslint:disable-next-line:typedef
UserSchema.pre("save", function (next) {
  // tslint:disable-next-line:no-invalid-this no-this-assignment
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});
// tslint:disable-next-line:typedef
UserSchema.methods.checkPassword = function(attempt, callback): void {
  // tslint:disable-next-line:no-invalid-this no-this-assignment
  const user = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};
