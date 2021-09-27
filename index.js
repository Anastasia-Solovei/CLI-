const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch(console.error);
      break;

    case "get":
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.log(
              chalk.blueBright(
                `Contact with id: '${id}' found! ${contact.name} : ${contact.phone} / ${contact.email} `
              )
            );
          } else {
            console.log(chalk.red(`Contact with id: '${id}' not found!`));
          }
        })
        .catch(console.error);
      break;

    case "add":
      addContact(name, email, phone)
        .then((contact) => {
          console.log(chalk.blueBright("New contact was successfully added!"));
          console.log(contact);
        })
        .catch(console.error);
      break;

    case "remove":
      removeContact(id)
        .then((message) => {
          if (message) {
            console.log(chalk.red(`Contact was not found to delete!`));
          } else {
            console.log(chalk.yellowBright(`Contact deleted!`));
          }
        })
        .catch(console.error);
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
}

invokeAction(argv);
