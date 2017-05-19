//set up the database if not exist
// This file should be run once from the command line to initialize the db schema.  Be sure to edit the url const with the target url.
const pg = require('pg');

const url = '<INSERT DB URL HERE FOR SCHEMA UPLOAD>' + '?ssl=true';

var db = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'yujin',
    password: '',
    database: 'trendgame'
  }
});

db.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('name');
      user.string('googleID');
      user.string('token');
    })
    .then((table) => {
      console.log('Created users table');
    })
  }
});

db.schema.hasTable('trends').then(function (exists) {
  if (!exists) {
    db.schema.createTable('trends', function (trend) {
      trend.increments('id').primary();
      trend.string('name');
      trend.timestamps(true, true);
      trend.integer('userId');
      // trend.foreign('userId').references('id').inTable('users');
    }).then(function (table) {
      console.log('Created Table trends');
    });
  }
});

db.schema.hasTable('weeks').then(function (exists) {
  if (!exists) {
    db.schema.createTable('weeks', function (week) {
      week.increments('id').primary();
      week.string('startDate');
      week.integer('popularity');
      week.integer('trendId').unsigned();
      week.foreign('trendId').references('trends.id');
    }).then(function (table) {
      console.log('created Table weeks');
    });
  }
});

db.schema.hasTable('stories').then(function (exists) {
  if (!exists) {
    db.schema.createTable('stories', function (story) {
      story.increments('id').primary();
      story.string('articleName', 500);
      story.string('mediaUrl', 200);
      story.string('url', 500);
      story.string('previewText', 1000);
      story.integer('weeksId').unsigned();
      story.foreign('weeksId').references('weeks.id');
    }).then(function (table) {
      console.log('created Table stories');
    });
  }
});


