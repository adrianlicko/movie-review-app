import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebase/config";
import AddMovie from "../components/AddMovie";

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
            const movieList = snapshot.docs.map((doc: DocumentData) => doc.data() as Movie);
            setMovies(movieList);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <section>
            <AddMovie />

            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.rating}</p>
                    <p>{movie.review}</p>
                </div>
            ))}
        </section>
    );
}

export default Movies;