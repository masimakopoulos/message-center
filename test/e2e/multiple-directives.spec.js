xdescribe('Message Center - Multiple directives', function() {

    beforeEach(function() { browser.get('index.html'); });

    it('renders an empty ordered list on its initial state', function() {
        expect(element.all(by.id('mc-messages-wrapper')).count()).toBe(1);
        var messages = element.all(by.repeater('message in mcMessages'));
        expect(messages.count()).toBe(0);
    });

    describe('when navigating through two views', function() {

        it('renders a message with the default "success" level', function() {
            element('#goEditSuccess').click();
            var messages = element('div#mc-messages-wrapper .alert');
            expect(messages.count()).toBe(1);
            expect(messages.prop('className')).toEqual('alert alert-success fade in');
            expect(messages.text()).toMatch('You have reached the edit page!');
            element('#saveSuccessGoHome').click();
            messages = element('div#mc-messages-wrapper .alert');
            expect(messages.count()).toBe(1);
            expect(messages.prop('className')).toEqual('alert alert-success fade in');
            expect(messages.text()).toMatch('Saved successfully and went home!');

            element(by.id('saveSuccess')).click();
            var messages = element.all(by.repeater('message in mcMessages'));
            expect(messages.count()).toBe(1);
            expect(messages.getAttribute('class')).toMatch('alert alert-success fade in');
            expect(messages.getText()).toMatch('Saved successfully!');

        });
    });
});