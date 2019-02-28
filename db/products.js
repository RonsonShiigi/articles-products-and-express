class DS_Products {
  constructor() {
    this.storage = [];
    this.idNum = 1;
    this.preProducts();
    this.success = false;
  }
  preProducts() {
    this.storage.push({
      id: this.idNum,
      name: " Robot Kung Fu Training Partner",
      price: "$200.00",
      inventory: 35
    });
    this.idNum++;
    this.storage.push({
      id: this.idNum,
      name: "Brain Pills",
      price: "$50.00",
      inventory: 1000
    });
    this.idNum++;
  }

  getAllProducts() {
    return this.storage.slice();
  }

  getProductById(id) {
    let result;
    this.storage.forEach(product => {
      if (product.id === id) {
        result = product;
        console.log("result", result);
        return result;
      }
    });

    return result;
  }

  createProduct(name, price, inventory) {
    this.storage.push({
      id: this.idNum,
      name,
      price,
      inventory
    });
    this.idNum++;
  }

  editProduct(id, name, price, inventory) {
    this.success = false;
    this.storage.forEach(product => {
      if (product.id === id) {
        product.name = name;
        product.price = price;
        product.inventory = inventory;
        this.success = true;
        return this.success;
      } else {
        return this.success;
      }
    });
  }

  deleteProduct(id) {
    this.storage.slice().forEach((product, idx) => {
      if (product.id === id) {
        console.log(product);
        this.storage.splice(idx, 1);
      }
    });
  }
}

module.exports = new DS_Products();
