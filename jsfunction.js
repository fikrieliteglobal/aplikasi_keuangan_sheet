const spreadsheetId = '1-uyaqY1ZO24zezG_exzZL-dzizsMy93VsheasBWxc7g'
let berhasilSinkron = 0;

function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan !== null) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

function tempelDashboard() {
  $.get("dashboard/index.html", function (data) {
    $(".content").html(data);
  });
  $.get("dashboard/modals_input_ik.html", function (data) {
    $("#tampung_modal").html(data);
  });
}

function ambilDataKategori() {
  return gapi.client.sheets.spreadsheets.values.get({
    "spreadsheetId": "1-uyaqY1ZO24zezG_exzZL-dzizsMy93VsheasBWxc7g",
    "range": "A:C",
    "dateTimeRenderOption": "FORMATTED_STRING",
    "majorDimension": "ROWS",
    "valueRenderOption": "FORMATTED_VALUE"
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },function (err) { console.error("Execute error", err); });
}

function sinkronisasi() {
  gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "597436093390-kr3dci12h6si58jolr13652ccbc0a94j.apps.googleusercontent.com" });
    authenticate().then(loadClient)
    // var hasil = authenticate().then(loadClient)
    console.log(berhasilSinkron)
  });
}

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyA3d_uZEd-z2iOFbiH1-SKf6KLs0w42eCU");
  return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
    .then(function () { console.log("GAPI client loaded for API"); berhasilSinkron = 1; },
      function (err) { console.error("Error loading GAPI client for API", err); });
}

$(document).ready(function () {
  tempelDashboard();
  sinkronisasi()
});
