class Run {

    constructor() {
        this.listeLancer = []
    }

    getListePopulation() {
        return this.listeLancer;
    }

    async runPopulationInitiale() {
        for (let i = 0; i < 10; i++) {
            let a = new LancerSimulation()
            this.listeLancer.push(a)
            await a.run();
            this.nettoyer();
        }
    }

    async runPopulation(enfants) {
        this.listeLancer = []
        for (let i = 0; i < enfants.length; i++) {
            let a = new LancerSimulation()
            a.setGenes(enfants[i].getGenes())
            this.listeLancer.push(a)
            await a.run();
            this.nettoyer();
        }
    }

    nettoyer() {
        var elementsRond = document.querySelectorAll('.rond');
        elementsRond.forEach((element) => {
            element.remove()
        });
        /*this.VALEUR_DESCENTE = 10
        this.TAILLE_ROND = 50
        this.BOTTOM_CONTENANT = document.getElementById("body").offsetHeight - this.TAILLE_ROND;
        this.CLASSE_PROCHAIN_FRUIT = "taille1"
        this.PERDU = false
        this.x = Math.random() * ((document.getElementById("contenant").getBoundingClientRect().x + document.getElementById("contenant").getBoundingClientRect().width) - document.getElementById("contenant").getBoundingClientRect().x) + document.getElementById("contenant").getBoundingClientRect().x;
        this.genes = []*/
    }
}