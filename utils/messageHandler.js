export default (io, socket) => {
    
  
    socket.on("createdMessage", (msg) => {
        io.emit("newIncomingMessage", msg);
      });
  };