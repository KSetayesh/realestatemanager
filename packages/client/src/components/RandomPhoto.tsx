// RandomPhoto.tsx
import { useEffect, useState } from "react";
import { PhotosApi } from "../api/photos/photosapi";
import { Box, Card, CardMedia, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    height: 600,
    margin: 'auto',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
}));

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
        <Box mt={4}>
            {currentImage && (
                <StyledCard>
                    <CardMedia
                        component="img"
                        image={currentImage}
                        alt="Random"
                        style={{ height: '100%', width: '100%' }}
                    />
                </StyledCard>
            )}
        </Box>
    );
}

export default RandomPhoto;