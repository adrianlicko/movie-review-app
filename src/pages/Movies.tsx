import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // for getting all movies from the database
import { db } from "../firebase/config"; // getting a database
import AddMovie from "../components/AddDocument";
import { doc, deleteDoc } from "firebase/firestore"; // for deleting a movie
import './Movies.css'

interface Movie {
    id: string;
    title: string;
    rating: number;
    review: string;
    date: number;
}

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const moviesCol = collection(db, 'movies');
        const unsubscribe = onSnapshot(moviesCol, (snapshot) => {
            const movieList = snapshot.docs.map((doc: DocumentData) => ({
                id: doc.id,
                ...doc.data(),
            }) as Movie);
            setMovies(movieList);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const deleteMovie = async (id: string) => {
        try {
            await deleteDoc(doc(db, "movies", id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    return (
        <section className="movies-container">
            <div className="add-movie-component">
                <AddMovie collectionName='movies' />
            </div>
            <div className="one-movie-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="one-movie">
                        <h2 className="title">{movie.title}</h2>
                        <p className="rating">{movie.rating}</p>
                        <p className="review">{movie.review}</p>
                        <button className="delete-button" onClick={() => deleteMovie(movie.id)}>Delete movie</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Movies;