const musesContainer = document.querySelector('#muses-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/muses`

const musesCallback = ({ data: muses }) => displayMuses(muses)
const errCallback = err => console.log(err)

const editForm = document.getElementById('editForm')
const editIndex = document.getElementById('editIndex')
const editInput = document.getElementById('editInput')
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('randomFortuneButton')
const getMusesBtn = document.getElementById('getMuses')
const musesCase = document.getElementById("displayMuses")
//set up functions
const createMuse = body => axios.post(baseURL, body).then(musesCallback).catch(errCallback)
const deleteMuse = id => axios.delete(`${baseURL}/${id}`).then(musesCallback).catch(errCallback)
// const updateMuse = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(musesCallback).catch(errCallback)
const getMuses = () => axios.get(baseURL).then(musesCallback).catch(errCallback)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getRandomFortune = () => {
    axios.get("http://localhost:4000/api/fortunes/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
}


function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let quote = document.querySelector('#quote')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        quote: [quote.value], 
        imageURL: imageURL.value
    }

    createMuse(bodyObj)

    name.value = ''
    quote.value = ''
    imageURL.value = ''
    }

function createMuseCard(muses) {
    const museCard = document.createElement('div')
    museCard.classList.add('muse-card')

    museCard.innerHTML = `<img alt='muse cover image' src = ${muses.imageURL} class="muse-cover-image"/>
    <p class="name">${muses.name}</p>
    <div class="btns-container">
    <p class="muse-quote">${muses.quote[0]}</p>
    <button onclick="updateMuse(${muses.id}, 'plus')">More please</button>
</div>
    <button onclick="deleteMuse(${muses.id})">delete</button>
    `


    musesContainer.appendChild(museCard)
}

function displayMuses(arr) {
    musesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMuseCard(arr[i])
    }
}
const editItem = (e) => {
    e.preventDefault()
    let imageURL = document.querySelector('#img')
    let newObj = {
        imageURL: editInput.value
    }
    createMuse(newObj)

    editInput.value = ''
    }


// axios.put(`${baseURL}/${editIndex.value}`, newObj)
//         .then((res) => {
//             const museCard = document.createElement('div')
//             museCard.classList.add('muse-card')
        
//             museCard.innerHTML = `<img alt='muse cover image' src = ${muses.imageURL} class="muse-cover-image"/>
//             <p class="name">${muses.name}</p>
           
//             <p class="muse-quote">${muses.quote[0]}</p>
//             `
        
        
//             musesContainer.appendChild(museCard)

//             editIndex.value = ''
//             editInput.value = ''
//         })


// const editItem = (e) => {
//     e.preventDefault()

//     let bodyObj = {
//         name: name.value,
//         quote: [quote.value], 
//         imageURL: imageURL.value
//     }
//     axios.put(`${baseURL}/${[quote.value]}`, bodyObj)
//         .then((res)=>)
// }





//combine steps 1 and 2 using Event listener
form.addEventListener('submit', submitHandler)
getMusesBtn.addEventListener('click', getMuses)
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener("click", getRandomFortune)
editForm.addEventListener('submit', editItem)