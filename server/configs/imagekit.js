


import ImageKit from '@imagekit/nodejs';
console.log("PRIVATE KEY:", process.env.IMAGEKIT_PRIVATE_KEY); // 👈 debug

const imagekit = new ImageKit({
 
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

export default imagekit;