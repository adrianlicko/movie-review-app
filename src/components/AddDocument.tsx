import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import './AddDocument.css'

const AddDocument = ({ collectionName }: { collectionName: string }) => {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [image, setImage] = useState(null);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (title && review && rating && image) {
                let imageUrl = "";
                const imageRef = ref(storage, `${collectionName}/${image.name + v4()}`);
                await uploadBytes(imageRef, image);
                const url = await getDownloadURL(imageRef);
                imageUrl = url;

                await addDoc(collection(db, collectionName), {
                    title: title,
                    review: review,
                    rating: parseInt(rating, 10),
                    image: imageUrl,
                    date: new Date().getTime()
                });

                setTitle("");
                setReview("");
                setRating("");
                setImage(null);
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return <form onSubmit={submitForm} className="add-document-container">
        <input type="text" className="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="review" placeholder="Your review" value={review} onChange={e => setReview(e.target.value)} />
        <input type="number" className="rating" placeholder="Rating" min={1} max={10} value={rating} onChange={e => setRating(e.target.value)} />
        <input type="file" className="image" onChange={e => setImage(e.target.files[0])} />
        <button type="submit" className="submit-button">Add Movie</button>
    </form>
}

export default AddDocument