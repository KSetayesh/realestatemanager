import { useEffect, useState } from "react";
import { PhotosApi } from "../api/photosapi";
import '../styles/RandomPhoto.css';

const RandomPhoto: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<string>();
    const photosApi: PhotosApi = new PhotosApi();

    const getPhotos = async (): Promise<string[]> => {
        const images = await photosApi.getPhotos();
        return images;
    }

    useEffect(() => {
        const fetchPhotosAndSetImage = async () => {
            const images: string[] = await getPhotos();
            setCurrentImage(images[Math.floor(Math.random() * images.length)]);
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
