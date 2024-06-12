import csvToJson from 'convert-csv-to-json';
import htmlPdf from 'html-pdf';
import QRCode from 'qrcode';
import fs from 'fs';

let json = csvToJson.getJsonFromCsv("excel/epoca2.csv")

function convertHtmlToPdf(htmlContent, outputFilePath) {
    const options = { format: 'A4' };

    htmlPdf.create(htmlContent, options).toFile(outputFilePath, (err, res) => {
        if (err) {
            console.error('Erro ao gerar o PDF:', err);
            return;
        }
        console.log('PDF gerado com sucesso:', res.filename);
    });
}

for (let i = 0; i < json.length; i++) {

    let rangeRow, barcd, triId, lincd, prjCd, familia, imagem, arquivo;
    barcd = json[i]['BARCD']
    triId = json[i]['TriID(MATID)']
    lincd = json[i]['LINCD']
    prjCd = json[i]['PrjCD']
    rangeRow = json[i]['Range-Row']
    familia = json[i]['Familia']
    imagem = `qrcode/${barcd}.png`

    const imageBuffer = fs.readFileSync(imagem);
    const base64Image = imageBuffer.toString('base64');

    arquivo =
        `<!DOCTYPE html>
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Qr Code - UBS</title>
                        <style>
                            td {
                                font-size: 50px;
                                }
                            p#qrcode {
                                display: inline;
                                font-size: 70px;
                                margin: 50px;
                            }
                        </style>
                    </head>
                    <body>
                        <div>
                            <img src="data:image/png;base64,${base64Image}" alt="">
                            <p id="qrcode">${rangeRow}</p>
                        </div>
                        
                        <div>
                            <table>
                                <tr>
                                    <td>TrlID:</td>
                                    <td>${triId}</td>
                                </tr>
                                <tr>
                                    <td>LocName:</td>
                                    <td>BR PLM Romaria MG</td>
                                </tr>
                                <tr>
                                    <td>LINCD:</td>
                                    <td>${lincd}</td>
                                </tr>
                                <tr>
                                    <td>PrjCD:</td>
                                    <td>${prjCd}</td>
                                </tr>
                                <tr>
                                    <td>Familia:</td>
                                    <td>${familia}</td>
                                </tr>
                            </table>
                        </div>
                    </body>
                </html>
            `

    const outputFilePath = `pdf/epoca2/${i}.pdf`;
    convertHtmlToPdf(arquivo, outputFilePath);
    console.log(i)
}

console.log('terminooou')


