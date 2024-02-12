import { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // for getting all movies from the database
import { db } from "../firebase/config"; // getting a database
import { doc, deleteDoc } from "firebase/firestore"; // for deleting a movie
import './GetDocuments.css'

interface Document {
    id: string;
    title: string;
    rating: number;
    review: string;
    date: number;
}

const GetDocuments = ({collectionName, searchText}: {collectionName: string; searchText: string}) => {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const documentsCol = collection(db, collectionName);
        const unsubscribe = onSnapshot(documentsCol, (snapshot) => {
            const documentList = snapshot.docs.map((doc: DocumentData) => ({
                id: doc.id,
                ...doc.data(),
            }) as Document);
            setDocuments(documentList);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [collectionName]);

    const deleteDocument = async (id: string) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    const filteredDocuments = documents.filter(document =>
        document.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <section className="document-container">
            <div className="one-document-container">
                {filteredDocuments.map((document) => (
                    <div key={document.id} className="one-document">
                        <h2 className="title">{document.title}</h2>
                        <p className="rating">{document.rating}</p>
                        <p className="review">{document.review}</p>
                        <button className="delete-button" onClick={() => deleteDocument(document.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default GetDocuments;