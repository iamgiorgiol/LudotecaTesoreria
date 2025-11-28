function salvaOffline(movimento) {
    let lista = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
    lista.push(movimento);
    localStorage.setItem("offlineQueue", JSON.stringify(lista));

    document.getElementById("offlineBanner").style.display = "block";
    alert("Sei offline: dati salvati localmente!");
}

window.addEventListener("online", syncOffline);

function syncOffline() {
    const queue = JSON.parse(localStorage.getItem("offlineQueue") || "[]");
    if (queue.length === 0) return;

    alert("Tornato online → invio movimenti salvati...");

    queue.forEach(mov => {
        const fd = new FormData();
        fd.append("entry.1530881892", mov.tipo);
        fd.append("entry.336709630", mov.data);
        fd.append("entry.1542207063", mov.descrizione);
        fd.append("entry.1460849949", mov.valore);
        fd.append("entry.53596318", mov.categoria);

        fetch(FORM_URL, { method: "POST", mode: "no-cors", body: fd });
    });

    localStorage.removeItem("offlineQueue");
}

