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

// function Spawn() {
//   const tetrisPieces = new Piece(Math.floor(Math.random() * 6));
//   const columnsToCheck = [4, 5, 6, 7];
//   let rowIndex = 0
//   let row = 0

//   if ((columnsToCheck.every(column => plateau[row][column] === 0)) && (columnsToCheck.every(column => plateau[row + 1][column] === 0))) {
//     for (let ligne = 0; ligne < columnsToCheck.length; ligne++) {
//       plateau[row][columnsToCheck[ligne]] = Piece.getStructure(tetrisPieces.pieceType)[rowIndex][ligne];
//     }
//     for (let ligne = 0; ligne < columnsToCheck.length; ligne++) {
//       plateau[row + 1][columnsToCheck[ligne]] = Piece.getStructure(tetrisPieces.pieceType)[rowIndex + 1][ligne];
//     }
//   }
//   console.log('0')
//   Affichage()
// }


function Run() {

  for (let ligne = 19; ligne > 0; ligne--) {
    let block = 0

    for (let colonne = 9; colonne > -1; colonne--) {
      // if( plateau)
      let verif_plateau = plateau[ligne].find(element => element === plateau[ligne][colonne]);
      let position_verif = plateau[ligne].indexOf(verif_plateau)
      let verif_block_fond = 0;

      if (verif_plateau > 0) {
        if ((ligne+1)=== undefined || (ligne+1)=== 20) {
          // si il est en bas, il ne peut pas verifier la ligne du dessous donc 1 pour "utiliser"
          verif_block_fond = plateau[ligne-1][colonne]
        } else {
          // il verifie si la ligne du dessous bloque le deplacement
          verif_block_fond = plateau[ligne + 1][position_verif]
        }

        if (verif_block_fond > 0) {

          // console.log(verif_plateau)
          // console.log(plateau[ligne+1][position_verif])

          let verif = nomove.find(element => element === verif_plateau);

          if (verif !== verif_plateau && ligne !== 19) {
            // if (
            //   verif === plateau[ligne + 1][colonne + 1] ||
            //   verif === plateau[ligne + 1][colonne] ||
            //   plateau[ligne + 1][colonne] > 0 ||
            //   verif === plateau[ligne + 1][colonne - 1]
            // ) {
            nomove.push(verif_plateau);
            // console.log(nomove)
            // }
          }

          if (plateau[ligne][colonne] == 1) {
            block++
          }

          if (block == 10) {
            console.log('win')
            for (let colonne = 9; colonne > 0; colonne--) {
              plateau[ligne][colonne] = 0
            }
          }
        }
      }
      else {

        if (ligne > 0 && plateau[ligne - 1][colonne] > 0) {
          // if (plateau[ligne - 1][colonne] !== plateau[ligne][colonne - 1] && plateau[ligne - 1][colonne] !== plateau[ligne][colonne + 1]) {

          let block_stop_verif = nomove.find(element => element === plateau[ligne - 1][colonne]);
          let ligne_verif = plateau[ligne].find(element => element === plateau[ligne-1][colonne]);

          // console.log(ligne_verif)

          // console.log(block_stop_verif)
          //         console.log(plateau[ligne-1][colonne])
          //         console.log(nomove)
          // if(verif !== undefined){
          //           if (verif !== plateau[ligne][colonne - 1] &&
          //             verif !== plateau[ligne][colonne] &&
          //             verif !== plateau[ligne][colonne - 1]) {
          //             plateau[ligne][colonne] = plateau[ligne - 1][colonne];
          //             plateau[ligne - 1][colonne] = 0;
          //           }
          //         }else{
          if (block_stop_verif !== ligne_verif || ligne_verif === undefined) {

            // if (verif !== plateau[ligne-1][colonne] && verif !== plateau[ligne-1][colonne-1] && verif !== plateau[ligne-1][colonne+1] ){
            plateau[ligne][colonne] = plateau[ligne - 1][colonne];
            plateau[ligne - 1][colonne] = 0;
          }
          // }
        }
      }
    }
  }
  Affichage()
}

createTable();

Spawn()
setInterval(Spawn, 12000)
setInterval(Run, 500);