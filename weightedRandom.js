class WeightedRandom {
  constructor(target) {
    // 1. Calculate total weight sum
    let totalWeight = 0;
    for (const pair of target) {
      totalWeight += pair[1];
    }

    // 2. Convert the given weight to a percentage (weight / total weight)
    const candidates = [];
    for (const pair of target) {
      candidates.push([pair[0], pair[1] / totalWeight]);
    }

    // 3. Sort in ascending order of weight
    candidates.sort((a, b) => a[1] - b[1]);

    this.candidates = candidates;
  }
  getRandom() {
    // 1. Set random reference point
    const pivot = Math.random();

    // 2. Accumulate the weights by traversing the elements in ascending order of weights
    let acc = 0;
    for (const pair of this.candidates) {
      acc += pair[1];

      // 3. Terminate if the accumulated weight value is more than the reference point
      if (pivot <= acc) {
        return pair[0];
      }
    }

    return null;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
