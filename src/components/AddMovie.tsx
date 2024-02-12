import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import './AddMovie.css'

const AddMovie = () => {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (title && review && rating) {
                await addDoc(collection(db, "movies"), {
                    title: title,
                    review: review,
                    rating: parseInt(rating, 10),
                    date: new Date().getTime()
                });

                setTitle("");
                setReview("");
                setRating("");
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return <form onSubmit={submitForm} className="add-movie-container">
        <input type="text" className="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea type="text" className="review" placeholder="Your review" value={review} onChange={e => setReview(e.target.value)} />
        <input type="number" className="rating" placeholder="Rating" min={1} max={10} value={rating} onChange={e => setRating(e.target.value)} />
        <button type="submit" className="submit-button">Add Movie</button>
    </form>
}

export default AddMovie