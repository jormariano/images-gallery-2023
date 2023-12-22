import './Form.css'
import appFirebase from '../../config'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const Form = () => {

    let imgURL;

    const saveInfo = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const price = e.target.price.value;

        const newImg = {
            name: name,
            price: price,
            img: imgURL
        }

        try {
            await addDoc(collection(db, 'gallery'), { ...newImg })
        } catch (error) {
            console.log(error);
        }

        e.target.name.value = '';
        e.target.price.value = '';
        e.target.file.value = '';

    }

    const fileHandler = async (e) => {

        const fileImg = e.target.files[0];

        const refFile = ref(storage, `documents/${fileImg.name}`)

        await uploadBytes(refFile, fileImg)

        imgURL = await getDownloadURL(refFile)

    }

    return (
        <div className='form-container'>
            <h3>Agregar Imagenes</h3>

            <form onSubmit={saveInfo}>
                <label>Name: </label>
                <input type='text' placeholder='NAME' id='name' required />

                <label>Price: </label>
                <input type='text' placeholder='PRICE' id='price' required />

                <label>Add Img: </label>
                <input type='file' placeholder='IMG' id='file' onChange={fileHandler} />

                <button>SAVE</button>
            </form>

        </div>
    )
}

export default Form