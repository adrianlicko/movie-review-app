import './Searchbar.css'

const Searchbar = ({ setSearchText }: { setSearchText: (text: string) => void }) => {

    return <section className="searchbar-container">
        <input type="text" placeholder="Search..." onChange={(e) => setSearchText(e.target.value)} />
    </section>
};

export default Searchbar;