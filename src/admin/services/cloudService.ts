import { data } from "../../cards";
import { Input } from "../../shared/input";
import { CategoryService } from "./categoryService";

const uploadImageUrl = "https://api.cloudinary.com/v1_1/dmryy3jty/image/upload";
const uploadAudioUrl = "https://api.cloudinary.com/v1_1/dmryy3jty/video/upload";

const CLOUD_NAME = "dmryy3jty";
const API_KEY = "874354749673388";
export class CloudService{
    static image: Input;
    static audio: Input;
    static uploadAudio = async()=>{
        if(CloudService.audio.element.files){
            const cloudData = (await fetch(`${CategoryService.uri}/upload`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })).json();
            const signature = await cloudData.then(data => data.signature);
            const timestamp = await cloudData.then(data => data.timestamp);
            console.log(signature, timestamp);
            const form = new FormData();
        
            form.append('file', CloudService.audio.element.files[0]);
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload?api_key=${API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                {
                    method: 'POST',
                    body: form,
                }
            )
            const secure_url = await res.json().then(data => data.secure_url);
            return secure_url;
        }
    }
    static uploadImage = async()=>{
        if(CloudService.image.element.files){
            const cloudData = (await fetch(`${CategoryService.uri}/upload`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })).json();
            const signature = await cloudData.then(data => data.signature);
            const timestamp = await cloudData.then(data => data.timestamp);
            console.log(signature, timestamp);
            const form = new FormData();
        
            form.append('file', CloudService.image.element.files[0]);
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                {
                    method: 'POST',
                    body: form,
                }
            )
            const secure_url = await res.json().then(data => data.secure_url);
            return secure_url;
        }
    }
}
