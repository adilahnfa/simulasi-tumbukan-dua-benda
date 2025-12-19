const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x1, x2, v1, v2, m1, m2;
let tumbukan = false;

function mulai() {
    m1 = parseFloat(document.getElementById("m1").value);
    m2 = parseFloat(document.getElementById("m2").value);
    v1 = parseFloat(document.getElementById("v1").value);
    v2 = parseFloat(document.getElementById("v2").value);

    x1 = 100;
    x2 = 500;
    tumbukan = false;

    document.getElementById("hasil").innerHTML = "";
    requestAnimationFrame(update);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar benda 1
    ctx.beginPath();
    ctx.arc(x1, 100, 20, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Gambar benda 2
    ctx.beginPath();
    ctx.arc(x2, 100, 20, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // Gerakan
    x1 += v1;
    x2 += v2;

    // Deteksi tumbukan
    if (!tumbukan && Math.abs(x1 - x2) <= 40) {
        tumbukan = true;

        let v1Awal = v1;
        let v2Awal = v2;

        // Tumbukan lenting sempurna
        v1 = ((m1 - m2) * v1Awal + 2 * m2 * v2Awal) / (m1 + m2);
        v2 = ((m2 - m1) * v2Awal + 2 * m1 * v1Awal) / (m1 + m2);

        let impuls1 = m1 * (v1 - v1Awal);
        let impuls2 = m2 * (v2 - v2Awal);

        document.getElementById("hasil").innerHTML =
            `<b>Hasil Tumbukan:</b><br>
             Kecepatan akhir benda 1 = ${v1.toFixed(2)} m/s<br>
             Kecepatan akhir benda 2 = ${v2.toFixed(2)} m/s<br>
             Impuls benda 1 = ${impuls1.toFixed(2)} Ns<br>
             Impuls benda 2 = ${impuls2.toFixed(2)} Ns`;
    }

    if (x1 < canvas.width && x2 > 0) {
        requestAnimationFrame(update);
    }
}
