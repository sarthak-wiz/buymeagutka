'use client';
import { saveProfile } from "@/actions/ProfileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import {ProfileInfo} from "@/models/ProfileInfo"
import { profile } from "console";

type Props = {
    profileInfo:ProfileInfo|null;
}

export default function ProfileInfoForm({profileInfo}:Props) {

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);
    async function handleFormAction(formData: FormData) {
        const result = await saveProfile(formData);
        console.log(result);
    }
    
    return(
        <form action={handleFormAction}>
            <div className="border bg-gray-100 p-4 rounded-lg">
                <div className="border bg-gray-100 size-24 rounded-full p-4">
                    avatar
                    <UploadButton onUploadComplete={setAvatarUrl} />
                    <input type="hidden" name="avatarUrl" value={avatarUrl}/>
                </div>
                <div>
                    cover image
                    <UploadButton onUploadComplete={setCoverUrl} />
                    <input type="hidden" name="coverUrl" value={coverUrl}/>
                </div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="usernameIn">username</label>
                <input 
                defaultValue={profileInfo?.username}
                name="username"
                id="usernameIn" 
                type="text" placeholder="username" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="displayNameIn">display name</label>
                <input 
                defaultValue={profileInfo?.displayName} 
                name="displayName" 
                id="displayNameIn" 
                type="text" placeholder="display name" />
            </div>
            <div>
            <label className="block mt-4" htmlFor="bioIn">bio</label>
            <textarea defaultValue={profileInfo?.bio}
            id="bioIn" 
            name="" placeholder="bio"></textarea>
            </div>
            <div>
                <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
                    save profile
                </button>
            </div>
   </form>         
)};