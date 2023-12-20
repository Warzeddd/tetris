class Piece {
  constructor(pieceType, id) {
    this.pieceType = pieceType;
    this.id = id;
  }

  static getStructure(pieceType) {
    switch (pieceType) {
      case 0:
        return [
          [0, 1, 1, 1],
          [0, 0, 0, 0],
        ];
      case 1:
        return [
          [0, 1, 1, 0],
          [0, 1, 1, 0],
        ];
      case 2:
        return [
          [1, 1, 1, 0],
          [0, 0, 1, 0],
        ];
      case 3:
        return [
          [1, 1, 1, 0],
          [1, 0, 0, 0],
        ];
      case 4:
        return [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
        ];
      case 5:
        return [
          [0, 1, 1, 0],
          [1, 1, 0, 0],
        ];
      case 6:
        return [
          [1, 1, 0, 0],
          [1, 0, 0, 0],
        ];
      default:
        return [];
    }
  }
}

var plateau = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

var index = 1;
var nomove = [];
var score = 0;
var dernier_block;
var droite = true;
var gauche = true;


function createTable() { // creation de l'affichage
  let table = document.getElementById("tetris_table");

  let tbody = document.createElement("tbody");

  const rows = Array(10).fill('');
  const data = Array(20).fill(rows);

  for (let ligne = 0; ligne < data.length; ligne++) {
    let row = document.createElement("tr");
    row.id = 'row_' + ligne;// Assign a unique ID to each row

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let j = 0; j <= 10; j++) {
      let cell = document.createElement("td");
      cell.id = alphabet[ligne] + j.toString();
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  let tetrisGrid = document.querySelector(".tetris-grid");
  tetrisGrid.appendChild(table);
}

function Affichage() {
  const column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
  const color = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow',
    5: 'purple',
    6: 'orange',
    7: 'pink',
    8: 'brown',
    9: 'cyan',
    10: 'teal',
    11: 'lime',
    12: 'maroon',
    13: 'navy',
    14: 'olive',
    15: 'indigo',
    16: 'magenta',
    17: 'turquoise',
    18: 'violet',
    19: 'gold',
    20: 'silver',
    21: 'crimson',
    22: 'salmon',
    23: 'darkgreen',
    24: 'skyblue',
    25: 'lavender',
    26: 'coral',
    27: 'slategray',
    28: 'darkorchid',
    29: 'firebrick',
    30: 'darkcyan',
  };

  for (let ligne = 0; ligne < column.length; ligne++) {
    for (let colonne = 0; colonne <= 10; colonne++) {
      const element = document.getElementById(`${column[ligne]}${colonne}`);
      if (element) {
        element.style.backgroundColor = (plateau[ligne][colonne] > 0) ? color[plateau[ligne][colonne]] : 'white'; // affichage case couleur pour un block sinon blanc
      }
    }
  }
}


function Spawn() {
  // Générer une nouvelle pièce Tetris aléatoire
  const tetrisPieces = new Piece(Math.floor(Math.random() * 6), index++);
  // Définir les colonnes à vérifier
  const columnsToCheck = [4, 5, 6, 7];

  // Définir les indices de ligne pour les deux lignes à vérifier
  const rowIndex = 0;
  const nextRowIndex = 1;

  // Vérifier si les emplacements sont vides pour la pièce actuelle et la pièce suivante
  if (
    columnsToCheck.every(column => plateau[rowIndex][column] === 0) &&
    columnsToCheck.every(column => plateau[nextRowIndex][column] === 0)
  ) {
    // Mettre à jour la première ligne du plateau
    for (let ligne = 0; ligne < columnsToCheck.length; ligne++) {
      if (plateau[rowIndex][columnsToCheck[ligne]] < Piece.getStructure(tetrisPieces.pieceType)[rowIndex][ligne]) {
        plateau[rowIndex][columnsToCheck[ligne]] = tetrisPieces.id;
      }
    }

    // Mettre à jour la deuxième ligne du plateau
    for (let ligne = 0; ligne < columnsToCheck.length; ligne++) {
      if (plateau[nextRowIndex][columnsToCheck[ligne]] < Piece.getStructure(tetrisPieces.pieceType)[nextRowIndex][ligne]) {
        plateau[nextRowIndex][columnsToCheck[ligne]] = tetrisPieces.id;
        dernier_block = tetrisPieces.id;
      }
    }
  }

  // Mettre à jour l'affichage
  Affichage();

}

function Run() {

  for (let ligne = 19; ligne > 0; ligne--) {

    for (let colonne = 9; colonne > -1; colonne--) {


      if (plateau[ligne - 1][colonne] > 0 && plateau[ligne][colonne] === 0) {

        verif()

        let block_stop_verif = nomove.find(element => element === plateau[ligne - 1][colonne]); // block deja bloqué

        if (!block_stop_verif) {

          plateau[ligne][colonne] = plateau[ligne - 1][colonne]; // on descend la ligne du dessus en dessous
          plateau[ligne - 1][colonne] = 0;
        }
      }
    }
  }
  Affichage()
}

function verif() {

  for (let ligne = 19; ligne > 0; ligne--) {

    if (toutesLesValeursPositives(plateau[ligne])) {
      score + 20 // ajoute 20 points
      plateau.splice(ligne, 1); // supprime la ligne complete
      document.getElementById("point").textContent = `Points : ${score}`; // affiche le nouveau score
      var nouvelleLigne = plateau[0].slice(); // Crée une copie de la première ligne
      plateau.push(nouvelleLigne);
    }
    if (toutesLesValeursPositives(plateau[0])) {
      document.getElementById("statut").textContent = `Points : ${lose}` // affichage du statut
    }


    for (let colonne = 10; colonne > -1; colonne--) {

      if (plateau[ligne][colonne] > 0) {

        let verif_plateau = plateau[ligne].find(element => element === plateau[ligne - 1][colonne]); // verifie si la ligne du dessous contient le meme chiffre que la ligne au dessus

        if (verif_plateau > 0 || verif_plateau === undefined) { // si oui on va juste verifier si ce n'est pas le block normal sinon on le bloque

          let verif_block = plateau[ligne].indexOf(verif_plateau);
          let test = false;

          if (ligne === 19) { test = true } else // si le block est tout en bas on stop
            if (plateau[ligne + 1][verif_block] > 0) { test = true }  // si le block touche on stop

          if (test) {
            let verif_non_existant = nomove.find(element => element === verif_plateau); // recherche si l'element n'existe pas deja

            if (verif_non_existant !== verif_plateau) {
              nomove.push(verif_plateau);
              console.log(nomove)
            }
          }
        }
      }
    }
  }
}


function toutesLesValeursPositives(tableau) {
  return tableau.every(function (valeur) {
    return valeur > 0;
  });
}

function deplacerVersLaDroite() {
  for (var ligne = 0; ligne < plateau.length; ligne++) {
    for (var colonne = plateau[ligne].length; colonne >= 0; colonne--) {
      if (plateau[ligne][colonne] === dernier_block) {

        if (colonne < 10 && droite) {

          let verif_deplacement = plateau[ligne].find(element => element === 0);
          let verif_block = plateau[ligne].find(element => element > 0);

          let emplacement_libre = plateau[ligne].indexOf(verif_deplacement);
          let emplacement_block = plateau[ligne].indexOf(verif_block);

          let distance = emplacement_block - emplacement_libre;
      
          // Déplacer du dernier block vers la droite
          if (colonne < plateau[ligne].length && distance < 10) {

            plateau[ligne][colonne + 1] = dernier_block;
            plateau[ligne][colonne] = 0;
            gauche=true;
          }else{
            droite=false;
          }
        }
      }
    }
  }
}

function deplacerVersLaGauche() {
  for (var ligne = 0; ligne < plateau.length; ligne++) {
    for (var colonne = 0; colonne < plateau[ligne].length; colonne++) {
      if (plateau[ligne][colonne] === dernier_block) {
        // Vérifier que la colonne n'est pas déjà la première colonne
        if (colonne > 0 && gauche) {
          // Vérifier que la colonne de destination est à l'intérieur des limites du tableau

          let verif_deplacement = plateau[ligne].find(element => element === 0);
          let verif_block = plateau[ligne].find(element => element > 0);

          let emplacement_libre = plateau[ligne].indexOf(verif_deplacement);
          let emplacement_block = plateau[ligne].indexOf(verif_block);

          let distance = emplacement_block - emplacement_libre;
          
          if (colonne - 1 >= 0 && distance > 0) {
            // Déplacer la valeur 1 vers la gauche
            plateau[ligne][colonne - 1] = dernier_block;
            plateau[ligne][colonne] = 0;
            droite = true;
          }
          else{
            gauche = false;
          }
        }
      }
    }
  }
}




// Gestionnaire d'événements pour détecter des touches
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    deplacerVersLaDroite();
    Affichage();
  }
  if (event.key === 'ArrowLeft') {
    deplacerVersLaGauche();
    Affichage();
  }
});

createTable();

Spawn()
setInterval(Spawn, 12000)
setInterval(Run, 500);