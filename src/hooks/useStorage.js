import React, { useState, useEffect } from 'react'
import { projectStorage, projectFirestore } from '../firebase'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references

        const storageRef = projectStorage.ref('Pics');
        const imageRef = storageRef.child(file.name);


        imageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await imageRef.getDownloadURL();

            setUrl(url);
        })
    }, [file])
    return (
        { progress, url, error }
    )

}
export default useStorage