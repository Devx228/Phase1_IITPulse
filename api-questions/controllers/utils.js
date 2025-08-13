import { JSDOM } from "jsdom";
import mammoth from "mammoth";
import gm from "gm";
// const im = gm.subClass({ imageMagick: true,appPath: String.raw`C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe`});

// C:\Program Files\GraphicsMagick-1.3.40-Q16
const im = gm.subClass({ imageMagick: true });
import { Buffer } from "buffer";
import pandoc from "node-pandoc";
import libre from "libreoffice-convert";
import fs from "fs";

// const gm = gmModule.subClass({ imageMagick: true });

function convertImage(imgBase64Str, cb) {
  const buffer = Buffer.from(imgBase64Str, "base64");
  gm(buffer)
    .setFormat("jpeg")
    .toBuffer((err, buffer) => {
      if (err) {
        console.log("Ye wali error hai", imgBase64Str?.slice(0, 20));
        console.error(err);
        cb(imgBase64Str);
      } else {
        const newImgBase64Str = buffer.toString("base64");
        cb(newImgBase64Str);
      }
    });
    // .toBuffer((err, buffer) => {
      
    //   if (err) console.error(err);
    //   const newImgBase64Str = buffer.toString("base64");
    //   cb(newImgBase64Str);
    // });

  // console.log(buffer);
  // const newImgBase64Str = buffer.toString("base64");
  // cb(newImgBase64Str);
}

function checkAndConvertImage(imgBase64Str, cb) {
  const buffer = Buffer.from(imgBase64Str, "base64");
  const imgType = buffer.toString("hex", 0, 8);

  if (
    imgType.startsWith("ffd8") || // JPEG
    imgType.startsWith("89504e470d0a1a0a") || // PNG
    imgType.startsWith("474946383761") || // GIF (87a)
    imgType.startsWith("474946383961") || // GIF (89a)
    imgType.startsWith("424d") || // BMP
    imgType.startsWith("49492a00") || // TIFF (little-endian)
    imgType.startsWith("4d4d002a") // TIFF (big-endian)
  ) {
    return cb(imgBase64Str);
  } else {
    return convertImage(imgBase64Str, cb);
  }
}

async function convertFile(file) {
  const src = file.path;
  const args = "-f docx -t html5";

  try {
    const result = await new Promise((resolve, reject) => {
      pandoc(src, args, (err, result) => {
        if (err) {
          console.error("Oh Nos: ", err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
      // libre.convert(src, ".html", undefined, (err, result) => {
      //   if (err) {
      //     console.log(`Error converting file: ${err}`);
      //     reject(err);
      //   } else {
      //     // Write the result to the output file
      //     fs.writeFileSync("uploads/final.html", result);
      //     resolve(result);
      //     // save file
      //     console.log(`File converted successfully: ${result}`);
      //   }
      // });
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const parseDocx = async (req, res) => {
  try {
    const file = req.file;

    const result = await mammoth.convertToHtml({ path: file.path });
    const html = result.value; // The generated HTMLx

    // const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body></html>`);
    // const images = dom.window.document.querySelectorAll("img");
    // console.log(
    //   "THESE ARE ALL IMAGeS",
    //   // html,
    //   images,
    //   typeof images
    // );
    const imagePromises = [];
    // for (let i = 0; i < images.length; i++) {
    //   const image = images[i];
    //   if (!image.src) continue;
    //   if (!image.src.includes("base64")) continue;
    //   const imgBase64Str = image.src.split(",")[1];
    //   console.log(i);
    //   imagePromises.push(
    //     new Promise((resolve, reject) => {
    //       checkAndConvertImage(imgBase64Str, (newImgBase64Str) => {
    //         image.src = `data:image/jpeg;base64,${newImgBase64Str}`;
    //         resolve();
    //       });
    //     })
    //   );
    // }
    // images.forEach((image) => {
    //   const imgBase64Str = image.src.split(",")[1];
    //   imagePromises.push(
    //     new Promise((resolve, reject) => {
    //       checkAndConvertImage(imgBase64Str, (newImgBase64Str) => {
    //         image.src = `data:image/jpeg;base64,${newImgBase64Str}`;
    //         resolve();
    //       });
    //     })
    //   );
    // });
    // await Promise.all(imagePromises);

    // const newHtml = dom.serialize();

    // const messages = result.messages; // Any messages, such as warnings during conversion

    // const newHtml = await convertFile(file);

    res.status(200).json({ html });
  } catch (error) {
    console.log("naa bhai nhi chala ");
    res.status(500).json({ message: error.message });
  }
};
