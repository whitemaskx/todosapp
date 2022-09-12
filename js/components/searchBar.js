import alert from "./alert.js";

export default class searchBar {
    constructor(){
        this.search = document.getElementById('searchInput');
        this.btn = document.getElementById('searchBtn');
        this.alert = new alert();


    }

    onClick(callback){

        
        this.btn.onclick = () => {
            if( this.search.value === ''){
                this.alert.show('Search criteria are required');
            }else{
                this.alert.hide();
                callback(this.search.value);
            }
        }
    }
}