import { useState } from 'react'
import AddDocument from '../components/AddDocument'
import GetDocuments from '../components/GetDocuments'
import Searchbar from '../components/Searchbar'

const Movies = () => {
    const [searchText, setSearchText] = useState("")

    return <section>
        <AddDocument collectionName='movies' />
        <Searchbar setSearchText={setSearchText} />
        <GetDocuments collectionName='movies' searchText={searchText} />
    </section>
}

export default Movies