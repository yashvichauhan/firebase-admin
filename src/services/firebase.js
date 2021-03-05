const admin = require('firebase-admin');

const serviceAccount=require('../../chatapp-789ae-firebase-adminsdk-gv5bl-fb35f9cf24.json');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://chatapp-789ae.firebaseio.com"
});
  
module.exports=admin;

  
