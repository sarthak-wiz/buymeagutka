import {Schema, model, models} from 'mongoose';

type ProfileInfo = {
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    coverUrl: string;
}

const profileInfoSchema = new Schema({
    username: {type: String, unique:true, required: true},
    DisplayName: {type: String},
    bio: {type: String},
    avatarUrl: {tyoe: String},
    coverUrl: {type: String},
}, {timestamps: true});


export const ProfileInfoModel = models.ProfileInfo || model( 'ProfileInfo', profileInfoSchema );
