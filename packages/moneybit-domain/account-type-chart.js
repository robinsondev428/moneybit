/**
 * The account type chart model.
 */
class AccountTypeChart {
  constructor () {
    this.majorTypes = new Map()
  }

  /**
   * Adds the account type name by the major account type.
   *
   * @param {string} name The name of the account type
   * @param {MajorAccountType} majorType The major account type
   */
  addNameByMajorType (name, majorType) {
    this.majorTypes.set(name, majorType)
  }

  /**
   * Gets the major type by the account type name.
   *
   * @param {string} name The name of account type
   * @return {MajorAccountType}
   * @throws {Error} when the account type name is not found in the chart
   */
  getMajorTypeByAccountTypeName (name) {
    if (typeof name !== 'string') {
      throw Error(`The account type name must be a string: typeof name is ${typeof name}`)
    }

    const majorType = this.majorTypes.get(name)

    if (majorType == null) {
      throw Error(`The account type name is not found in the chart: ${name}`)
    }

    return majorType
  }
}

module.exports = AccountTypeChart
