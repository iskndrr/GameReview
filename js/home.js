import { Details } from "./details.js"
import { Ui } from "./ui.js"

export class Home {
    constructor() {
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener('click', () => {
                this.activeLink(link)
                const category = link.dataset.category;

                this.getGames(category)
            })
        })

        this.loading = document.querySelector('.loader')
        this.ui = new Ui()
        this.details = document.getElementById('details')
        this.games = document.getElementById('games')
        this.getGames('Shooter')
    };
    async activeLink(link) {
        document.querySelector(".navbar-nav .active").classList.remove('active');
        link.classList.add('active');
    }
    async getGames(cat) {
        this.loading.classList.remove('d-none')
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd5ab876552msh53b3f8b60062c6dp156b15jsndf3846bc8960',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options)
            .catch(err => console.error(err));
        const response = await api.json();
        this.loading.classList.add('d-none')
        this.ui.displayDataGame(response);
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('click', () => {
                this.details.classList.remove('d-none')
                this.games.classList.add('d-none')
                new Details(card.dataset.id);
            })
        })
    }
   
}