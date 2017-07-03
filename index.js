var fs = require('fs');
var crypto = require('crypto');
var zlib = require('zlib');
var ts = require('through2-map');

var choice = process.argv[3];

switch(choice){
    case 'C':
        compressFile();
        break;
    case 'D':
        decompressFile();
        break;
    default:
        console.log('[!] Compression(C)/Decompression(D) only');
}

function compressFile(){
    var zip = zlib.createGzip();
    var encrypt = crypto.createCipher('aes-256-cbc',process.argv[4]);
    var inputStream = fs.createReadStream(process.argv[2]);
    var outputStream = fs.createWriteStream(process.argv[2]+'Compressed.gz');
    console.log('[+] Initiating Encrypted File Compression using AES-256-CBC');
    console.log('[+] Encrypted Content:');
    inputStream
    .pipe(encrypt)
    .pipe(ts((chunk)=>{
        console.log(chunk.toString());
        return chunk;
    }))
    .pipe(zip)
    .pipe(outputStream)
    .on('error',(err)=>{
        return console.error(err);
    })
    .on('finish',()=>{
        console.log('[+] File compressed.');
    });
}

function decompressFile(){
    var unzip = zlib.createGunzip();
    var decrypt = crypto.createDecipher('aes-256-cbc',process.argv[4]);
    var inputStream = fs.createReadStream(process.argv[2]);
    var outputStream = fs.createWriteStream(process.argv[2]+'.txt');
    console.log('[+] Decompressing File.');
    console.log('[+] Decrypting Stream using AES-256-CBC');
    inputStream
    .pipe(unzip)
    .pipe(decrypt)
    .pipe(ts((chunk)=>{
        console.log(chunk.toString());
        return chunk;
    }))
    .pipe(outputStream)
    .on('error',(err)=>{
        return console.error(err);
    })
    .on('finish',()=>{
        console.log('[+] File Decompression finished');
    });
}