var isUniqueName, nextId, people;

nextId = 0;

people = [
  {
    "id": "" + (nextId++),
    "name": "Saasha",
    "age": "5"
  }, {
    "id": "" + (nextId++),
    "name": "Planet",
    "age": "7"
  }
];

isUniqueName = function(name) {
  var person;
  return ((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = people.length; _i < _len; _i++) {
      person = people[_i];
      if (person.name === name) {
        _results.push(name);
      }
    }
    return _results;
  })()).length === 0;
};

module.exports = function(app, dir) {
  app.get('/', function(req, res) {
    return res.render("" + dir + "/index.html");
  });
  app.get('/people', function(req, res) {
    return res.json(people);
  });
  app.post('/people', function(req, res) {
    var age, message, name, person;
    name = req.body.name;
    age = req.body.age;
    message = {
      "title": "Duplicate!",
      "message": "" + name + " is a duplicate.  Please enter a new name."
    };
    if (!isUniqueName(name)) {
      return res.send(message, 403);
    }
    person = {
      "id": "" + (nextId++),
      "name": "" + name,
      "age": "" + age
    };
    people.push(person);
    return res.json(person);
  });
  return app.get('/people/:id', function(req, res) {
    var current, id, person, _i, _len;
    id = req.params.id;
    for (_i = 0, _len = people.length; _i < _len; _i++) {
      person = people[_i];
      if (parseInt(person.id, 10) === parseInt(id, 10)) {
        current = person;
      }
    }
    return res.json(current);
  });
};
