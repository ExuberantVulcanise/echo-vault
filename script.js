import { library } from "./library.js";

// ── Icon map ───────────────────────────────────────────────────────────────
const ICONS = {
    folder:  "https://cdn-icons-png.flaticon.com/512/716/716784.png",
    archive: "https://cdn-icons-png.flaticon.com/512/2306/2306185.png",
    audio:   "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    pdf:     "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    apk:     "https://cdn-icons-png.flaticon.com/512/888/888857.png",
    file:    "https://cdn-icons-png.flaticon.com/512/833/833524.png"
};

// Japanese label stamps for each type
const TYPE_LABELS = {
    folder:  "フォルダ",   // Folder
    audio:   "音楽",       // Music
    image:   "画像",       // Image
    archive: "圧縮",       // Archive
    pdf:     "文書",       // Document
    apk:     "アプリ",     // App
    file:    "ファイル"    // File
};

// ── DOM refs ───────────────────────────────────────────────────────────────
const list    = document.getElementById("fileList");
const pathBar = document.getElementById("path");
const search  = document.getElementById("search");
const backBtn = document.getElementById("backBtn");
const titleEl = document.getElementById("title");

// ── State ──────────────────────────────────────────────────────────────────
let currentFolder = library;
let historyStack  = [library];

// ── Helpers ────────────────────────────────────────────────────────────────
function getIcon(item) {
    if (item.type === "image") return item.thumbnail;
    return ICONS[item.type] ?? ICONS.file;
}

function getLabel(item) {
    return TYPE_LABELS[item.type] ?? item.type;
}

// ── Render ─────────────────────────────────────────────────────────────────
function render(folder) {
    list.innerHTML = "";
    titleEl.textContent = folder.name;

    const breadcrumb = historyStack.map(x => x.name).join(" ＞ ");
    pathBar.innerHTML = `<span class="path-text">${breadcrumb}</span>`;

    const term = search.value.toLowerCase();
    const filtered = folder.items.filter(item =>
        item.name.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
        list.innerHTML = `<div class="empty">
            <span class="empty-kanji">無</span>
            <span class="empty-label">ファイルがありません</span>
        </div>`;
        return;
    }

    filtered.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "item";
        row.style.animationDelay = `${index * 40}ms`;

        const meta = [
            item.size ? `<span>${item.size}</span>` : "",
            item.date ? `<span>${item.date}</span>` : ""
        ].filter(Boolean).join('<span class="dot">・</span>');

        row.innerHTML = `
            <div class="item-index">${String(index + 1).padStart(2, "0")}</div>
            <img class="icon" src="${getIcon(item)}" alt="${item.type}">
            <div class="info">
                <div class="name">${item.name}</div>
                ${meta ? `<div class="meta">${meta}</div>` : ""}
            </div>
            <div class="stamp">${getLabel(item)}</div>
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

// ── Controls ───────────────────────────────────────────────────────────────
backBtn.onclick = () => {
    if (historyStack.length > 1) {
        historyStack.pop();
        currentFolder = historyStack[historyStack.length - 1];
        render(currentFolder);
    }
};

search.addEventListener("input", () => render(currentFolder));

// ── Boot ───────────────────────────────────────────────────────────────────
render(library);
