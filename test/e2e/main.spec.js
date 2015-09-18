describe('Message Center', function() {

  beforeEach(function() {
      browser.get('index.html');
  });

  it('renders an empty ordered list on its initial state', function() {
    expect(element.all(by.id('mc-messages-wrapper')).count()).toBe(1);
    var messages = element.all(by.repeater('message in mcMessages'));
    expect(messages.count()).toBe(0);
  });

  describe('when on the same view without routing', function(){
    beforeEach(function() { element(by.id('goEdit')).click(); });

    it('renders a message with the default "success" level', function() {
      element(by.id('saveSuccess')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('Saved successfully!');
    });

    it('renders a message with the level and text provided', function() {
      element(by.id('saveFailure')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-danger fade in');
      expect(messages.getText()).toMatch('Something went wrong!');
    });

    it('renders multiple messages with the default "success" level and text', function() {
      element(by.id('saveMultipleSuccess')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      var yay = messages.first();
      expect(yay.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(yay.getText()).toMatch('Yay!');
      var saved = messages.get(1);
      expect(saved.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(saved.getText()).toMatch('Saved successfully!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element(by.id('saveMultipleTypes')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      var yay = messages.first();
      expect(yay.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(yay.getText()).toMatch('Yay!');
      var somethingWrong = messages.get(1);
      expect(somethingWrong.getAttribute('class')).toMatch('alert alert-danger fade in');
      expect(somethingWrong.getText()).toMatch('Something went wrong!');
    });
  });
});
