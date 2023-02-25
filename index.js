const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let allOnlineUsers=[]

io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User conne: ${id}`);
  socket.on("join",({userName,msg})=>{
   
   	  io.emit("join", {userName,msg});
   })

   socket.on("chat message", ({userName,msg}) => {
     io.emit("chat message", {userName,msg});
  });
   socket.on("user typing", ({userName,typing}) => {
     io.emit("user typing", {userName,typing});
  });

  //   socket.on("online users", (userName) => {
  //   	console.log("on online",userName)
  //   	allOnlineUsers.push(userName)
  //   	allOnlineUsers.map(user => !user)
  //   	console.log(allOnlineUsers)
  //    io.emit("online users", [ ...new Set(allOnlineUsers) ]);
  // });


   socket.on("disconnect",(user)=>{
   	console.log("user disconnected",user)

   	  io.emit("chat message", {userName:"admin",msg:`someone left the chat`});
   })
   
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));