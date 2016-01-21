var ids = {
  'local': {
    'username': 'root',
    'password': 'p@ssw0rd',
    'database': 'un_whd',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'dev': {
      'username': 'humanitarian',
      'password': 'uhvhni4SFTxZ2kz',
      'database': 'humanitarian',
      'host': 'nynycdmysql01.oiny.ogilvy.com',
      'dialect': 'mysql'
    },
  'qa': {
    'username': 'humanitarian',
    'password': 'b2Fas#abr8pu',
    'database': 'humanitarian',
    'host': 'nynycqmysql01.oiny.ogilvy.com',
    'dialect': 'mysql'
  },
  'staging': {
    'username': 'humanitarian',
    'password': 'sWe@etub2pre',
    'database': 'humanitarian',
    'host': 'nynycsmysql01.oiny.ogilvy.com',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'irbt8vqjd8yyfs9x',
    'password': '6lqdtpnwx7da0pts',
    'database': 'heroku_app_db',
    'host': 'o0h43qy0k0g7oz36.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    'dialect': 'mysql',
    'ssl': 'Amazon RDS'
  }
};

module.exports = ids;

