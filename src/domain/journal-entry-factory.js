import Money from './money'
import Debit from './debit'
import Credit from './credit'
import {DEBIT, CREDIT} from './journal-entry-type'
import AccountTypeFactory from './account-type-factory'

/**
 * JournalEntryFactory is the factory class for JournalEntry model.
 */
export default class JournalEntryFactory {

    /**
     * @param {AccountTypeChart} chart
     */
    constructor(chart) {

        this.accountTypeFactory = new AccountTypeFactory(chart)

    }

    /**
     * @param {string} typeName The type name of journal entry (e.g. 売上, 売掛金)
     * @param {number} amount The amount of the entry
     * @param {string} date The date of the entry
     * @param {string} desc The description of the entry
     * @param {JournalEntryType} entryType The type of the entry (DEBIT or CREDIT)
     */
    createFromParams(typeName, amount, {date, desc}, entryType) {

        const type = this.accountTypeFactory.createFromName(typeName)
        const money = new Money(amount)

        if (entryType === DEBIT) {

            return new Debit(date, type, money, desc, null)

        } else {

            return new Credit(date, type, money, desc, null)

        }

    }

}
