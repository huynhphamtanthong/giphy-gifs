export class GifsRating {
  static maxRating = 3;
  static alignTextToNumberRating(rating: string): number {
    switch (rating) {
      case 'r':
        return 0;
      case 'pg13':
        return 1;
      case 'pg':
        return 2;
      case 'g':
        return 3;
      default:
        return -1;
    }
  }

  static getMaxRating() {
    return this.maxRating;
  }
}
