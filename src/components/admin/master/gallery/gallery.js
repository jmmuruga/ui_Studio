import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton, Button } from '@mui/material';
import { TiDelete, TiPlus } from 'react-icons/ti';
import notify from '../../../toast-utils'; // Adjust the import path as necessary
import './gallery.css';

// Dropzone component
const Dropzone = ({ onDrop, index, photo, removePhoto }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, index),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        noClick: !!photo.base64, // Disable click if there's already a preview
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive ? 'Drop a photo here...' : photo.base64 ? (
                <img src={photo.base64} alt={`Selected ${index}`} className='dropzoneimg' />
            ) : (
                'Drop a photo or click to upload'
            )}
            {/* {(
                <IconButton onClick={() => removePhoto(index)} key={`remove-${index}`}>
                    <TiDelete title="Remove" />
                </IconButton>
            )} */}
        </div>
    );
};

function Gallery() {
    const [album, setAlbum] = useState({ albumId: 0, albumName: '', title: '' });
    const [photos, setPhotos] = useState([]);
    const [errors, setErrors] = useState({});

    // Function to validate the form
    const validate = () => {
        let tempErrors = {};
        if (!album.albumName) tempErrors.albumName = 'Album Name is required';
        if (!album.title) tempErrors.title = 'Title is required';
        if (photos.length === 0) tempErrors.photos = 'At least one photo is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle changes in form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('albumId', album.albumId);
        formData.append('albumName', album.albumName);
        formData.append('title', album.title);

        photos.forEach(photo => {
            formData.append('photos', JSON.stringify(photo)); // Append each photo as JSON
        });

        console.log(photos, formData, 'ii');

        try {
            notify.success('Album added successfully');
        } catch (error) {
            notify.error('Error adding album');
        }
    };

    // Add a new photo dropzone
    const addPhotoDropzone = () => {
        setPhotos(prevPhotos => [...prevPhotos, { photoId: prevPhotos.length + 1, base64: null }]);
    };

    // Remove a photo by index
    const removePhoto = (index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    };

    // Convert file to Base64 and set state
    const convertFileToBase64AndSet = (file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target.result;
            setPhotos(prevPhotos => {
                const updatedPhotos = [...prevPhotos];
                updatedPhotos[index] = { ...updatedPhotos[index], base64: base64String };
                return updatedPhotos;
            });
        };
        reader.readAsDataURL(file); // Use readAsDataURL to handle the file as a Base64 string
    };

    // Handle file drop or selection
    const onDrop = useCallback((acceptedFiles, index) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            convertFileToBase64AndSet(file, index);
        }
    }, []);

    return (
        <div className='body'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Album ID</label>
                    <input name="albumId" value={album.albumId} onChange={handleChange} />
                    {errors.albumId && <p>{errors.albumId}</p>}
                </div>

                <div>
                    <label className='label-text'>Album Name</label>
                    <input className={`text-input ${!album.albumName && errors.albumName ? 'text-input-invalid' : ''}`}
                        name="albumName" value={album.albumName} onChange={handleChange} />
                    {errors.albumName && <p>{errors.albumName}</p>}
                </div>

                <div>
                    <label>Title</label>
                    <input name="title" value={album.title} onChange={handleChange} />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div style={{ display: 'flex' }}>
                    {photos.map((photo, index) => (
                        <div key={index}>
                            <Dropzone
                                onDrop={onDrop}
                                index={index}
                                photo={photo}
                                removePhoto={removePhoto}
                            />
                            {
                                <div>
                                    <IconButton onClick={() => removePhoto(index)}>
                                        <TiDelete title="Remove" />
                                    </IconButton></div>
                            }
                        </div>
                    ))}
                </div>

                <Button type="button" className='ad-button' onClick={addPhotoDropzone} startIcon={<TiPlus />}>
                    Add Photo
                </Button>

                {errors.photos && <p>{errors.photos}</p>}

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Gallery;
