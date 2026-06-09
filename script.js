const folderIcon = "https://cdn-icons-png.flaticon.com/512/716/716784.png";
const archiveIcon = "https://cdn-icons-png.flaticon.com/512/2306/2306185.png";
const audioIcon = "https://cdn-icons-png.flaticon.com/512/3659/3659899.png";
const pdfIcon = "https://cdn-icons-png.flaticon.com/512/337/337946.png";
const apkIcon = "https://cdn-icons-png.flaticon.com/512/888/888857.png";
const fileIcon = "https://cdn-icons-png.flaticon.com/512/833/833524.png";

const library = {
    name: "Downloads",
    type: "folder",
    items: [
        {
            name: "NBA YoungBoy",
            type: "folder",
            items: [
                {
                    name: "The Third Ft. YoungBoy Never Broke Again.mp3",
                    type: "audio",
                    url: "https://example.com"
                }
            ]
        },
        {
            name: "Chief Keef",
            type: "folder",
            items: []
        },
        {
            name: "Playboi Carti",
            type: "folder",
            items: []
        },
        {
            name: "Download Dump 001.rar",
            type: "archive",
            url: "https://example.com"
        },
        {
            name: "cover.webp",
            type: "image",
            thumbnail: "https://picsum.photos/200"
        },
        {
            name: "mihon-v0.19.9.apk",
            type: "apk",
            url: "https://example.com"
        },
        {
            name: "proton-recovery-kit.pdf",
            type: "pdf",
            url: "https://example.com"
        }
    ]
};

const list = document.getElementById("fileList");
const pathBar = document.getElementById("path");
const search = document.getElementById("search");
const backBtn = document.getElementById("backBtn");

let currentFolder = library;
let historyStack = [library];

function getIcon(item) {
    if (item.type === "folder") return folderIcon;
    if (item.type === "archive") return archiveIcon;
    if (item.type === "audio") return audioIcon;
    if (item.type === "pdf") return pdfIcon;
    if (item.type === "apk") return apkIcon;
    if (item.type === "image") return item.thumbnail;
    return fileIcon;
}

function render(folder) {
    list.innerHTML = "";

    const term = search.value.toLowerCase();

    pathBar.textContent = historyStack.map(x => x.name).join(" > ");

    folder.items
        .filter(item => item.name.toLowerCase().includes(term))
        .forEach(item => {
            const row = document.createElement("div");
            row.className = "item";

            row.innerHTML = `
                <img class="icon" src="${getIcon(item)}">
                <div class="info">
                    <div class="name">${item.name}</div>
                    <div class="meta">${item.type}</div>
                </div>
            `;

            row.onclick = () => {
                if (item.type === "folder") {
                    currentFolder = item;
                    historyStack.push(item);
                    render(item);
                } else if (item.url) {
                    window.open(item.url, "_blank");
                } else if (item.type === "image") {
                    window.open(item.thumbnail, "_blank");
                }
            };

            list.appendChild(row);
        });
}

backBtn.onclick = () => {
    if (historyStack.length > 1) {
        historyStack.pop();
        currentFolder = historyStack[historyStack.length - 1];
        render(currentFolder);
    }
};

search.addEventListener("input", () => render(currentFolder));

render(library);