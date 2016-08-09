var config = {
  development: {
    db: {
      host     : process.env.DB_HOST      || 'localhost',
      database : process.env.DB_DATABASE  || 'princeton-surveys-development',
      user     : process.env.DB_USERNAME  || '',
      password : process.env.DB_PASSWORD  || ''    
    }
  },
  test: {
    db: {
      host      : process.env.DB_HOST || 'localhost',
      database  : process.env.DB_DATABASE || 'princeton-surveys-test',
      user      : process.env.DB_USERNAME || '',
      password  : process.env.DB_PASSWORD || ''      
    }
  },
  production: {
    db: {
      host      : process.env.DB_HOST,
      database  : process.env.DB_DATABASE,
      user      : process.env.DB_USERNAME,
      password  : process.env.DB_PASSWORD
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
