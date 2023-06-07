export default (req, res) => {
    if (req.method === "POST") {
      // get message
      const messages = req.body;
  
      // dispatch to channel "message"
      res?.socket?.server?.io?.emit("loadMsg", messages);
  
      // return message
      res.status(201).json(messages);
    }
  };