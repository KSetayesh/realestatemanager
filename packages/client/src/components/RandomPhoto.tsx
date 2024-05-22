import { useEffect, useState } from "react";
import { PhotosApi } from "../api/photosapi";
import '../styles/RandomPhoto.css';

const photosApi: PhotosApi = new PhotosApi();
const images = await photosApi.getPhotos();

const RandomPhoto: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<string>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[Math.floor(Math.random() * images.length)]);
        }, 5000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div>
            {<img className="random-photo" src={currentImage} ></img>}
        </div >
    )
}

export default RandomPhoto;