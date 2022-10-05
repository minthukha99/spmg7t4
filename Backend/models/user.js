import mongoose from "mongoose";
import Inc from "mongoose-sequence";

const userSchema = mongoose.Schema({
    userId: { type: String, required: true},
    username: { type: String, required: [true, "Username is required"]},
    password: { type: String, required: [true, "User password is required"]},
    userType: { type: String, required: [true, "Usertype is required"]},
    Skill: { type: Json, required: false }
});

const AutoIncrement = Inc(mongoose);
userSchema.plugin(AutoIncrement, {inc_field: 'userId'});
export default mongoose.model("User", userSchema);