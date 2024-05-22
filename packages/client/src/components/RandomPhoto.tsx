import { useEffect, useState } from "react";
import { PhotosApi } from "../api/photosapi";
import '../styles/RandomPhoto.css';

const RandomPhoto: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<string>();
    const photosApi: PhotosApi = new PhotosApi();

    const getAllPhotoUrls = async (): Promise<string[]> => {
        return photosApi.getAllPhotoUrls();
    }

    useEffect(() => {
        const fetchPhotosAndSetImage = async () => {
            const photoUrls: string[] = await getAllPhotoUrls();
            setCurrentImage(photoUrls[Math.floor(Math.random() * photoUrls.length)]);
        };

        fetchPhotosAndSetImage();

        const intervalId = setInterval(() => {
            fetchPhotosAndSetImage();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {<img className="random-photo" src={currentImage} alt="Random" />}
        </div>
    );
}

export default RandomPhoto;
