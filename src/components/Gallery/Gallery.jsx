import './Gallery.css'
import { useState, useEffect } from 'react';
import appFirebase from '../../config'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, deleteObject, ref } from 'firebase/storage';

const db = getFirestore(appFirebase);

const Gallery = () => {

    const [gallery, setGallery] = useState([]);

    const deleteImage = async (id, imgUrl) => {
        try {
            
            await deleteDoc(doc(db, 'gallery', id));

            const storage = getStorage(appFirebase);

            const imgRef = ref(storage, imgUrl);

            await deleteObject(imgRef);

            setGallery(gallery.filter(images => images.id !== id));

        } catch (error) {

            console.error("Error deleting image: ", error);
        }
    };


    useEffect(() => {

        const getGallery = async () => {

            try {
                const querySnapshot = await getDocs(collection(db, 'gallery'))

                const docs = []

                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })

                setGallery(docs);

            } catch (error) {
                console.log(error);
            }
        }

        getGallery();

    }, [gallery])

    return (
        <div>
            {gallery.map((images) => (
                <div key={images.id}>
                    <h3>Name: {images.name}</h3>
                    <h3>Price: {images.price}</h3>
                    <img height='250' width='200' alt='document img' src={images.img} />
                    <button onClick={() => deleteImage(images.id, images.img)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Gallery