class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}


class ICrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(item) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
}

class MongoDBStrategy extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('O item foi salvo em mongoDB');
  }
}
class PostgreSQLStrategy extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log('O item foi salvo em Postgres');
  }
}

class ContextStrategy extends ICrud {
  constructor(database) {
    super();
    this._database = database;
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDBStrategy());
contextMongo.create();
const context = new ContextStrategy(new PostgreSQLStrategy());
context.create();


//context.read();