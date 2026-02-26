import {readFileSync, existsSync} from "fs";
import {join} from "path";
import {homedir} from "os";
import { clear, log } from "console";
import { config } from "process";

const track = JSON.parse(readFileSync("./track.json"));
const root = track.root.replace("~", homedir());



 //Vérifier que le dossier ada existe dans le dossier home (~)

const chemin = join( "root", "ada");

console.log("dossier ada :", chemin);

if (!existsSync(chemin)) {
    console.log("✅"," dossier ada.");   
}else{
    console.log("❌"," dossier ada.");
    
}
//  Vérifier que les dossiers des projets existent au bon endroit et sont correctement nommés
// vérifier que chaque projet contient bien les fichiers requis au bon endroit (le tableau required dans track.json)
let ok = 0;
let ko = 0;


for (const {name, required} of track.projects) {
    
    if (!existsSync(join(root, name))) { 
        
        console.log( "❌", "dossier du project", name);
        console.log(`-le dossier n'existe pas ou n'est pas nommé correctement`); 
        ko++;

    }else if (!required.includes( 'index.js' )) {
        console.log( "❌", "dossier du project", name);
        console.log("Le fichier existe pas !");
        ko++;

    }else{

        console.log( "✅", "dossier du project", name);                          
        console.log(join(root, name), required); 
        ok++;

    }                        
}

// Le pourcentage de projets correctement initialisés

const total = ok + ko;
const pctOk = (ok / total) * 100;
const pctKo = (ko / total) * 100;

const fracOk = (ok / total) * 10;
const fracKo = (ko / total) * 10

console.log("------ Résumé ------");
console.log(`✅ ${pctOk}% des projets sont initialisés correctement (${fracOk}/10)`);
console.log(`❌ ${pctKo}% des projets qui sont pas initialisés correctement (${fracKo}/10)`);


