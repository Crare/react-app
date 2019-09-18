import Participant from "../dto/Participant";
import CommonFinnishNames from "../data/CommonFinnishNames";
import emailDomains from "../data/EmailDomains";

// simulates backend and database stuff

const Utils = {

  lastId: 0,
  participants: [],

  /**
   * Generates n amount of Participant-objects with random data.
   * @param {number} amount number of participants to generate
   * @returns list of Participant objects.
   */
  generateParticipants(amount) {
    if(!amount || amount < 1) {
      throw Error("amount is less than 1!");
    }
    this.participants = [];

    for(let i = 0; i < amount; i++) {
      const id = this.generateId();
      const name = this.generateName();
      const email = this.generateEmail(name);
      const phone = this.generatePhone();

      const participant = new Participant(id, name, email, phone);
      this.participants.push(participant);
    }

    return this.participants;
  },

  generateId() {
    // simple rising number
    this.lastId+=1;
    return this.lastId;
  },

  generateName() {
    // example: "Antero Mäkinen"
    const firstname = CommonFinnishNames.firstnames[Math.floor((Math.random() * CommonFinnishNames.firstnames.length))];
    const lastname = CommonFinnishNames.lastnames[Math.floor((Math.random() * CommonFinnishNames.lastnames.length))];
    return firstname + " " + lastname;
  },

  generateEmail(name) {
    // example: "antero.makinen@mail.com"
    let email = name.toLowerCase()
      .replace(new RegExp(" ", 'g'), ".")
      .replace(new RegExp("å", 'g'), "a")
      .replace(new RegExp("ä", 'g'), "a")
      .replace(new RegExp("ö", 'g'), "o")
      + "@"
      + emailDomains[Math.floor(Math.random() * emailDomains.length)];

    return email;
  },

  generatePhone() {
    // example: "012 345 6789"
    let phone = "0";
    for(let i = 1; i < 12; i++) {
      if (i === 3 || i === 7) {
        phone += " ";
      } else {
        phone += Math.floor(Math.random() * 9) + 1;
      }
    }
    return phone;
  }

}

export default Utils;