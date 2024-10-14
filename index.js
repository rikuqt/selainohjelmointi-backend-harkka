const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

let tyot = [
  { id: '1',
    nimi: 'Selainohjelmointi harjoitustyö',
    tyonkuvaus: 'Pohjat valmiina, deleten lisäys, render servuun backend',
    paivanmaara: '2024-10-15'
  },
  { id: '2',
    nimi: 'käyttöliittymät harjoitustyö',
    tyonkuvaus: 'hienosäätö',
    paivanmaara: '2024-10-25'
  }
]


app.get('/api/tyot', (request, response) => {
  response.json(tyot)
})

app.delete('/api/tyot/:id', (request, response) => {
    const id = request.params.id
    tyot = tyot.filter(tyo => tyo.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/tyot', (request, response) => {
    const maxId = tyot.length > 0
      ? Math.max(...tyot.map(n => Number(n.id))) 
      : 0
  
    const tyo = request.body
    tyo.id = String(maxId + 1)
  
    tyot = tyot.concat(tyo)
  
    response.json(tyo)
  })

app.get('/api/tyot/:id', (request, response) => {
    const id = request.params.id
    const tyo = tyot.find(tyo => tyo.id === id)
    
  
    if (tyo) {
      response.json(tyo)
    } else {
      response.status(404).end()
    }
  })

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })