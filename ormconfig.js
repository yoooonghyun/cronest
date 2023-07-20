module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/model/*.{ts,js}'],
  synchronize: true,
  ssl: false,
  // extra: {
  // ssl: {
  // rejectUnauthorized: false,
  // },
  // },
  logging: [],
};
