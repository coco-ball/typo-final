class NameTag {
  constructor(firstArr, lastArr) {
    this.firstArr = firstArr;
    this.lastArr = lastArr;
    this.name = null;
    this.sex = null;
    this.phone = null;
    this.nameTag = null;
    this.shape = null;
  }

  createDOMElement() {
    this.nameTag = document.createElement("div");
    this.nameTag.className = "name-tag"; //elegantshadow

    let name = document.createElement("div");
    name.className = "name";
    name.textContent = this.name;
    this.nameTag.dataset.name = this.name;

    let info = document.createElement("div");
    info.className = "info";

    let sexElement = document.createElement("div");
    sexElement.className = "sex";
    sexElement.textContent = this.sex;

    let phoneElement = document.createElement("div");
    phoneElement.className = "phone";
    phoneElement.textContent = this.phone;

    info.appendChild(sexElement);
    info.appendChild(phoneElement);

    this.nameTag.appendChild(name);
    this.nameTag.appendChild(info);

    return this.nameTag;
  }

  createName() {
    const lastRandomPicker = new WeightedRandom(this.lastArr);
    const firstRandomPicker = new WeightedRandom(this.firstArr);

    const randomFirst = firstRandomPicker.getRandom();
    const randomLast = lastRandomPicker.getRandom();

    this.name = randomLast + randomFirst;
  }

  createSex() {
    let sexArr = ["男", "女"];
    let randomSex = getRandomInt(0, 10) > 5 ? sexArr[0] : sexArr[1];
    let boyNames = ["준", "혁", "찬", "우", "훈", "환", "형", "도"];
    let girlNames = ["율", "린", "인"];
    for (let bn of boyNames) {
      if (this.name.includes(bn)) {
        randomSex = sexArr[0];
        break;
      }
    }
    for (let gn of girlNames) {
      if (this.name.includes(gn)) {
        randomSex = sexArr[1];
        break;
      }
    }
    this.sex = randomSex;
  }
  createPhone() {
    let randomPhoneNum =
      "010-" + getRandomInt(1000, 10000) + "-" + getRandomInt(1000, 10000);

    String.prototype.replaceAt = function (index, replacement) {
      if (index >= this.length) {
        return this.valueOf();
      }

      return this.substring(0, index) + replacement + this.substring(index + 1);
    };
    randomPhoneNum = randomPhoneNum.replaceAt(getRandomInt(4, 13), "*");
    this.phone = randomPhoneNum;
  }

  drawGraphic() {
    let shapeArr = ["RECT", "ELLIPSE", "TRIANGLE", "X"];
    let sizeArr = ["BIG", "SMALL"];
    let strokeW = getRandomInt(0, 2);
    let shape = shapeArr[getRandomInt(0, 4)];
    let size = sizeArr[getRandomInt(0, 2)];
    let set1 = [this.name, "COLOR", "WHITE", strokeW, shape, size];
    let set2 = [this.name, "COLOR", "NONE", strokeW, shape, size];
    let set3 = [this.name, "WHITE", "COLOR", strokeW, shape, size];
    let set = [set1, set2, set3];

    this.shape = new Shape(set[getRandomInt(0, 3)]);
    createCanvas(this.shape.s * 12, this.shape.s * 8);
    this.shape.drawShape();
  }
}
