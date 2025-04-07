function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    sidebar.style.display = sidebar.style.display === 'none' ? 'block':'none'
 }

document.querySelector('.add-button input[type="file"]').addEventListener('change', function(event) {
    var files = event.target.files;
    var pdfList = document.getElementById('pdf-list');

    for (var i = 0; i < files.length; i++) {
        var li = document.createElement('li');
        li.textContent = files[i].name;
        pdfList.appendChild(li);
    }
    event.target.value = '';
});


const scriptURL = "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxFjlimwNf9hRzkQwIxcckTNx0037T8l2dF9rHTkGy79HuywDuAhlMROiSKURsHTuKl/exec/exec";

window.uploadToSheet = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const url = document.getElementById("fileUrl").value;

  const data = { name, email, url };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await res.text();
    alert(result);
    loadSheetData(); // refresh list
  } catch (err) {
    console.error("Upload failed", err);
  }
};

async function loadSheetData() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();
    const list = document.getElementById("sheetData");
    list.innerHTML = "";
    data.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.name}</strong> (${entry.email}): <a href="${entry.url}" target="_blank">View PDF</a>`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

window.onload = loadSheetData;
