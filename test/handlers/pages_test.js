'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();

const Code = require('code');
const expect = Code.expect;

const Pages = require('../../src/handlers/pages')
const Sinon = require('sinon');

lab.experiment('the page handler should', () => {
    lab.test('expose a home function', (done) => {
        expect(Pages.home).to.be.a.function();
        done();
    })

    lab.test('reply with the index with the results if successful', (done) => {
        const news = ["foo"];
        const request = {
            server: {
                methods: {
                    fetchCurrentEvents(callback) {
                        callback(null, news)
                    }
                }
            }
        };

        const reply = {
            view(name, context) {
                expect(name).to.be.equal('index');
                expect(context.news).to.be.equal(news);

                done();
            }
        };
        Pages.home(request, reply);
    })

    lab.test('return the index with empty result if errors occured', (done) => {
        const request = {
            server: {
                methods: {
                    fetchCurrentEvents(callback) {
                        callback(new Error('bumm'))
                    }
                }
            }
        };

        const reply = {
            view(name, context) {
                expect(name).to.be.equal('index');
                expect(context.news).to.be.equal([]);

                done();
            }
        };
        Pages.home(request, reply);
    })
})