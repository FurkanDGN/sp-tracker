/* eslint-disable no-console */

const PREFIX = '[Story Points Tracker]';

const error = console.error.bind(null, PREFIX);
const info = console.info.bind(null, PREFIX);
const warn = console.warn.bind(null, PREFIX);

export const log = {
  error,
  info,
  warn,
};
