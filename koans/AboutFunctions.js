describe("about functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).tobe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "outer";

    function getmessage() {
      return message;
    }

    function overridemessage() {
      var message = "inner";
      return message;
    }

    expect(getmessage()).tobe('outer');
    expect(overridemessage()).tobe('inner');
    expect(message).tobe('outer');
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).tobe('local');
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makemysteryfunction(makervalue)
    {
      var newfunction = function domysteriousthing(param)
      {
        return makervalue + param;
      };
      return newfunction;
    }

    var mysteryfunction3 = makemysteryfunction(3);
    var mysteryfunction5 = makemysteryfunction(5);

    expect(mysteryfunction3(10) + mysteryfunction5(5)).tobe(23);
  });

  it("should allow extra function arguments", function () {

    function returnfirstarg(firstarg) {
      return firstarg;
    }

    expect(returnfirstarg("first", "second", "third")).tobe('first');

    function returnsecondarg(firstarg, secondarg) {
      return secondarg;
    }

    expect(returnsecondarg("only give first arg")).tobe(fill_me_in);

    function returnallargs() {
      var argsarray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsarray.push(arguments[i]);
      }
      return argsarray.join(",");
    }

    expect(returnallargs("first", "second", "third")).tobe('first, second, third');
  });

  it("should pass functions as values", function () {

    var appendrules = function (name) {
      return name + " rules!";
    };

    var appenddoublerules = function (name) {
      return name + " totally rules!";
    };

    var praisesinger = { givepraise: appendrules };
    expect(praisesinger.givepraise("john")).tobe('john rules!');

    praisesinger.givepraise = appenddoublerules;
    expect(praisesinger.givepraise("mary")).tobe('mary totally rules!');

  });
});
