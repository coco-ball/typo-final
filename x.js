class X {
  drawX(i, j, ps, size) {
    // rect(i, j, ps * size, ps * size);
    line(i, j, i + ps * size, j + ps * size);
    line(i, j + ps * size, i + ps * size, j);
  }
}
