const urlShortnerModel=require("./urlShortnerModel");

const createShortURL=(original_url)=>new Promise((resolve,reject)=>{
  urlShortnerModel.findOne({original_url:original_url}).then((resultURL)=>{
    if(resultURL && resultURL.short_url){
      resolve({short_url:resultURL.short_url,original_url:resultURL.original_url});
    }else{
        return urlShortnerModel.find().sort({_id:-1}).limit(1).then((result)=>{
          let shortURL=1;
          if(result && result.length){
              shortURL=result[0].short_url+1;
          }
          return urlShortnerModel.create({short_url:shortURL,original_url:original_url})
            .then((result)=>{
            resolve({short_rul:shortURL,original_url:original_url});
          })
        });
    }
  })
});

const getActualURL=(shortURL)=>new Promise((resolve,reject)=>{
  urlShortnerModel.findOne({short_url:shortURL}).then((resultURL)=>{
    if(resultURL && resultURL.short_url){
      resolve({short_url:resultURL.short_url,original_url:resultURL.original_url});
    }else{
       reject({"error":"invalid URL"});
    }
  });
});

module.exports={
getActualURL,
createShortURL
}
