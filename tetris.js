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

  for (let i = 0; i < data.length; i++) {
    let row = document.createElement("tr");
    row.id = 'row_' + i; // Assign a unique ID to each row

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let j = 0; j <= 10; j++) {
      let cell = document.createElement("td");
      cell.id = alphabet[i] + j.toString();
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

  for (let i = 0; i < column.length; i++) {
    for (let y = 0; y < 11; y++) {
      const element = document.getElementById(`${column[i]}${y}`);
      if (element) {
        element.style.backgroundColor = (plateau[i][y] > 0) ? color[plateau[i][y]] : 'white';
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
    for (let i = 0; i < columnsToCheck.length; i++) {
      if (plateau[rowIndex][columnsToCheck[i]] < Piece.getStructure(tetrisPieces.pieceType)[rowIndex][i]) {
        plateau[rowIndex][columnsToCheck[i]] = tetrisPieces.id;
      }
    }

    // Mettre à jour la deuxième ligne du plateau
    for (let i = 0; i < columnsToCheck.length; i++) {
      if (plateau[nextRowIndex][columnsToCheck[i]] < Piece.getStructure(tetrisPieces.pieceType)[nextRowIndex][i]) {
        plateau[nextRowIndex][columnsToCheck[i]] = tetrisPieces.id;
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
//     for (let i = 0; i < columnsToCheck.length; i++) {
//       plateau[row][columnsToCheck[i]] = Piece.getStructure(tetrisPieces.pieceType)[rowIndex][i];
//     }
//     for (let i = 0; i < columnsToCheck.length; i++) {
//       plateau[row + 1][columnsToCheck[i]] = Piece.getStructure(tetrisPieces.pieceType)[rowIndex + 1][i];
//     }
//   }
//   console.log('0')
//   Affichage()
// }


function Run() {

  for (let i = 19; i > 0; i--) {
    let block = 0

    for (let y = 9; y > -1; y--) {
      // if( plateau)
      let verif_plateau = plateau[i].find(element => element === plateau[i][y]);
    
      if (verif_plateau > 0 ) {
console.log(verif_plateau)
        let verif = nomove.find(element => element === verif_plateau);

        if (verif !== verif_plateau && i !== 19) {
          // if (
          //   verif === plateau[i + 1][y + 1] ||
          //   verif === plateau[i + 1][y] ||
          //   plateau[i + 1][y] > 0 ||
          //   verif === plateau[i + 1][y - 1]
          // ) {
          nomove.push(verif_plateau);
          console.log(nomove)
          // }
        }

        if (plateau[i][y] == 1) {
          block++
        }

        if (block == 10) {
          console.log('win')
          for (let y = 9; y > 0; y--) {
            plateau[i][y] = 0
          }
        }
      }
      else {

        if (i > 0 && plateau[i - 1][y] > 0) {
          // if (plateau[i - 1][y] !== plateau[i][y - 1] && plateau[i - 1][y] !== plateau[i][y + 1]) {
            
            let verif = nomove.find(element => element === plateau[i - 1][y]);
            console.log(verif)
            //         console.log(plateau[i-1][y])
            //         console.log(nomove)
            // if(verif !== undefined){
            //           if (verif !== plateau[i][y - 1] &&
            //             verif !== plateau[i][y] &&
            //             verif !== plateau[i][y - 1]) {
            //             plateau[i][y] = plateau[i - 1][y];
            //             plateau[i - 1][y] = 0;
            //           }
            //         }else{
            if (verif !== plateau[i-1][y]){
              plateau[i][y] = plateau[i - 1][y];
            plateau[i - 1][y] = 0;
            }
          // }
        }
      }
    }
  }
  Affichage()
}
var use = true;
var use1 = true;
createTable();

Spawn()
setInterval(Spawn, 12000)
setInterval(Run, 500);