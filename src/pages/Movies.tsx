import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // for getting all movies from the database
import { db } from "../firebase/config"; // getting a database
import AddMovie from "../components/AddMovie";
import { doc, deleteDoc } from "firebase/firestore"; // for deleting a movie

interface Movie {
    id: string;
    title: string;
    rating: number;
    review: string;
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
        <section>
            <AddMovie />

            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.rating}</p>
                    <p>{movie.review}</p>
                    <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
                </div>
            ))}
        </section>
    );
}

export default Movies;