const KEY = '19404590-ebb1cf59ef1b71a0170f01254';


export default class ImgService {
    constructor() {
        this.searchQuery = '';
        this.pageQuery = 1;
    }

    fetchImages() {
        console.log(this);
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageQuery}&per_page=12&key=${KEY}`;
        return fetch(url)
        .then(response => {return response.json();
        })
        .then(response => {
            this.incrementPage();
            return response.hits;
        });
    };

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.pageQuery += 1;
    }

    resetPage() {
        this.pageQuery = 1;
    }
}