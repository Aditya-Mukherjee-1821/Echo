const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date as "5 June"
  const dateOptions = { day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('en-GB', dateOptions);

  // Calculate IST time with offset +5:30
  const istDate = new Date(date.getTime());

  // Format the time as "22:10"
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  };
  const formattedTime = istDate.toLocaleTimeString('en-GB', timeOptions);

  return { formattedDate, formattedTime };
};

export { formatDate };
