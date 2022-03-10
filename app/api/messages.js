const fetchMessages = async () => {
  const data = await fetch(`http://10.0.0.47:3000/api/messages/`);
  let messages = await data.json();
  console.log(messages);
  return messages;
};

export default fetchMessages;
