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
    const me = {
        id: "rkdgusrnrlrl",
        name: "강현구",
        age: 31,
        des : "고수가 되고 싶은 초보 개발자"
    };
    const changju = {
        id: "changju",
        name: "박창주",
        age: 31,
        des : "vue.js 고수"
    };
    const junhwang = {
        id: "junhwang",
        name: "이준형",
        age: 29,
        des : "그냥 고수"
    };
    const jinblog = {
        id: "jinblog",
        name: "김청진",
        age: 31,
        des : "jin blog 블로거, 하지만 요즘은 코인판에... 역시 개발 고수"
    };



    before(() => {
        db.ref("/users/"+me.id).set(me);
        db.ref("/users/"+changju.id).set(changju);
        db.ref("/users/"+junhwang.id).set(junhwang);
        db.ref("/users/"+jinblog.id).set(jinblog);
    });

    it('db 에서 id 로 값 확인', (done) => {
        db.ref("/users/"+id)
            .once('value')
            .then((data) => {
                expect(data.toJSON()).to.deep.equal(me);
                done();
            })
            .catch(done);
    });

    function findAllUsers() {

    }

    it('db 에서 리스트로 값 가져오기', (done) => {
        findAllUsers()
            .then((list) => {
                expect(list).to.have.lengthOf(4);
                done();
            })
            .catch(done)
    })


});