import express from 'express';
import games from './SteamGames.json' assert {type: 'json'};
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();


const hostname = '127.0.0.1'; // L'@ du serveur 
const port = process.env.PORT || 9090; // Le port du serveur 

app.get('/game',(req, res) => {
    fs.readFile('./SteamGames.json',(err,data)=>{
        let gamess = JSON.parse(data);
        res.status(200).json(gamess);
    })
    // return res.json(games);

})

app.get("/game/select/:year", (req,res)=>{
    let year = req.params.year;
    
    fs.readFile("./SteamGammes.json",(err,data)=>{
        if(!err){
            let filtredGames = JSON.parse(data).filter((e)=> e.Year > year);
            res.status(200).json(filtredGames);
        }
        else
            res.status(404).json({error: err})
    })

    // let filtredGames = games.filter((e)=> e.Year > year);
    // res.status(200).json(filtredGames);
})

app.get("/game/:name", (req,res)=>{
    res.status(200).json({url: games.find((e)=>
        e.Game === req.params.name
    ).GameLink})
})

/* Demarrer le serveur a l'ecoute des connexions */
app.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`); 
}); 


