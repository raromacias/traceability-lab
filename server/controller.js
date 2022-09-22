let muses = require(`./db.json`);
let globalID = 4;



module.exports = {

    getMuses: (req, res) => {
        // console.log(res.data)
       res.status(200).send(muses)
    },
    createMuse: (req, res) => {
        let {name, quote, imageURL} = req.body;
        console.log(name)
        let newMuse = {
            name,
            quote,
            imageURL,
            id: globalID
        }
        muses.push(newMuse)
        globalID++;
        res.status(200).send(muses)
    },

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getRandomFortune: (req, res) => {
        const fortunes = ["A faithful friend is a strong defense.", "Be careful what you wish for.", "Expect much of yourself and little of others.", "Follow the middle path. Neither extreme will make you happy.", "Go take a rest; you deserve it."]

        //choose random fortune
        let randomNum = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomNum];

        res.status(200).send(randomFortune);
    },

    deleteMuse: (req, res) => {
        let index = muses.findIndex(elem => elem.id === +req.params.id)
        muses.splice(index, 1)
        res.status(200).send(muses)
    },
    updateMuse: (req, res) => {
        const {type} = req.body;
       let index = muses.findIndex(elem => elem.id === +req.params.id)
       if(type === `plus`){
       let newQuote = "Hakuna Matata"
       muses[index].push(newQuote)
        res.status(200).send(muses)
        }
    },
        deleteHouse: (req, res) => {
            let index = houses.findIndex(elem => elem.id === +req.params.id)
            houses.splice(index, 1)
            res.status(200).send(houses)
    
    },
    editMuse: (req, res) => {
        let index = req.params.id
        let {item} = req.body

        muses.splice(index, 1, item)
        res.status(200).send(muses)
    }
 }