import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      password:"Devdeveloper39@",
      user:"postgres.chgusjcnbjcrmaekafmp",
      port:6543,
      database:"postgres",
      host:"aws-0-ap-southeast-1.pooler.supabase.com"
    }
  }, 
};

export default config;
