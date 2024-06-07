const htmlPdf = require('html-pdf');


barcd = ''
triId = ''
lincd = ''
prjCd = ''
familia = ''

arquivo =
    `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Qr Code - UBS</title>
        <style>
        td {
            font-size: 30px;
        }
    </style>
    </head>
    <body>
        
        <div>
         ${barcd}   
        </div>
        <div>
            <table>
                <tr>
                    <td>TrlID:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>LocName:</td>
                    <td>BR PLM Romaria MG</td>
                </tr>
                <tr>
                    <td>LINCD:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>PrjCD:</td>
                    <td></td>
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

const outputFilePath = 'qrcode.pdf';
convertHtmlToPdf(arquivo, outputFilePath);