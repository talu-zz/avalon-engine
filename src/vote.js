class Vote {
  constructor(username, vote) {
    this._username = username;
    this._vote     = vote;
  }

  getUsername() {
    return this._username;
  }

  getValue() {
    return this._vote;
  }
}

module.exports = Vote;