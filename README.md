# FCDwED
Asynchronous File Compression/Decompression with Encryption/Decyption using AES-256(CBC) based Encryption.

Gets the input stream from the file supplied as args. (This is piped to the cipher)

Encypts the file using AES-256(CBC) 256-bit based Encryption. (This is piped to Zlib's Gzip/Gunzip)

Makes use of node's zlib module to perform Gzip compression/decompressions.

After chaining up the streams successfully, the content is then piped to the transform stream which then prints out every chunk of data it receives (Encrypted/Decrypted).

Output of the Compression process is going to be a .gz file with Encypted Content. Thereby, making it invulnerable to bruteforcing attacks since every individual file is compressed rather than the zip itself.

Dependencies are through2-map to make use of transform streams to print to stdout while chaining up the pipes.
Installation: npm install through2-map --save

Usage:
1) File Compression with Encyption: node index.js <ABSOLUTE_FILE_PATH> C <ENCRYPTION_KEY>

Eg:
node index.js ./test.txt C testpassword123
  
  
2) File Decompression with Decryption:  node index.js <ABSOLUTE_FILE_PATH> D <DECRYPTION_KEY>

Eg:
node index.js ./test.txtCompressed.gz D testpassword123
  
  
  
If you come across any bugs, report them to nateriver210@gmail.com.

Cheers :)
