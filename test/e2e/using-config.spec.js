xdescribe('Message Center - Using configuration values', function () {

    beforeEach(function () {
        browser.get('index.html');
    });

    it('renders an empty ordered list on its initial state', function () {
        expect(element.all(by.id('mc-messages-wrapper')).count()).toBe(1);
        var messages = element.all(by.repeater('message in mcMessages'));
        expect(messages.count()).toBe(0);
    });

    describe('when having set a default timeout value', function () {
        beforeEach(function() {
            var ptor = protractor.getInstance();
            ptor.ignoreSynchronization = true;
            var mockedModule = function () {
                var module = angular.module('MessageCenterModule').config(['$provide', function ($provide) {
                    $provide.constant('myVal', 'newMockedValue');
                }])
            };

            browser.addMockModule('MessageCenterModule', mockedModule);

            element(by.id('goConfiguration')).click();
        });

        it('renders a message with the default timeout', function () {
            console.log('HEY THERE!!!!');
            element(by.id('goDefaultTimeout')).click();
            browser.debugger();
            var messages = element.all(by.repeater('message in mcMessages'));
            expect(messages.count()).toBe(1);
            browser.sleep(2000);
            message = element.all(by.repeater('message in mcMessages'));
            expect(messages.count()).toBe(0);
        });

    });
});