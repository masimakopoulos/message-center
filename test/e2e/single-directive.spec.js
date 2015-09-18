describe('Message Center - Single directive', function() {

  beforeEach(function(){
    browser.get('index.html');
  });
  
  it('renders an empty ordered list on its initial state', function() {
    expect(element.all(by.id('mc-messages-wrapper')).count()).toBe(1);
    var messages = element.all(by.repeater('message in mcMessages'));
    expect(messages.count()).toBe(0);
  });
  
  describe('when on the same view', function(){
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
      expect(messages.count()).toBe(2);
      var successMsg = messages.get(0);
      expect(successMsg.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(successMsg.getText()).toMatch('Yay!');
      
      var savedMsg = messages.get(1);
      expect(savedMsg.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(savedMsg.getText()).toMatch('Saved successfully!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element(by.id('saveMultipleTypes')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(2);
      var successMsg = messages.get(0);
      expect(successMsg.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(successMsg.getText()).toMatch('Yay!');
      
      var savedMsg = messages.get(1);
      expect(savedMsg.getAttribute('class')).toMatch('alert alert-danger fade in');
      expect(savedMsg.getText()).toMatch('Something went wrong!');
    }); 
    
  });
  
  describe('when navigating to another view', function() {

    it('renders a message with the default "success" level', function() {
      element(by.id('goEditSuccess')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      var successMsg = messages.first();
      expect(successMsg.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(successMsg.getText()).toMatch('You have reached the edit page!');
    });

    it('renders a message with the level and text provided', function() {
      element(by.id('goEditFailure')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-danger fade in');
      expect(messages.getText()).toMatch('Something went wrong!');
    });

    it('renders multiple messages with the default "success" level and text', function() {
      element(by.id('goEditMultipleSuccess')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      var yay = messages.first();
      expect(yay.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(yay.getText()).toMatch('Yay!');
      var youveReached = messages.get(1)
      expect(youveReached.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(youveReached.getText()).toMatch('You have reached the edit page!');
    });

    it('renders multiple messages with the level and text provided', function() {
      element(by.id('goEditMultipleTypes')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      var yay = messages.first();
      expect(yay.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(yay.getText()).toMatch('Yay!');
      var somethingWrong = messages.get(1);
      expect(somethingWrong.getAttribute('class')).toMatch('alert alert-danger fade in');
      expect(somethingWrong.getText()).toMatch('Something went wrong!');
    });
  });

describe('after navigating to multiple different views with permanent message', function () {
    beforeEach(function () {
      element(by.id('goPermanent')).click();
    });
    
    it('still renders a permanent message', function () {
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('Showing permanent message!');
      
      element(by.id('goIndex')).click();
      element(by.id('goPermanent')).click();
      element(by.id('goIndex')).click();
      
      messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(2);
      var firstMessage = messages.first();
      expect(firstMessage.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(firstMessage.getText()).toMatch('Showing permanent message!');
     
      var secondMessage = messages.get(1);
      expect(secondMessage.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(secondMessage.getText()).toMatch('Showing permanent message!');
    });
    
    it('renders a permanent message and then closes it', function () {
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('Showing permanent message!');
      
      element(by.id('goIndex')).click();
      messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('Showing permanent message!');
      
      element(by.css('.alert .close')).click();
      messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(0);
      
      element(by.id('goIndex')).click();
      messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(0);
    });
  });
  
  
  describe('after navigating to multiple different views with next message', function () {
    it('clears the next message', function () {
      element(by.id('goEditSuccess')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('You have reached the edit page!');
      
      element(by.id('saveSuccessGoHome')).click();
      
      messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('Saved successfully and went home!');
    });
  });

  describe('when going to the allowed HTML page', function(){
    beforeEach(function() { element(by.id('goHTML')).click(); });

    it('renders a message with HTML enabled', function() {
      element(by.id('allowedHTML')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
      expect(messages.getText()).toMatch('HTML is allowed.');
    });

    it('renders a message with HTML disabled', function() {
      element(by.id('plainText')).click();
      var messages = element.all(by.repeater('message in mcMessages'));
      expect(messages.count()).toBe(1);
      expect(messages.getAttribute('class')).toMatch('alert alert-warning fade in');
      expect(messages.getText()).toMatch('<strong>HTML</strong> <em>is</em> NOT <span>allowed</span>.');
    });

  });
});
