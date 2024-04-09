var pdfUtil = require("pdf-to-text");
const path = require("path");
var pdf_path = path.resolve("/Users/mikha/Downloads/vlastelin-kolec_952.pdf");
// const fs = require("node:fs");

// const writeToFile = (fileName, content, index) => {
//   fs.writeFile(fileName, content, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("success" + index);
//     }
//   });
// };
console.log(pdf_path);
pdfUtil.info(pdf_path, async function (err, info) {
  if (err) throw err;
  console.log(info);
  const { pages } = info;

  const bookPages = {};

  async function readPdfByPage() {
    const promises = [];
    for (let page = 0; page < pages; page++) {
      const option = {from: page, to: page + 1};

      const promise = new Promise((resolve) => {
        pdfUtil.pdfToText(pdf_path, option, function (err, data) {
          if (err) throw err;
          bookPages[page] = data;
          resolve(data);
        });
      });
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  await readPdfByPage();
  // console.log(bookPages);
  for (const page of Object.keys(bookPages)) {
    // writeToFile('./books/' + page + '.txt', bookPages[page], page);
  }
});
