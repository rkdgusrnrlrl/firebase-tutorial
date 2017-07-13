/**
 * Created by dakbutfly on 2017-07-13.
 */
const chai = require('chai');
chai.use(require('chai-things'));
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
        return db.ref("/users").once('value');
    }

    it('db 에서 리스트로 값 가져오기', (done) => {
        findAllUsers()
            .then((list) => {
                const userMap = list.toJSON();
                expect(Object.keys(userMap)).to.have.lengthOf(4);
                expect(userMap[me.id]).to.be.deep.equal(me);
                expect(userMap[changju.id]).to.be.deep.equal(changju);
                expect(userMap[junhwang.id]).to.be.deep.equal(junhwang);
                expect(userMap[jinblog.id]).to.be.deep.equal(jinblog);
                done();
            })
            .catch(done)
    }).timeout(10000);

    function findTwoUsersOrderByName() {
        return db.ref("/users").orderByChild('name').limitToFirst(2).once('value');
    }

    it('이름 순으로 두번째까지 출력', (done) => {
        findTwoUsersOrderByName()
            .then((snapshot) => {
                const userMap = snapshot.toJSON();
                console.log(userMap);
                expect(Object.keys(userMap)).to.have.lengthOf(2);
                expect(userMap[me.id]).to.be.deep.equal(me);
                expect(userMap[jinblog.id]).to.be.deep.equal(jinblog);
                done();
            })
            .catch(done);
    }).timeout(10000)


});