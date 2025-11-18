let imgListe = [];
let gomme = 0;
let imgMasque = [];
let newFeuille;
let indiceMasque = 0;
let pinceau1
let pinceau2
let size = 50;
let couleursMasque
let paletteCourante = "froid";
let couleursFroides, couleursChaudes;

function preload() {
  for (let i = 1; i <= 12; i++) {
    imgListe[i - 1] = loadImage('W/BW (' + i + ').png');
  }
  for (let i = 1; i <= 9; i++) {
    imgMasque[i - 1] = loadImage('masque/M(' + i + ').png');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  pinceau1 = random(imgListe);
  pinceau2 = random(imgListe);

  couleursFroides = [
    color(32, 153, 168), //cyan foncé
    color(19, 80, 156), //bleu foncé
    color(29, 144, 224), //bleu azr
    color(89, 15, 184) // violet foncé
  ];

  couleursChaudes = [
    color(196, 20, 12), // rouge 
    color(219, 105, 29), //orange foncé
    color(232, 188, 39), //jaune
    color(240, 177, 156) //rose saumon
  ];

  for (let i = 0; i < imgListe.length; i++) {
    imgListe[i].resize(100, 50);
  }

  for (let i = 0; i < imgMasque.length; i++) {
    imgMasque[i].resize(width, 0);
  }

  pinceau = random(imgListe);

  newFeuille = createGraphics(windowWidth, windowHeight);
  newFeuille.clear();
  newFeuille.imageMode(CENTER);

  couleursMasque =
  paletteCourante === "froid" ? random(couleursFroides) : random(couleursChaudes); //formulation correcte aussi
}

function draw() {

   // affiche la feuille centrée 
 imageMode(CENTER);
image(newFeuille, width / 2, height / 2);


if (frameCount % 30 === 0) { // 60% = 1 image par seconde
  couleursMasque =
    paletteCourante === "froid" ? random(couleursFroides) : random(couleursChaudes);
}


    push(); //colorer les masques
  tint(red(couleursMasque), green(couleursMasque), blue(couleursMasque), 200);
  image(imgMasque[indiceMasque], width / 2, height / 2);
  pop();


  // couleur du pinceau
  let couleurActuelle =
    paletteCourante === "froid" ? random(couleursFroides) : random(couleursChaudes);
  let opacité = map(mouseY, 0, height, 255, 50);

  // Mouvement automatique
  let x1 = noise(800 + frameCount * 0.6) * width;
  let y1 = noise(1000 + frameCount * 1.5) * height;
  let x2 = noise(500 + frameCount * 0.6) * width;
  let y2 = noise(1500 + frameCount * 1.5) * height;

  newFeuille.push();
  if (gomme === 1) {
    newFeuille.blendMode(REMOVE);
    newFeuille.image(pinceau1, x1, y1, size, size);
    newFeuille.image(pinceau2, x2, y2, size, size);
  } else {
    newFeuille.push();
    newFeuille.tint(0, 80); // gris noir pour ombre
    newFeuille.image(pinceau1, x1 + 5, y1 + 5, size, size);
    newFeuille.image(pinceau2, x2 + 5, y2 + 5, size, size);
    newFeuille.pop();


    newFeuille.push()
    newFeuille.blendMode(BLEND);
    newFeuille.tint(
      red(couleurActuelle),
      green(couleurActuelle),
      blue(couleurActuelle),
      opacité -50
    );

   newFeuille.image(pinceau1, x1, y1, size, size); //décidrr si random ou non !!
  newFeuille.image(pinceau2, x2, y2, size, size);
  newFeuille.pop();
  }

  newFeuille.pop();
}


function mouseDragged() {
  if (pinceau) {
    newFeuille.image(pinceau, mouseX, mouseY, size, size);
  }
}

function keyPressed() {


    print(key)

    if (key == "ArrowLeft") {
    paletteCourante = "froid";
    print("CouleursFroides activées")
}else if (key =="ArrowRight") {
    paletteCourante = "chaud";
    print("CouleursChaudes activées")
}

    if(key == "ArrowUp"){//flèche du haut
		  size++;
    }
    
      if(key == "ArrowDown"){
	     size--;
    }

  if (key == "Backspace") gomme = 1 - gomme;

  // Changer le masque avec les touches numériques
  if (key >= '1' && key <= '9') {
    let numero = int(key);         // convertit le caractère en nombre index numérique
    if (numero <= imgMasque.length) { // vérifie si numéro est égal aux masques dispos
      indiceMasque = numero - 1;   
      print("Masque Switch")
  }
}
}