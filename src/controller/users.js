const admin =require('../services/firebase');

exports.fetchUser=async(req,res)=>{
    const {uid}=req.body;
    admin
    .auth()
    .getUser(uid)
    .then((userRecord)=>{
        res.status(200).send({user:userRecord});
    })
    .catch((err)=>{
        console.log("Error in server : ",err);
    })
}

exports.suspendUser=async(req,res)=>{
    const {uid}=req.body;
    admin
    .auth()
    .updateUser(uid,{
        disabled:true,
    })
    .then((record)=>{
        res.status(200).send({user:record});
    })
    .catch((err)=>{
        res.status(400).send({message:err});
    })
}

exports.activateUser=async(req,res)=>{
    const {uid}=req.body;
    admin
    .auth()
    .updateUser(uid,{
        disabled:false,
    })
    .then((record)=>{
        res.status(200).send({user:record});
    })
    .catch((err)=>{
        res.status(400).send({message:err});
    })
}

exports.deleteUser=async(req,res)=>{
    const {uid}=req.body;
    admin
    .auth()
    .deleteUser(uid)
    .then((user)=>{
        res.status(200).send({user:user});
    })
    .catch((err)=>{
        res.status(400).send({message:err});
    })
}

exports.fetchConversations=async(req,res)=>{
    const {gID}=req.body;
    admin
    .firestore()
    .collection('chats')
    .where('groupID','==',gID)
    .orderBy('createdAt')
    .onSnapshot(querySnapShot=>{
        let groupToUpdate
        let conversations={};
        let singleConv=[];
        querySnapShot.forEach((doc)=>{
            groupToUpdate=doc.data().groupID;
            singleConv.push({...doc.data(),MID:doc.id});
        })
        conversations[groupToUpdate]=singleConv;
        res.status(200).send({'convo':conversations});
    })
}

exports.sendNotifications=async (req,res)=>{
    const message = {
        data: {
          score: '850',
          time: '2:45'
        },
        token: `fXRS2kZVuXspx4gOIKZoK4:APA91bEc61-m84Pw3cMEikIiRxAhOVshiScDAj61dzwUrpvy1n8Xbu1QLDqgGp3Zzap1i7pEeW3xbAgglYcxq73UQLW5WagWKBCApJPN8a0wYddgShFyAfI7an6SdvIBo0RB5p3f_-Lp`
    };
    admin.messaging().send(message)
    .then((data)=>{
        res.status(200).send({'data':data});
    })
    .catch((err)=>{
        res.status(500).send({'error':err});
    })
}