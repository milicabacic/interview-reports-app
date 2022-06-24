require("dotenv/config");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const schema = mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["up", "down"],
  },
});

migrationTemplate =
  "/**\n * Make any changes you need to make to the database here\n */\nasync function up() {\n  // Write migration here\n}\n\n/**\n * Make any changes that UNDO the up function side effects here (if possible)\n */\nasync function down() {\n  // Write migration here\n}\n\nmodule.exports = { up, down };\n";

const MigrationsModel = mongoose.model("migration", schema);

const command = process.argv[2];
const name = process.argv[3];

if (!command || !name)
  throw new Error(
    'Insufficient arguments provided, use "npm run migrate <command> <name>"'
  );

if (["create", "up", "down"].includes(command)) {
  mongoose.connect(process.env.DB_CONNECTION, async () => {
    console.log("Database connection established.");
    try {
      const session = await mongoose.connection.startSession();
      session.startTransaction();
      await eval(command).call(session, name);
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      console.log("\x1b[31m%s\x1b[0m", err.message);
    } finally {
      await mongoose.connection.close();
      console.log("Database connection closed.");
    }
  });
}

function getMigrationsDirectory() {
  const dir = path.resolve(path.join(__dirname, "migrations"));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

function migrationFileCheck(name) {
  // FILE
  const dir = getMigrationsDirectory();
  return fs.existsSync(path.join(dir, `${name}.js`));
}

async function getMigrationByName(name) {
  const target = await MigrationsModel.findOne({ name });
  if (!target)
    throw new Error(`Cannot find migration: ${name} in the database.`);
  return target;
}

async function create(name) {
  const session = this;
  const dir = getMigrationsDirectory();
  if (!migrationFileCheck(name)) {
    fs.writeFileSync(path.join(dir, `${name}.js`), migrationTemplate);
  } else {
    console.log("\x1b[33m%s\x1b[0m", "Migration file already exists");
  }

  // DATABASE
  const migration = await MigrationsModel.findOne({ name }).session(session);
  if (!migration) {
    await MigrationsModel.create({ name, status: "down" }).then(() =>
      console.log(`Migration: ${name} created in the database.`)
    );
  } else
    console.log(
      "\x1b[33m%s\x1b[0m",
      `Migration "${name}" already exists in the database.`
    );
}

async function up(name) {
  const target = await getMigrationByName(name);
  const migrations = await MigrationsModel.find({
    date: { $lte: target.date },
    status: "down",
  }).sort({ date: "asc" });

  if (!migrations.length) {
    console.log("\x1b[32m%s\x1b[0m", "All migrations are up to date.");
    return;
  }

  return executor.call(this, "up", migrations);
}

async function down(name) {
  const target = await getMigrationByName(name);
  const migrations = await MigrationsModel.find({
    date: { $gte: target.date },
    status: "up",
  }).sort({ date: "asc" });

  if (!migrations.length) {
    console.log("\x1b[32m%s\x1b[0m", "All migrations are up to date.");
    return;
  }

  return executor.call(this, "down", migrations);
}

async function executor(command, migrations) {
  const session = this;
  const migrationFileExist = migrations
    .map((e) => migrationFileCheck(e.name))
    .every((e) => e);

  if (!migrationFileExist)
    throw new Error(
      "Migration files are missing. Please sync up the file system."
    );

  await migrations
    .map((m) => m.name)
    .reduce(
      (prev, name) =>
        prev.then(async () => {
          const exp = await import(`./migrations/${name}.js`);
          return exp[command].call(mongoose, session).then(async () => {
            console.log(
              "\x1b[32m%s\x1b[0m",
              `${command.toUpperCase()}: ${name} migration completed.`
            );
            await MigrationsModel.updateOne({ name }, { status: command });
          });
        }),
      Promise.resolve(null)
    );
}
