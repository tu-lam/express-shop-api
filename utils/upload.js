const fs = require("fs")

exports.deleteImageFromServer = async (folder,image) => {
    const path = `${__dirname}/../public/images/${folder}/${image}`;
    await fs.unlink(path, err => {
      if (err) return console.log(err);
      console.log('Previous photo has been deleted');
    });
  };