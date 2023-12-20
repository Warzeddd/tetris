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

var index = 1
var nomove = []
var score = 0

function createTable() {
  let table = document.getElementById("tetris_table");

  let tbody = document.createElement("tbody");

  const rows = Array(10).fill('');
  const data = Array(20).fill(rows);

  for (let ligne = 0; ligne < data.length; ligne++) {
    let row = document.createElement("tr");
    row.id = 'row_' + ligne; // Assign a unique ID to each row

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let j = 0; j <= 10; j++) {
      let cell = document.createElement("td");
      cell.id = alphabet[ligne] + j.toString();
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Get the tetris-grid div and append the table to it
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
    for (let colonne = 0; colonne < 11; colonne++) {
      const element = document.getElementById(`${column[ligne]}${colonne}`);
      if (element) {
        element.style.backgroundColor = (plateau[ligne][colonne] > 0) ? color[plateau[ligne][colonne]] : 'white';
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
      }
    }
  }

  // Mettre à jour l'affichage
  Affichage();

}

function Run() {

  for (let ligne = 19; ligne > 0; ligne--) {
    let block = 0

    for (let colonne = 9; colonne > -1; colonne--) {


      if (plateau[ligne - 1][colonne] > 0 &&plateau[ligne][colonne] === 0) {

        // verif()

        let block_stop_verif = nomove.find(element => element === plateau[ligne - 1][colonne]); // block deja bloqué
        let ligne_verif = plateau[ligne].find(element => element === block_stop_verif); // verfie

        if (ligne_verif === undefined) {

          plateau[ligne][colonne] = plateau[ligne - 1][colonne];
          plateau[ligne - 1][colonne] = 0;
        }
      }
    }
  }
  Affichage()
}

function verif() {

  for (let ligne = 19; ligne > 0; ligne--) {

    for (let colonne = 9; colonne > -1; colonne--) {

      let verif_premiere_ligne = plateau[ligne].find(element => element === plateau[ligne-1][colonne]);
      let verif_deuxieme_ligne = plateau[ligne].find(element => element === plateau[ligne - 1][colonne]);
      

      if(ligne === 19)

      if (verif_plateau > 0 || verif_plateau !== undefined) {

        let verif_non_existant = nomove.find(element => element === verif_plateau);

        if (verif_non_existant !== verif_plateau) {
          nomove.push(verif_plateau);
          console.log(nomove)
        }

        if (plateau[ligne][colonne] > 1) {
          if (toutesLesValeursPositives(plateau[ligne])) {
           score +20
            document.getElementById("point").textContent = `Points : ${score}`;
          }
          if (toutesLesValeursPositives(plateau[0])) {
            document.getElementById("statut").textContent = `Points : ${lose}`
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


createTable();

Spawn()
setInterval(Spawn, 12000)
setInterval(Run, 500);