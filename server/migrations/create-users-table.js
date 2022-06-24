/**
 * Make any changes you need to make to the database here
 */
 async function up() {
  // Write migration here
  this.connection.createCollection("users")
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  this.connection.dropCollection("users")
}

module.exports = { up, down };
