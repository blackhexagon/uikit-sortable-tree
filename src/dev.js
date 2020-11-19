import initUIKitSortableTree from "./index.js";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.css";

UIkit.use(Icons);

initUIKitSortableTree({
    element: document.getElementById("root"),
    data: [
        { id: 1, title: { cs: "Novinky", en: "News" }, parent: null },
        { id: 2, title: { cs: "Galerie", en: "Gallery" }, parent: null },
        { id: 3, title: { cs: "Interiéry", en: "Interiors" }, parent: 2 },
        { id: 4, title: { cs: "Praha", en: "Prague" }, parent: 3 },
    ],
    onSave: (data) => {
        console.log(data);
    },
    onEdit: (id) => {
        console.log(id);
    },
    height: "80vh",
    locales: [
        ["cs", "Čeština"],
        ["en", "Angličtina"],
    ],
    defaultLocale: "cs",
    translations: {
        add: "Přidat",
        save: "Uložit",
        empty: "(Prázdné)",
        expand: "Rozbalit vše",
        shrink: "Zabalit vše",
    },
});
