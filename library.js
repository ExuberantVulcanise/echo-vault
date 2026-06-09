/**
 * library.js — File Library Data
 * ================================
 * Edit this file to manage your downloads library.
 *
 * Supported types:
 *   "folder"  — navigable directory (requires `items` array)
 *   "audio"   — .mp3, .flac, .wav, etc.
 *   "image"   — .jpg, .webp, .png etc. (requires `thumbnail` URL)
 *   "archive" — .zip, .rar, .7z etc.
 *   "pdf"     — PDF documents
 *   "apk"     — Android packages
 *   "file"    — any other file type
 *
 * Fields:
 *   name      {string}  — display name (include extension for files)
 *   type      {string}  — one of the types listed above
 *   url       {string}  — direct download/open URL (all types except folder/image)
 *   thumbnail {string}  — image preview URL (image type only)
 *   items     {Array}   — child entries (folder type only)
 *   size      {string}  — optional human-readable size, e.g. "4.2 MB"
 *   date      {string}  — optional date string, e.g. "2024-11-03"
 */

export const library = {
    name: "ダウンロード",          // "Downloads" in Japanese
    type: "folder",
    items: [
        {
            name: "NBA YoungBoy",
            type: "folder",
            items: [
                {
                    name: "The Third Ft. YoungBoy Never Broke Again.mp3",
                    type: "audio",
                    url: "https://example.com",
                    size: "8.1 MB",
                    date: "2024-10-14"
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
            url: "https://example.com",
            size: "213 MB",
            date: "2024-09-30"
        },
        {
            name: "cover.webp",
            type: "image",
            thumbnail: "https://picsum.photos/200",
            size: "340 KB",
            date: "2024-10-01"
        },
        {
            name: "mihon-v0.19.9.apk",
            type: "apk",
            url: "https://example.com",
            size: "19.7 MB",
            date: "2024-11-03"
        },
        {
            name: "proton-recovery-kit.pdf",
            type: "pdf",
            url: "https://example.com",
            size: "1.2 MB",
            date: "2024-08-22"
        }
    ]
};
