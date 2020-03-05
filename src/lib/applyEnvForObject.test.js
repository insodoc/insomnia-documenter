import applyEnv from './applyEnv';
import { expect } from 'chai';
import applyEnvForObject from "./applyEnvForObject";

describe('applyEnvForObject', function () {
  it('should replace env vars for object and it\'s nested fields', function () {
    const env = {
      data: {
        url: 'http://localhost',
        method: 'GET',
        paramOne: 'one',
        paramTwo: 'two',
      }
    };

    const request = {
      url: "{{url}}",
      method: "{{method}}",
      nestedObject: {
        paramOne: "{{paramOne}}",
        paramTwo: "{{paramTwo}}",
        arrayValue: ["{{paramOne}}", "{{paramTwo}}", null],
        nestedArrayValue: [["{{paramOne}}"], ["{{paramTwo}}"], [null]],
        nestedArrayObject: [{
          paramOne: "{{paramOne}}",
          paramTwo: "{{paramTwo}}"
        }, {
          paramOne: "{{paramOne}}",
          paramTwo: "{{paramTwo}}"
        }],
        nullField: null
      }

    }
    return expect(applyEnvForObject(request, env)).to.eql(
        {
          url: 'http://localhost',
          method: 'GET',
          nestedObject: {
            paramOne: "one",
            paramTwo: "two",
            arrayValue: ["one", "two", null],
            nestedArrayValue: [["one"], ["two"], [null]],
            nestedArrayObject: [{
              paramOne: "one",
              paramTwo: "two"
            }, {
              paramOne: "one",
              paramTwo: "two"
            }],
            nullField: null
          }
        }
    )
  });

  it('should replace env vars for array', function () {
    const env = {
      data: {
        url: 'http://localhost',
        method: 'GET',
        paramOne: 'one',
        paramTwo: 'two',
      }
    };

    const request = [{
      url: "{{url}}",
      method: "{{method}}",
      nestedObject: {
        paramOne: "{{paramOne}}",
        paramTwo: "{{paramTwo}}",
        arrayValue: ["{{paramOne}}", "{{paramTwo}}", null],
        nestedArrayValue: [["{{paramOne}}"], ["{{paramTwo}}"], [null]],
        nestedArrayObject: [{
          paramOne: "{{paramOne}}",
          paramTwo: "{{paramTwo}}"
        }, {
          paramOne: "{{paramOne}}",
          paramTwo: "{{paramTwo}}"
        }],
        nullField: null
      }
    }]

    return expect(applyEnvForObject(request, env)).to.eql(
        [{
          url: 'http://localhost',
          method: 'GET',
          nestedObject: {
            paramOne: "one",
            paramTwo: "two",
            arrayValue: ["one", "two", null],
            nestedArrayValue: [["one"], ["two"], [null]],
            nestedArrayObject: [{
              paramOne: "one",
              paramTwo: "two"
            }, {
              paramOne: "one",
              paramTwo: "two"
            }],
            nullField: null
          }
        }]
    )
  });

  it('should replace env vars for strings', function () {
    const env = {
      data: {
        url: 'http://localhost',
        method: 'GET',
        paramOne: 'one',
        paramTwo: 'two',
      }
    };
    const request = "string"
    return expect(applyEnvForObject(request, env)).to.eql("string")
  });

  it('should replace env vars for number', function () {
    const env = {
      data: {
        url: 'http://localhost',
        method: 'GET',
        paramOne: 'one',
        paramTwo: 'two',
      }
    };
    const request = 1
    return expect(applyEnvForObject(request, env)).to.eql(1)
  });
});

