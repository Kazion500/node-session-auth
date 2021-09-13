const bcrypt = require("bcrypt");
const PrismaClient = require("./prismaUtils");
const { user } = new PrismaClient();
const RAW_SALT = parseInt(process.env.RAW_SALT, 10);
async function verifyPassword(username, password) {
  const user = await getUser(username);
  const match = await bcrypt.compare(password, user.password);

  return match;
}

function genHashPassword(rawPassword) {
  const salt = bcrypt.genSaltSync(RAW_SALT);
  const hash = bcrypt.hashSync(rawPassword, salt);

  return hash;
}

async function getUser(username) {
  const uniqueUser = await user.findUnique({
    where: {
      username,
    },
  });
  return uniqueUser;
}

module.exports = { verifyPassword, getUser, genHashPassword };
