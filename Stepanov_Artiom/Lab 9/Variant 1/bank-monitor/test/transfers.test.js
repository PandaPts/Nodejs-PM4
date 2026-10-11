const assert = require('node:assert/strict');
const test = require('node:test');
const events = require('../events');
const { processTransfer } = require('../transfers');

test('routes transfers to the event matching the configured limit', () => {
  const limit = 7000;
  const receivedTransfers = [];
  const receivedAlerts = [];

  events.on('transfer', (amount) => receivedTransfers.push(amount));
  events.on('fraud-alert', (amount) => receivedAlerts.push(amount));

  processTransfer(limit, limit);
  processTransfer(limit + 1, limit);

  events.removeAllListeners('transfer');
  events.removeAllListeners('fraud-alert');

  assert.deepEqual(receivedTransfers, [limit]);
  assert.deepEqual(receivedAlerts, [limit + 1]);
});
