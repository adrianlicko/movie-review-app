import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const AddMovie = () => {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            await addDoc(collection(db, "movies"), {
                title: title,
                review: review,
                rating: parseInt(rating, 10)
            });
    
            setTitle("");
            setReview("");
            setRating("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return <form onSubmit={submitForm}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Your review" value={review} onChange={e => setReview(e.target.value)} />
        <input type="number" placeholder="Rating" min={1} max={10} value={rating} onChange={e => setRating(e.target.value)} />
        <button type="submit">Add Movie</button>
    </form>
}

export default AddMovie