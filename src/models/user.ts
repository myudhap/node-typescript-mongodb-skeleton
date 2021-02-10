import { model, Schema, Document } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

export interface IUser extends Document {
    name: string
    email: string
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {timestamps: true});

userSchema.plugin(mongooseDelete, {deletedAt: true, overrideMethods: 'all'});
export default model<IUser>("User", userSchema);