
export const loadMessages = async (baseURl,messages , toast ) => {
    if (messages) {
      toast(" messages loading...")
      const url1 = `${baseURl}/api/loadMsg`;
      
      let response;
      try {
        response = await fetch(url1, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        });
      } catch (error) {
        console.error("Error:", error);
      }
  
      
    }
  };
  
  
 export const deleteMsg = async (id, baseURl, toast) =>{

    toast("deleting...")
    const resp = await fetch(`${baseURl}/api/chat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    if(!resp.ok)
    {
       toast.error("Message not Deleted") 
     }    
  }

  
  
  export const sendMsg = async (newMessage, setMsg , baseURl) => {
    console.log(process.env.NEXTAUTH_URL)
        const resp = await fetch(`${baseURl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newMessage),
      });
      
      // reset field if OK
      if (resp.ok) setMsg("");
      // }
      
      // focus after click
      inputRef?.current?.focus();
    };