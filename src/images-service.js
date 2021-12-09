import Notiflix from 'notiflix';

export default class ImagesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 200;
        
    }
    
        
    async fetchImages() {
        const API_KEY = '24700389-41a6c20aad42dc08b671c5623';
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
       
        const response = await fetch(url);
        const data = await response.json();
        const images= await this.hitsOfImages(data);
        return images;        
    }

    

    hitsOfImages(data) {
        
                // const totalPages = data.totalHits / this.perPage;
                // if (this.page > totalPages) {
                //     return Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');                    
                // };
        
                this.page += 1;                
                return data.hits;
    }

    resetPage() {
        this.page = 1;
    }

   
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

  
}