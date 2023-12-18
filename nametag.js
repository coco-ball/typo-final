class NameTag {
  constructor(firstArr, lastArr) {
    this.firstArr = firstArr;
    this.lastArr = lastArr;
    this.name = null;
    this.sex = null;
    this.phone = null;
    this.nameTag = null;
    this.shape = null;
    this.active = false;
    this.activeCount = 0;
    this.maxActiveCount = 2;
    this.o = null;
    this.b = null;
  }

  createDOMElement(o, b) {
    this.o = o;
    this.b = b;
    this.nameTag = document.createElement("div");
    this.nameTag.className = "name-tag"; //elegantshadow

    let name = document.createElement("div");
    name.className = this.active ? "name " + this.b : "name";
    name.textContent = this.name;

    let info = document.createElement("div");
    info.className = this.active ? "info " + this.o + " " + this.b : "info";

    let sexElement = document.createElement("div");
    sexElement.className = this.active ? "sex " + this.o : "sex";
    sexElement.textContent = this.sex;

    let phoneElement = document.createElement("div");
    phoneElement.className = this.active ? "phone " + this.o : "phone";
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

  updateClass() {
    const nameElement = this.nameTag.querySelector(".name");
    if (nameElement) {
      nameElement.classList.toggle(this.b, this.active);
    }
    const infoElement = this.nameTag.querySelector(".info");
    if (infoElement) {
      infoElement.classList.toggle(this.b, this.active);
      infoElement.classList.toggle(this.o, this.active);
    }
    const sexElement = this.nameTag.querySelector(".sex");
    if (sexElement) {
      sexElement.classList.toggle(this.b, this.active);
      sexElement.classList.toggle(this.o, this.active);
    }

    // Update the active count
    this.activeCount += this.active ? 1 : -1;
    if (this.activeCount > this.maxActiveCount) {
      // If the limit is exceeded, deactivate the instance
      this.active = false;
      this.updateClass();
    }
  }

  toggleState() {
    if (this.active || this.activeCount < this.maxActiveCount) {
      this.active = !this.active;
      // console.log("toggleStae");
      this.updateClass(); // Update the class when the state is toggled
    }
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
    let rcnv = createCanvas(this.shape.s * 12, this.shape.s * 8);
    this.shape.drawShape();
  }
}
