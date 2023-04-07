import { Ui } from "./ui.js";


export class Details {
    constructor(id) {
        document.getElementById('btnClose').addEventListener('click', () => {
            document.getElementById('details').classList.add('d-none')
            document.getElementById('games').classList.remove('d-none')
        })
        this.loading = document.querySelector('.loader')

        this.getDetails(id)
    };

    async getDetails(id) {
        this.loading.classList.remove('d-none')

        console.log('hi');
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd5ab876552msh53b3f8b60062c6dp156b15jsndf3846bc8960',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

       const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
        const response = await api.json();
        this.loading.classList.add('d-none')
        console.log(response);
        new Ui().displayDetails(response)
    }

}