import GetDocuments from '../components/GetDocuments'
import AddDocument from '../components/AddDocument'

const Movies = () => {
    return <section>
        <AddDocument collectionName='movies'/>
        <GetDocuments collectionName='movies'/>
    </section>
}

export default Movies