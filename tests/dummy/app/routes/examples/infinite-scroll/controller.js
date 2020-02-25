import Controller from '@ember/controller';
import getNumbers from 'dummy/lib/get-numbers';

export default Controller.extend({

  count: 0,
  numImages: 5,
  someProperty: 50,

  init() {
    this._super(...arguments);
    this.set('count', 0);
  },

  loadAbove() {
    let first = this.get('model.first');
    let numbers = getNumbers(first - 20, 20);
    let model = this.get('model.numbers');
    model.unshiftObjects(numbers);
    // this.set('model.numbers', newModel);
    this.set('model.first', first - 20);
  },

  actions: {

    loadAbove() {
      this.loadAbove();
      this.incrementProperty('count');

      // never load above again after fetching the second time
      // this allows us to pinpoint our webkit bug which occurs
      // on the second fetch in the demo application
      if (this.get('count') === 2) {
        this.set('loadAbove', function() {});
      }
    },

    loadBelow() {
      let last = this.get('model.last');
      let numbers = getNumbers(last, 20);
      let model = this.get('model.numbers');
      model.pushObjects(numbers);
      // this.set('model.numbers', newModel);
      this.set('model.last', last + 20);
    }
  }
});
