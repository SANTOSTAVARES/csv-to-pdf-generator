//QRCode = require('qrcode')
import csvToJson from 'convert-csv-to-json';
import QRCode from 'qrcode';

let json = csvToJson.getJsonFromCsv("excel/epoca2.csv")

for (let i = 0; i < json.length; i++) {

    let barcd;
    barcd = json[i]['BARCD']


    QRCode.toFile(`.\\qrcode\\${barcd}.png`, `${barcd}`, {
        errorCorrectionLevel: 'H'
    }, function (err) {
        if (err) throw err;
    })
}
console.log('terminooou')