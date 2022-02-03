
const apiKey = 'JsI1yA27h0ZDGGA6FyaIEFpAB9v3fJWc'

let filtered;
;(async function(){
    const rawData = await fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`)
    const data = await rawData.json()

    filtered = data.results.filter((data) => data.section !== 'admin')
    const uniqueSections = filtered.filter((v,i,a)=>a.findIndex(t=>(t.section === v.section))===i)
    createButtons(uniqueSections)
    console.log(uniqueSections)
    createCard(filtered)
})()

const createButtons = (sections) =>{

    const btnGroup = document.getElementById('btn-group')

    sections.forEach(item => {
        const btn = document.createElement('button')
        const badge = document.createElement('span')

        // const counts = {};
        // filtered.forEach((x) => { 
        //     counts[x.section] = (counts[x.section] || 0) + 1; 
        // });
        // const keys = Object.keys(counts);
        // console.log(filtered);
        // keys.forEach((key, index) => {
        //     console.log(`${key}: ${filtered[key]}`);
        // });

        btn.innerHTML = item.section
        btn.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center'

        btn.addEventListener('click', handleclick)
        btnGroup.appendChild(btn)
    })
    

}
const createCard = (data) =>{
    const wrapper = document.getElementById('wrapper')
    const container = document.createElement('div')
    container.className = 'container mt-3 d-flex flex-wrap gap-2'
    container.id = 'card-container'


    data.forEach(data =>{

        const card = document.createElement('div')
        card.className = 'card'
        card.style.width = '18rem'

    
        const img = document.createElement('img')
        img.src = data.multimedia[0].url
        img.className = 'card-img-top'
    
        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'
    
        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerText = data.title
       
        const cardText = document.createElement('p')
        cardText.className = 'card-text'
        cardText.innerText = data.abstract

        const cardlink = document.createElement('a')
        cardlink.className = 'btn btn-primary'
        cardlink.innerText = 'Link'
        cardlink.href = data.url

        card.appendChild(img)
        card.appendChild(cardBody)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        cardBody.appendChild(cardlink)
        container.appendChild(card)
        wrapper.appendChild(container)
    })
   

    
}

const handleclick = (e) =>{
    const cardContainer = document.getElementById('card-container')

    if(cardContainer.children){
        cardContainer.remove()
    }
    const filter = filtered.filter(data => data.section === e.target.innerText)
    createCard(filter)

}