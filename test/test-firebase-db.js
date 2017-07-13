/**
 * Created by dakbutfly on 2017-07-13.
 */
const chai = require('chai');
const expect = chai.expect;

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");
//{ "databaseURL" : <발급받은 URL> }
var databaseConfig = require("../databaseConfig.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseConfig.databaseURL
});

var db = admin.database();

describe('fire base 테스트', function() {
    const id = "rkdgusrnrlrl";
    const value = {
        id: "rkdgusrnrlrl",
        name: "강현구",
        age: 31
    };

    before(() => {
        db.ref("/users/"+id).set(value);
    });

    it('db 에서 값 확인', (done) => {
        db.ref("/users/"+id)
            .once('value')
            .then((data) => {
                expect(data.toJSON()).to.deep.equal(value);
                done();
            })
            .catch(done);
    });
});