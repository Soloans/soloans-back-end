const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const router = require("./routes");
const {
  PROJECT_NAME,
  COOKIE_SECRET,
  DB_CONNECTION_ON_CLOUD,
} = require("./config");

const UserSchema = require("./schema/User");
const CustomerSchema = require("./schema/Customer");
const HistorySchema = require("./schema/History");
const ReferralSchema = require("./schema/Referral");
const ImageSchema = require("./schema/Image");
// const PageSchema = require("./schema/Page");
// const LayoutSchema = require("./schema/Layout");
// const PropertySchema = require("./schema/Property");
// const TokenSchema = require("./schema/Token");
const { initialAction } = require("./inital-data");

const mongoUri = DB_CONNECTION_ON_CLOUD;

console.log("URL", mongoUri);
const adapterConfig = {
  mongoUri: mongoUri,
};

// console.log("Database URI:", mongoUri);

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.INIT_DATA && initialAction,
  cookieSecret: COOKIE_SECRET,
  cookie: {
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  queryLimits: {
    maxTotalResults: 1000, //limit of the total results of all relationship subqueries
  },
});

const listSchema = [
  { name: "User", schema: UserSchema },
  { name: "Customer", schema: CustomerSchema },
  { name: "History", schema: HistorySchema },
  { name: "Referral", schema: ReferralSchema },
  { name: "Image", schema: ImageSchema },
  // { name: "Page", schema: PageSchema },
  // { name: "Layout", schema: LayoutSchema },
  // { name: "Property", schema: PropertySchema },
  // { name: "Token", schema: TokenSchema },
];

listSchema.map(({ name, schema }) => keystone.createList(name, schema));

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
  configureExpress: (app) => {
    app.set("keystoneInstance", keystone);
    app.use("/", router);
  },
};
