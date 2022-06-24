/**
 * Make any changes you need to make to the database here
 */
 async function up() {
  // Write migration here
  this.connection.createCollection("reports")
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
  this.connection.dropCollection("reports")
}

module.exports = { up, down };
