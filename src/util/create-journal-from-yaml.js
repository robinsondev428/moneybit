const yaml = require('js-yaml')
const { Journal, Trade } = require('../domain')

const createChartFromYaml = require('./create-chart-from-yaml')

/**
 * Takes journal.yml and chart.yml and creates a journal model.
 * @param {string} journalYaml The journal.yml
 * @return {string} The ledger.yml string
 * @throws {Error} when the input yaml is broken
 */
module.exports = (journalYaml, chartYaml) => {
  const chart = createChartFromYaml(chartYaml)
  const tradeFactory = new Trade.Factory(chart)
  const journal = new Journal()

  yaml.safeLoadAll(journalYaml, data => {
    journal.addTrade(tradeFactory.createFromObject(data))
  })

  return journal
}
