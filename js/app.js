
function textChangeListener(evt) {
    'use strict';
  let id = evt.target.id;
  let text = evt.target.value;

  if (id === "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
    if (image !== null)
    {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        ctx.save()


        ctx.font = "36px Impact";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";

        if (topLine !== null)
        {
            ctx.fillText(topLine, canvas.width/2, 40);
            ctx.strokeText(topLine, canvas.width/2, 40);
        }

        if (bottomLine !== null)
        {
            ctx.fillText(bottomLine, canvas.width/2, canvas.height - 20);
            ctx.strokeText(bottomLine, canvas.width/2, canvas.height - 20);
        }
    }
}


function download(){
    ctx.restore();
    ctx.font = "1em verdana";
    ctx.fillText("@omoleoo", canvas.width / 10, canvas.height - 5);
    ctx.strokeText("@omoleoo", canvas.width / 10, canvas.height - 5);
    ctx.fill();
    ctx.stroke();


    let download = document.getElementById("saveBtn");
    let image = document.getElementById("canvas").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    download.setAttribute("download", "meme.jpg");
}


function handleFileSelect(evt) {
    'use strict';
  let file = evt.target.files[0];

  let reader = new FileReader();
  reader.onload = function(fileObject) {
    let data = fileObject.target.result;

    // Create an image object
    let image = new Image();
    image.onload = function() {
        if (image.width.toString().length > 3)
        {
            let aspectRatio = image.width / image.height;
            ctx.canvas.width = (image.width / 3) * aspectRatio;
            ctx.canvas.height = (image.height / 3) * aspectRatio;
        }

      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    }

    // Set image data to background image.
    image.src = data;
    //console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";
let input1 = document.getElementById('topLineText');
let input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.querySelector('a').addEventListener('click', download, false);
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.strokeStyle = "#000";
ctx.save()

