import XLSX from "xlsx";
export default {
  exportExcel({ data, sheetName, fileName }) {
    var ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  },
  downloadFile(fileName, url) {
    var iframe = document.getElementById("downloadiframe");
    iframe = iframe ? iframe : document.createElement("iframe");
    iframe.id = "downloadiframe";
    iframe.src = url;
    iframe.addEventListener("load", function() {
      iframe.remove();
    });
    document.body.appendChild(iframe);
  }
};
