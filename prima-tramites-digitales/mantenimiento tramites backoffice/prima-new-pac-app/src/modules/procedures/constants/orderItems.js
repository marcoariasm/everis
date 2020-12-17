const orderItems = (items, elementToOrder) => {
  return items.sort((a, b) => {
    if (a.login > b.login) {
      return 1;
    } else if (a[elementToOrder] < b[elementToOrder]) {
      return -1;
    }
    return 0;
  });
};

export default orderItems;
