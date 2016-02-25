/**
 * The journal entry model.
 *
 * An trade consists of set of credits and debits
 *
 * @abstract
 */
export default class JournalEntry {

    /**
     * @constructor
     * @param {Date} date The date of the entry
     * @param {AccountType} type The type of the entry
     * @param {Money} amount The amount of the entry
     * @param {String} description The description of the entry
     * @param {Trade} trade The trade the account belongs
     */
    constructor(date, type, amount, description, trade) {
        this.date = date
        this.type = type
        this.amount = amount
        this.description = description
        this.trade = trade
    }


    /**
     * Sets the trade.
     *
     * @param {Trade} trade
     */
    setTrade(trade) {
        this.trade = trade
    }



    /**
     * Gets the debit amount.
     *
     * @return {Money}
     */
    getDebitAmount() {

        if (this.isDebit()) {

            return this.amount

        }

        return null
    }


    /**
     * Gets the credit amount.
     *
     * @return {Money}
     */
    getCreditAmount() {

        if (this.isCredit()) {

            return this.amount

        }

        return null
    }


    /**
     * Gets the corresponding titles
     *
     * @return {Array<AccountType>}
     */
    getCorrespondingAccountTypes() {

        if (this.isCredit()) {

            return this.trade.debitTypes()

        } else {

            return this.trade.creditTypes()

        }

    }

    /**
     * Returns the id of the trade.
     *
     * @return {string}
     */
    getTradeId() {

        return this.trade.id

    }

    /**
     * @abstract
     */
    isDebit() {
    }

    /**
     * @abstract
     */
    isCredit() {
    }

}
