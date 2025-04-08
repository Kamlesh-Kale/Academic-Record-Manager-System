function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

const CLIENT_ID = "920111331915-flce1ce0ctm4tdh6hro1i3qutenbdhl7.apps.googleusercontent.com";
const SHEET_ID = "1ZST7t8a_LnJap4k0HgULBePivLczodULLw3qTv3XqkE";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;

window.onload = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponse) => {
      gapi.client.setToken(tokenResponse);
      loadData();
    },
  });

  gapi.load("client", async () => {
    await gapi.client.init({
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    });
  });

  document.getElementById("submit").addEventListener("click", () => {
    ensureSignedIn(appendData);
  });
}

function ensureSignedIn(callback) {
  if (!gapi.client.getToken()) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    callback();
  }
}

async function appendData() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const fileUrl = document.getElementById("fileUrl").value.trim();

  if (!name || !email || !fileUrl) {
    alert("❗ All fields are required.");
    return;
  }

  const values = [[name, email, fileUrl]];
  const body = { values };

  try {
    const response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:C",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: body,
    });

    console.log("✅ Data appended:", response);
    alert("✅ Data submitted!");
    loadData();
  } catch (error) {
    console.error("❌ Error while appending:", error);
    alert("❌ Failed to add data: " + (error?.message || JSON.stringify(error)));
  }
}



function loadData() {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:C",
    })
    .then((response) => {
      const data = response.result.values || [];
      const list = document.getElementById("dataList");
      list.innerHTML = "";

      // Skip header row
      data.slice(1).forEach(([name, email, url]) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${name}</strong> (${email}) – <a href="${url}" target="_blank">PDF</a>`;
        list.appendChild(li);
      });
    });
}

function ensureSignedIn(callback) {
  if (!gapi.client.getToken()) {
    console.log("🔐 Requesting access token...");
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    console.log("✅ Already signed in, running callback...");
    callback();
  }
}

