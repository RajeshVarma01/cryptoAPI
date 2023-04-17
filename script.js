const container = document.querySelector('.container')
const filteredContainer = document.querySelector('.filtered-container')
let apiData
let userInputVal = " ";
function fetchData(){
fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
.then(res=>res.json())
.then(data=>{
    // console.log(data)
    apiData = data
    createCard(data,container)
})
}

fetchData()

function createCard(data,location){
    data.map((crypto)=>{
        const div = document.createElement('div')
        div.classList.add('card')
        div.style.width = '18rem'
        div.innerHTML =
  `<img height=200 src="${crypto.image}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${crypto.name}</h5>
    <p class="card-text">current price:${crypto.current_price}</p>
    <p class="card-red">price-decrease_24hrs:${crypto.low_24h}</p>
    <p class="card-green">price-increase_24hrs:${crypto.high_24h}</p>
    <p class="card-blue">total supply:${crypto.total_supply}</p>
  </div>`
  location.appendChild(div)
    })
}

function userData(e){
  userInputVal = e.value
  if(userInputVal.length>0){
    let filteredData = apiData.filter(val=>{
      return val.name.toLowerCase().includes(userInputVal.toLowerCase())
    })

    container.classList.add('hide')
    filteredContainer.classList.remove('hide')
    if(filteredContainer.hasChildNodes()){
      while(filteredContainer.hasChildNodes()){
        filteredContainer.removeChild(filteredContainer.firstChild);
      }
    }

    createCard(filteredData,filteredContainer)
  }else{
    container.classList.remove('hide')
    filteredContainer.classList.add('hide')
    if(container.hasChildNodes()){
      while(container.hasChildNodes()){
        container.removeChild(container.firstChild)
      }
    }
    createCard(apiData,container)
  }
} 

