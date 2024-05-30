'use client';
import { saveProfile } from "@/actions/ProfileInfoActions";
import { uploadToS3 } from "@/actions/uploadActions";
import { ChangeEvent } from "react";

export default function ProfileInfoForm() {
    async function handleFormAction(formData: FormData) {
        const result = await saveProfile(formData);
        console.log(result)
    }
    async function upload(ev:ChangeEvent<HTMLInputElement>) {
        const target = ev.target as HTMLInputElement;
        if (target.files?.length) {
            const file = target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            console.log(await uploadToS3(formData));
    }
}
    return(
        <form action={handleFormAction}>
            <div className="bg-gray-200 p-4 rounded-lg">
                <div className="bg-gray-300 size-24 rounded-full p-4">avatar</div>
                <div>
                    cover image
                    <input type="file" onChange={ev => upload(ev)} />
                </div>
            </div>
            <div>
                <label className="block mt-4" htmlFor="usernameIn">username</label>
                <input name="username" id="usernameIn" type="text" placeholder="username" />
            </div>
            <div>
                <label className="block mt-4" htmlFor="displayNameIn">display name</label>
                <input name="username" id="displayNameIn" type="text" placeholder="display name" />
            </div>
            <div>
            <label className="block mt-4" htmlFor="bioIn">bio</label>
            <textarea id="bioIn" name="" placeholder="bio"></textarea>
            </div>
            <div>
                <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg">
                    save profile
                </button>
            </div>
   </form>         
)};