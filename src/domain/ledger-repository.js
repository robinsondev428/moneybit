import fs from 'fs'
import yaml from 'js-yaml'
import moment from 'moment'

import {ALL_TYPES} from './major-account-type'

/**
 * The repository class of the ledger model.
 */
export default class LedgerRepository {

    /**
     * @param {Ledger} ledger The ledger
     * @param {String} path The path to save
     */
    saveAsYamlToPath(ledger, path) {

        var yaml = this.toYaml(ledger)

        fs.writeFileSync(path, yaml)

    }

    /**
     * Converts the ledger to yaml format.
     *
     * @param {Ledger} ledger
     * @return {String}
     */
    toYaml(ledger) {

        return yaml.safeDump(this.ledgerToObject(ledger))

    }

    /**
     * Converts the ledger to object suitable for yaml serialization.
     *
     * @param {Ledger} ledger
     * @return {Object}
     */
    ledgerToObject(ledger) {

        const obj = {}

        ALL_TYPES.forEach(majorType => {

            obj[majorType.name] = this.subledgerListToObject(ledger.getSubledgersByMajorType(majorType))

        })

        return obj

    }

    /**
     *
     */
    subledgerListToObject(subledgers) {

        const obj = {}

        subledgers.forEach(subledger => {

            obj[subledger.type.name] = this.subledgerToObject(subledger)

        })

        return obj

    }

    /**
     * Converts the subledger to an object.
     * @param {Subledger} subledger
     * @return {Object}
     */
    subledgerToObject(subledger) {

        return {
            dr: subledger.totalDebit().amount,
            cr: subledger.totalCredit().amount,
            accounts: subledger.accounts.map(account => this.accountToObject(account))
        }

    }


    /**
     * Converts the account to the object suitable for yaml serialization.
     *
     * @param {Account} account
     * @return {Object}
     */
    accountToObject(account) {

        const obj = {
            date: moment(account.date).format('YYYY-MM-DD'),
            desc: account.description,
            cor: account.getCorrespondingAccountTypes().map(type => type.name).join(' '),
            ref: account.getTradeId()
        }

        if (account.isDebit()) {

            obj.dr = account.getDebitAmount().amount

        } else {

            obj.cr = account.getCreditAmount().amount

        }

        return obj

    }

}