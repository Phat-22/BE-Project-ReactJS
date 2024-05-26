const nextId = (list) => {
  if (list.length > 0) {
    const maxId = list[list.length - 1].productId;
    return maxId + 1; 
  } else {
    return 1;
  }
}

module.exports = nextId;
