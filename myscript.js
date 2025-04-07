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
