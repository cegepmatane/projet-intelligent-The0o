class LancerSimulation {

    constructor() {
        this.listeResultat = []
        this.VALEUR_DESCENTE = 10
        this.TAILLE_ROND = 50
        this.BOTTOM_CONTENANT = document.getElementById("body").offsetHeight - this.TAILLE_ROND;
        this.CLASSE_PROCHAIN_FRUIT = "taille1"
        this.PERDU = false
        this.genes = [Math.random() * ((document.getElementById("contenant").getBoundingClientRect().x + document.getElementById("contenant").getBoundingClientRect().width) - document.getElementById("contenant").getBoundingClientRect().x) + document.getElementById("contenant").getBoundingClientRect().x]
        for (let index = 0; index < 200; index++) {
            let minVecteur = document.getElementById("contenant").getBoundingClientRect().x - this.genes.reduce((a, b) => a + b, 0)
            let maxVecteur = document.getElementById("contenant").getBoundingClientRect().x + document.getElementById("contenant").getBoundingClientRect().width / 1.5 - this.genes.reduce((a, b) => a + b, 0)
            this.genes.push(Math.random() * (maxVecteur - minVecteur) + minVecteur)
        }
        this.numeroFruit = 1
    }

    getGenes() {
        return genes
    }

    setGenes(genes) {
        this.genes = genes
    }

    pushGenes(genes) {
        this.genes.push(genes)
    }

    async run() {
        while (!this.PERDU) {
            let xRandom = this.genes[this.numeroFruit - 1] + this.genes[this.numeroFruit] + document.getElementById("contenant").getBoundingClientRect().x;
            this.ajouterFruit(xRandom, 200);
            await this.sleep(200);
        }
        console.log("Score " + this.numeroFruit, this.genes);
        this.PERDU = false;
    }

    ajouterFruit(x, y) {
        if (!this.PERDU) {
            //let x = event.clientX;        
            //let y = event.clientY;
            let tailleElement = Math.random() * (3 - 1) + 1;
            let rond = document.createElement("div")
            rond.classList.add("rond")
            rond.classList.add(this.CLASSE_PROCHAIN_FRUIT)
            this.CLASSE_PROCHAIN_FRUIT = "taille" + Math.round(tailleElement)
            document.getElementById("previsualisation").className = this.CLASSE_PROCHAIN_FRUIT
            rond.id = this.numeroFruit
            this.numeroFruit++;
            rond.style.left = x - (document.getElementById("body").offsetWidth - document.getElementById("grosContenant").offsetWidth) / 2 - this.TAILLE_ROND / 2 + "px"
            rond.style.top = y + this.TAILLE_ROND / 2 + "px"
            document.getElementById("playground").appendChild(rond)

            this.descendre(rond)
        }
    }

    descendre(rond) {
        rond.style.top = parseInt(rond.style.top.substring(0, rond.style.top.length - 2)) + this.VALEUR_DESCENTE + "px"
        if (this.detecterCollisionListe(rond)) {
            this.descendreMaxCollide(this.detecterCollisionListe(rond), rond);
        }
        else if (parseInt(rond.style.top.substring(0, rond.style.top.length - 2)) + this.VALEUR_DESCENTE > this.BOTTOM_CONTENANT) {
            this.sleep(20).then(() => { this.descendreMax(rond); });
        }
        else if (parseInt(rond.style.top.substring(0, rond.style.top.length - 2)) < this.BOTTOM_CONTENANT) {
            this.sleep(20).then(() => { this.descendre(rond); });
        }
    }

    detecterCollisionListe(rond) {
        let retour = false;
        var elementsRond = document.querySelectorAll('.rond');
        elementsRond.forEach((element) => {
            if (element.id !== rond.id) {
                if (this.detecterCollision(element, rond)) {
                    retour = element;
                }
            }
        });
        if (retour.classList && rond.classList && retour.classList.toString() == rond.classList.toString()) {
            this.fusionner(rond, retour)
        }
        return retour
    }

    fusionner(rond, retour) {
        rond.remove()
        if (retour.classList[1] === "taille1") {
            retour.classList.remove("taille1")
            retour.classList.add("taille2")
        }
        else if (retour.classList[1] === "taille2") {
            retour.classList.remove("taille2")
            retour.classList.add("taille3")
        }
        else if (retour.classList[1] === "taille3") {
            retour.classList.remove("taille3")
            retour.classList.add("taille4")
        }
        else if (retour.classList[1] === "taille4") {
            retour.classList.remove("taille4")
            retour.classList.add("taille5")
        }
        else if (retour.classList[1] === "taille5") {
            retour.classList.remove("taille5")
            retour.classList.add("taille6")
        }
        else {
            retour.classList.remove("taille6")
            retour.classList.add("taille7")
        }
        retour.style.top = parseInt(retour.style.top.substring(0, retour.style.top.length - 2)) + 1 + "px"
        this.detecterCollisionListe(retour)
        retour.style.top = parseInt(retour.style.top.substring(0, retour.style.top.length - 2)) - 1 + "px"
    }

    descendreMaxCollide(rond1, rond2) {
        if (rond1) {
            rond2.style.top = parseInt(rond1.style.top.substring(0, rond1.style.top.length - 2)) - this.TAILLE_ROND + "px"
            if (rond2.getBoundingClientRect().y < document.getElementById("contenant").getBoundingClientRect().y) {
                this.PERDU = true
            }
        }
    }

    detecterCollision(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        if (rect1.top - rect2.top < this.TAILLE_ROND && rect1.top - rect2.top > 0) {
            if (rect1.right < rect2.right) {
                if (rect1.right + this.TAILLE_ROND / 2 < rect2.right - this.TAILLE_ROND / 2) {
                    return false
                }
            }
            else {
                if (rect1.right - this.TAILLE_ROND / 2 > rect2.right + this.TAILLE_ROND / 2) {
                    return false
                }
            }
            return true
        }

        /*return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom);*/
    }

    descendreMax(rond) {
        rond.style.top = this.BOTTOM_CONTENANT + "px"
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}