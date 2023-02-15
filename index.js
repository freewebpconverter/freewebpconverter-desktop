const fs = require("fs");
const webp = require('webp-converter');

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("upload-file");
const list = document.getElementById("list");
const noListText = document.getElementById("no-list-text");

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);

  if (files.length > 0) {
    creteList(files);
    convertList(files);
  }
});

dropzone.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

dropzone.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const files = Array.from(e.dataTransfer.files);

  if (files.length > 0) {
    creteList(files);
    convertList(files);
  }
});

const clearList = () => {
  const liCollection = Array.from(document.getElementsByTagName("li"));

  liCollection.map(item => item.remove());
}

const creteList = data => {
  clearList();

  noListText.classList.add("d-none");
  list.classList.remove("d-none");

  data.map(itemData => {
    var item = listItem(itemData.name);
    list.appendChild(item);
  });
}

const listItem = fileName => {
  var li = document.createElement("li");
  li.innerHTML = `
    <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewbox="0 0 15 20">
        <path
          d="M8.75,5V0H1.875A1.875,1.875,0,0,0,0,1.875v16.25A1.875,1.875,0,0,0,1.875,20h11.25A1.875,1.875,0,0,0,15,18.125V6.25H10.035A1.257,1.257,0,0,1,8.75,5Zm-5,3.75A1.25,1.25,0,1,1,2.5,10,1.25,1.25,0,0,1,3.75,8.75Zm8.676,8.418a.62.62,0,0,1-.551.332H3.125a.625.625,0,0,1-.52-.972L4.688,13.4a.546.546,0,0,1,.519-.278.583.583,0,0,1,.52.278l.523.784L8.021,11.53a.625.625,0,0,1,1.041,0l3.333,5A.621.621,0,0,1,12.426,17.168ZM10,0V5h5Z"
          fill="#7994de" />
      </svg>
      ${fileName}
    </p>
    <div class="status loading">
      <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" width="14.001" height="10"
        viewbox="0 0 14.001 10">
        <path
          d="M13.708,96.3a1,1,0,0,1,0,1.413l-8,8a1,1,0,0,1-1.413,0l-4-4A1,1,0,0,1,1.707,100.3l3.265,3.291L12.3,96.3a1,1,0,0,1,1.413,0Z"
          transform="translate(0 -96.01)" fill="#fff" />
      </svg>
      <svg class="loading-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewbox="0 0 14 14">
        <path
          d="M8.313,1.313A1.313,1.313,0,1,1,7,0,1.313,1.313,0,0,1,8.313,1.313Zm0,11.375A1.313,1.313,0,1,1,7,11.375,1.313,1.313,0,0,1,8.313,12.688ZM0,7A1.313,1.313,0,1,1,1.313,8.313,1.313,1.313,0,0,1,0,7ZM14,7a1.313,1.313,0,1,1-1.312-1.312A1.313,1.313,0,0,1,14,7ZM2.05,11.949a1.313,1.313,0,1,1,1.857,0,1.313,1.313,0,0,1-1.857,0ZM3.907,3.907a1.313,1.313,0,1,1,0-1.857A1.316,1.316,0,0,1,3.907,3.907Zm6.185,6.185a1.313,1.313,0,1,1,0,1.857,1.315,1.315,0,0,1,0-1.857Z"
          fill="#fff" />
      </svg>
      <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewbox="0 0 14 14">
        <path
          d="M13.588,107.586a1.4,1.4,0,1,1-1.978,1.978L7,104.957l-4.61,4.607a1.4,1.4,0,1,1-1.98-1.98l4.611-4.611L.41,98.365a1.4,1.4,0,0,1,1.98-1.98L7,101l4.611-4.611a1.4,1.4,0,0,1,1.98,1.98l-4.611,4.611Z"
          transform="translate(0 -95.975)" fill="#fff" />
      </svg>
    </div>
  `;

  return li;
}

const convertList = data => {
  data.map(item => {
    const data = fileData(item);
    const result = webp.cwebp(data.importImage, data.exportImage, "-q 80", logging = "-v");

    result.then((response) => {
      convertSuccess();
    });
  });
}

const fileData = (item) => {
  const type = item.type.split('/').pop();
  const name = item.name.replace(`.${type}`, "");
  const basePath = item.path.replace(item.name, "");
  const importPath = item.path;
  const exportPath = `${basePath}${name}.webp`

  return {
    path: basePath,
    type: type,
    name: name,
    importImage: importPath,
    exportImage: exportPath
  }
}

const convertSuccess = () => {
  const statusCollection = Array.from(document.getElementsByClassName("status"));

  statusCollection.map(item => {
    item.classList.remove("loading");
    item.classList.add("success");
  })
}

/*


const imageFile = document.getElementById("image-file");
const info = document.getElementById("info");

imageFile.addEventListener("change", (e) => {
  const files = e.target.files;

  console.log("files: ", files);

  createBuildFolder();

  Array.from(files).map((item) => {
    const data = fileData(item);
    const result = webp.cwebp(data.importImage, data.exportImage, "-q 80", logging = "-v");

    result.then((response) => {
      info.innerText = response;
    });
  });
});

const fileData = (item) => {
  const type = item.type.split('/').pop();
  const name = item.name.replace(`.${type}`, "");
  const importImage = item.path;
  const exportImage = `./build/${name}.webp`;

  return {
    type: type,
    name: name,
    importImage: importImage,
    exportImage: exportImage
  }
}

const createBuildFolder = () => {
  if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }
}
*/