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
  $.get("dashboard/coba.html", function (data) {
    $(".content").html(data);
  });
  $.get("dashboard/modals_input_ik.html", function (data) {
    $("#tampung_modal").html(data);
  });
}

function ambilDataKategori() {
  var url = `https://sheetsu.com/apis/v1.0bu/ba8eaa02fbd7/sheets/kategori/search`

  $.ajax({
    url: url,
    // data: params,
    success: function(data) {
        var pemasukan = []
        var pengeluaran = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].jenis_kategori == 'pemasukan') {
                var tr = `
                <tr>
                    <td>${data[i].nama_kategori}</td>
                    <td>Edit</td>
                </tr>
                `
                pemasukan.push(tr)
            } else {
                var tr = `
                <tr>
                    <td>${data[i].nama_kategori}</td>
                    <td>Edit</td>
                </tr>
                `
                pengeluaran.push(tr)
            }
        }
        var hasil_pemasukan = pemasukan.join('')
        var hasil_pengeluaran = pengeluaran.join('')
        $('#tampung_pemasukan').html(hasil_pemasukan)
        $('#tampung_pengeluaran').html(hasil_pengeluaran)
    },
  });
}

$(document).ready(function () {
  tempelDashboard();
  ambilDataKategori();
});
