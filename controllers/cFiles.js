
exports.tempFile = (req) => {
    const pathName = req.files.upload.path;
    const arrayPathName = pathName.split("\\");
    const fileName = arrayPathName[1];
    console.log(fileName);
}

//module.exports = tempFile;




