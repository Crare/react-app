import Participant from "../dto/Participant";
import CommonFinnishNames from "../data/CommonFinnishNames";
import emailDomains from "../data/EmailDomains";

/**
 * simulates backend and database stuff
 *
 * @class Utils
 */
class Utils {

  constructor() {
    this.lastId = 0;
    this.participants = [];
  }

  getParticipants() {
    return this.participants;
  }

  /**
   * Generates n amount of Participant-objects with random data.
   * @param {number} amount number of participants to generate
   * @returns list of Participant objects.
   */
  generateParticipants(amount) {
    if (!amount || amount < 1) {
      throw Error("no valid amount!");
    }
    this.participants = [];

    for (let i = 0; i < amount; i++) {
      const id = this.generateId();
      const name = this.generateName();
      const email = this.generateEmail(name);
      const phone = this.generatePhone();

      const participant = new Participant(id, name, email, phone);
      this.participants.push(participant);
    }

    const compare = (a, b, attr) => {
      if (a[attr] < b[attr]) {
        return -1;
      }
      if (a[attr] > b[attr]) {
        return 1;
      }
      return 0;
    }

    return this.participants.sort((a, b) => compare(a, b, "name"));
  }

  generateId() {
    // simple rising number
    this.lastId += 1;
    return this.lastId;
  }

  generateName() {
    // example: "Antero Mäkinen"
    const firstname = CommonFinnishNames.firstnames[Math.floor((Math.random() * CommonFinnishNames.firstnames.length))];
    const lastname = CommonFinnishNames.lastnames[Math.floor((Math.random() * CommonFinnishNames.lastnames.length))];
    return firstname + " " + lastname;
  }

  generateEmail(name) {
    // example: "antero.makinen@mail.com"
    let email = name.toLowerCase()
      .replace(new RegExp(" ", 'g'), ".")
      .replace(new RegExp("å", 'g'), "a")
      .replace(new RegExp("ä", 'g'), "a")
      .replace(new RegExp("ö", 'g'), "o")
      + Math.floor(Math.random() * 99)
      + "@"
      + emailDomains[Math.floor(Math.random() * emailDomains.length)];

    return email;
  }

  generatePhone() {
    // example: "012 345 6789"
    let phone = "0";
    for (let i = 1; i < 12; i++) {
      if (i === 3 || i === 7) {
        phone += " ";
      } else {
        phone += Math.floor(Math.random() * 9) + 1;
      }
    }
    return phone;
  }

  upperCaseName(name) {
    name = name[0].toUpperCase() + name.substring(1, name.length); // firstname
    name = name.substring(0, name.indexOf(" ") + 1) + name[name.indexOf(" ") + 1].toUpperCase() + name.substring(name.indexOf(" ") + 2, name.length); // lastname
    return name;
  }

  addNewParticipant(participant) {
    if (participant.id) { throw Error("Not a new participant!") }
    participant.id = this.generateId();
    participant.name = this.upperCaseName(participant.name);
    this.participants.unshift(participant);
    return "success";
  }

  deleteParticipant(participantId) {
    const index = this.participants.findIndex(p => p.id === participantId);
    if (index !== -1) {
      this.participants.splice(index, 1);
      return "success";
    }
    return "no_such_id";
  }

}

export default Utils;